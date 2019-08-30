import React from 'react';
import '../Styles/UserComponent.css';
import SideBarContent from './SideBarContent';
import MainContent from './MainContent';
import TopBar from './TopBar';
import history from '../History';
import axios from '../apis/requests';

class UserComponent extends React.Component {
	state = {
		user_id: '',
		soldItem: [],
		globalBuyList: [],
		userBuyOrders: [],
		executedOrders: []
	};
	getCurrentUserBidPrice = (res, email) => {
		let maxVal = -10000000000000000000;
		for (let i in res) {
			if (res[i].email === email) {
				if (parseFloat(res[i].bidPrice) > maxVal) {
					maxVal = parseFloat(res[i].bidPrice);
				}
			}
		}
		return maxVal;
	};
	getSoldList = list => {
		axios
			.post('/fetchSoldItemForUser', {
				token: this.props.match.params.id,
				email: this.props.location.state.email
			})
			.then(succ => {
				let data = succ.data.list,
					arr = [];
				for (let i in data) {
					let obj = {};
					obj.itemName = data[i].itemName;
					obj.price = data[i].price;
					arr.push(obj);
				}
				this.setState({ soldItem: arr });
			})
			.catch(err => {
				console.log(err);
			});
	};
	makeAPIcalls() {
		axios
			.post('/fetchSoldItemForUser', {
				token: this.props.match.params.id,
				email: this.props.location.state.email
			})
			.then(succ => {
				let data = succ.data.list,
					arr = [];
				for (let i in data) {
					let obj = {};
					obj.itemName = data[i].itemName;
					obj.price = data[i].price;
					arr.push(obj);
				}
				this.setState({ soldItem: arr });
			})
			.catch(err => {
				console.log(err);
			});
		axios
			.post('/getBuyOrdersForAUser', {
				token: this.props.match.params.id,
				email: this.props.location.state.email
			})
			.then(succ => {
				let data = succ.data.list;
				let arr = [];
				if (data) {
					for (let i in data) {
						let obj = {};
						obj.email = data[i].email;
						obj.itemName = data[i].itemName;
						obj.price = data[i].price;
						obj.orderID = data[i].orderID;
						arr.push(obj);
					}
					this.setState({ globalBuyList: arr });
				} else {
					this.setState({ globalBuyList: [] });
				}
			})
			.catch(err => {
				console.log(err);
			});
		axios
			.post('/getUserSpecificBuyOrders', {
				token: this.props.match.params.id,
				email: this.props.location.state.email
			})
			.then(succ => {
				let data = succ.data.list,
					arr = [];
				for (let i in data) {
					let obj = {};
					obj.itemName = data[i].itemName;
					obj.price = data[i].price;
					obj.maxBidPrice = data[i].maxPricedBid[0].bidPrice;
					obj.maxBidPriceUser = data[i].maxPricedBid[0].email;
					obj.currentUserBidPrice = this.getCurrentUserBidPrice(
						data[i].bidUsers,
						this.props.location.state.email
					);
					arr.push(obj);
				}
				this.setState({ userBuyOrders: arr });
			})
			.catch(err => {
				console.log(err);
			});
		axios
			.post('/getExecutedOrdersForAUser', {
				token: this.props.match.params.id,
				email: this.props.location.state.email
			})
			.then(succ => {
				let exBuy = succ.data.executedBuy;
				let exSell = succ.data.executedSell;
				let arr1 = [];
				for (let i = 0; i < exBuy.length; i++) {
					let obj = {};
					obj.itemName = exBuy[i].itemName;
					obj.price = exBuy[i].maxPricedBid[0].bidPrice;
					obj.status = 'Bought';
					arr1.push(obj);
				}
				for (let i = 0; i < exSell.length; i++) {
					let obj = {};
					obj.itemName = exSell[i].itemName;
					obj.price = exSell[i].maxPricedBid[0].bidPrice;
					obj.status = 'Sold';
					arr1.push(obj);
				}
				console.log(arr1);
				this.setState({ executedOrders: arr1 });
			})
			.catch(err => {
				console.log(err);
			});
	}
	componentDidMount() {
		if (
			!this.props.location.state ||
			!this.props.location.state.isloggedin
		) {
			alert('Please Login');
			history.push('/');
		} else {
			//make here call
			this.makeAPIcalls();
		}
	}

	render() {
		return (
			<div>
				<TopBar
					session_id={this.props.match.params.id}
					firstName={this.props.location.state.firstName}
					lastName={this.props.location.state.lastName}
				/>
				<div className="main-content">
					<SideBarContent
						title="Buying List"
						globalBuyList={this.state.globalBuyList}
						token={this.props.match.params.id}
						email={this.props.location.state.email}
					/>
					<SideBarContent
						title="Pending Selling List"
						soldItem={this.state.soldItem}
					/>
					<SideBarContent
						title="Bought items pending for approval"
						userBuyOrders={this.state.userBuyOrders}
					/>
					<SideBarContent
						title="Executed Orders"
						userBuyOrders={this.state.executedOrders}
					/>
					<div className="content-infos">
						<MainContent
							callback={this.getSoldList}
							token={this.props.match.params.id}
							email={this.props.location.state.email}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default UserComponent;
