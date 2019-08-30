import React from 'react';
import '../Styles/SideBarContent.css';
import { Form, Button } from 'react-bootstrap';
import axios from '../apis/requests';

class SideBarContent extends React.Component {
	state = {
		soldItem: [],
		globalBuyList: [],
		currentPrice: 0,
		userBuyOrders: []
	};

	postBuyOrder = obj => {
		axios
			.post('/buyOrder', obj)
			.then(succ => {
				if (succ.data.faultCode) {
					alert(succ.data.message);
				} else window.location.reload();
			})
			.catch(err => {});
	};
	buyItem = e => {
		let x = window.prompt('Enter bid value');
		console.log(x);
		if (x) {
			let amt = parseFloat(x);
			if (isNaN(parseFloat(amt))) {
				alert('Please Enter Numeric Value');
			} else {
				//make call here to buy the order
				let obj = {};
				obj.email = this.props.email;
				obj.token = this.props.token;
				obj.bidPrice = amt;
				obj.orderID = e.target.id;
				console.log(obj);
				this.postBuyOrder(obj);
			}
		} else {
			alert('Please enter a bid value');
		}
	};
	setAmount = e => {
		console.log(e.target.data);
	};
	renderList() {
		if (this.props.title === 'Pending Selling List') {
			let arr = [];
			let items =
				this.state.soldItem && this.state.soldItem.length > 0
					? this.state.soldItem
					: this.props.soldItem;
			for (let i in items) {
				arr.push(
					<div className="left-navigation-contents-item">
						<div className="left-navigation-contents-first">
							Item name: {items[i].itemName}
						</div>
						<div className="left-navigation-contents-second">
							Price:{items[i].price}$
						</div>

						<div
							className="left-navigation-contents-third"
							style={{ paddingTop: '5px' }}
						></div>
					</div>
				);
			}
			return arr;
		}
		if (this.props.title === 'Buying List') {
			let arr = [];
			let items =
				this.state.globalBuyList && this.state.globalBuyList.length > 0
					? this.state.globalBuyList
					: this.props.globalBuyList;

			for (let i in items) {
				arr.push(
					<div className="left-navigation-contents-item">
						<div className="left-navigation-contents-first">
							Item name: {items[i].itemName}
						</div>
						<div className="left-navigation-contents-second">
							Price:{items[i].price}$
						</div>
						<div className="left-navigation-contents-second">
							Created by: {items[i].email}
						</div>
						<div className="left-navigation-contents-third"></div>
						<div
							className="left-navigation-contents-third"
							style={{ paddingTop: '5px' }}
						>
							<Button
								variant="primary"
								type="submit"
								id={items[i].orderID}
								onClick={this.buyItem}
							>
								Buy
							</Button>
						</div>
					</div>
				);
			}
			return arr;
		}
		if (this.props.title === 'Bought items pending for approval') {
			let arr = [];
			let items =
				this.state.userBuyOrders && this.state.userBuyOrders.length > 0
					? this.state.userBuyOrders
					: this.props.userBuyOrders;

			for (let i in items) {
				arr.push(
					<div className="left-navigation-contents-item">
						<div className="left-navigation-contents-first">
							Item name: {items[i].itemName}
						</div>
						<div className="left-navigation-contents-second">
							Min Price:{items[i].price}$
						</div>
						<div className="left-navigation-contents-second">
							Max Bid price: {items[i].maxBidPrice}$
						</div>

						<div className="left-navigation-contents-third">
							Max bid user: {items[i].maxBidPriceUser}
						</div>
						<div className="left-navigation-contents-third">
							Your highest bid value:{' '}
							{items[i].currentUserBidPrice}
						</div>

						<div
							className="left-navigation-contents-third"
							style={{ paddingTop: '5px' }}
						></div>
					</div>
				);
			}
			return arr;
		} else if (this.props.title === 'Executed Orders') {
			let arr = [];
			let items =
				this.state.userBuyOrders && this.state.userBuyOrders.length > 0
					? this.state.userBuyOrders
					: this.props.userBuyOrders;
			console.log('Itesm', this.props.executedOrders);
			for (let i in items) {
				arr.push(
					<div className="left-navigation-contents-item">
						<div className="left-navigation-contents-first">
							Item name: {items[i].itemName}
						</div>

						<div
							className="left-navigation-contents-second"
							style={{ color: 'red' }}
						>
							Status: {items[i].status}
						</div>
						<div className="left-navigation-contents-second">
							Price {items[i].status}: {items[i].price}$
						</div>
						<div
							className="left-navigation-contents-third"
							style={{ paddingTop: '5px' }}
						></div>
					</div>
				);
			}
			return arr;
		}
	}
	render() {
		return (
			<div className="left-navigation">
				<div className="left-navigation-header">
					<img src="../ic-arrow-drop-down.svg" alt="none" />
					<div>{this.props.title}</div>
				</div>
				<div className="left-navigation-contents">
					{this.renderList()}
				</div>
			</div>
		);
	}
}

export default SideBarContent;
