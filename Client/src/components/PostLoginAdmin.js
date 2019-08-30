import React from 'react';
import './../Styles/PostLoginAdmin.css';
import SideBarContent from './SideBarContent';
import TopBar from './TopBar';
import axios from '../apis/requests';
import history from '../History';

class PostLoginAdmin extends React.Component {
	state = { allExecutedItems: [], allUnExecutedItems: [] };
	fetchAllOrders() {
		axios
			.get('/getAllExecuted')
			.then(succ => {
				let executed = succ.data.exe;
				let unExecuted = succ.data.unEx,
					arr = [],
					arr1 = [];
				for (let i in executed) {
					let obj = {};
					obj.totalBidUsers = executed[i].bidUsers.length;
					obj.soldBy = executed[i].email;
					obj.itemName = executed[i].itemName;
					obj.boughtBy = executed[i].maxPricedBid[0].email;
					obj.boughtAt = executed[i].maxPricedBid[0].bidPrice;
					obj.orderID = executed[i].orderID;
					obj.originalSellingPrice = executed[i].price;
					arr.push(obj);
				}
				for (let i in unExecuted) {
					let obj = {};
					obj.itemName = unExecuted[i].itemName;
					obj.orderID = unExecuted[i].orderID;
					obj.price = unExecuted[i].price;
					obj.soldBy = unExecuted[i].email;
					arr1.push(obj);
				}
				this.setState({
					allExecutedItems: arr,
					allUnExecutedItems: arr1
				});
			})
			.catch(err => {
				console.log(err);
			});
	}
	componentWillMount() {
		if (!this.props.location.state.isloggedin) {
			alert('Please Login');
			history.push('/');
		} else {
			this.fetchAllOrders();
		}
	}
	render() {
		return (
			<div>
				<TopBar
					session_id={this.props.match.params.id}
					firstName={this.props.location.state.firstName.toUpperCase()}
					lastName={
						this.props.location.state.lastName.toUpperCase() +
						' (admin)'
					}
				/>
				<div className="main-content">
					<SideBarContent
						title="All Executed Orders List"
						allExecutedItems={this.state.allExecutedItems}
					/>
					<SideBarContent
						title="All Un-Executed Orders List"
						allUnExecutedItems={this.state.allUnExecutedItems}
					/>
				</div>
			</div>
		);
	}
}
export default PostLoginAdmin;
