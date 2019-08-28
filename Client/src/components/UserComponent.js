import React from 'react';
import '../Styles/UserComponent.css';
import SideBar from './Sidebar';
import SideBarContent from './SideBarContent';
import MainContent from './MainContent';
import TopBar from './TopBar';
import history from '../History';
import axios from '../apis/requests';

class UserComponent extends React.Component {
	state = { user_id: '', soldItem: [], globalBuyList: [], userBuyOrders: [] };
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
					arr.push(obj);
				}
				this.setState({ userBuyOrders: arr });
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
