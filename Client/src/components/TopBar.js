import React from 'react';
import '../Styles/TopBar.css';
import { Form, Button } from 'react-bootstrap';
import history from '../History';
import axios from '../apis/requests';

class TopBar extends React.Component {
	exeAllOrders = () => {
		axios
			.get('/executeAllOrders')
			.then(res => {
				if (res.data.success) {
					alert('All order executed Suucessfully');
					window.location.reload();
				} else {
					alert(res.data.message);
				}
			})
			.catch(err => {});
	};
	executeAllOrders = () => {
		let password = window.prompt(
			'Please confirm you password before executing all orders'
		);
		let email = this.props.email;
		axios
			.post('/signin', {
				email,
				password
			})
			.then(res => {
				if (res.data.success) {
					this.exeAllOrders();
				} else {
					alert('Password is not valid');
				}
			})
			.catch(err => {
				console.log(err);
			});
	};
	logout = () => {
		let sessionID = this.props.session_id;
		axios
			.get(`/logout?token=${sessionID}`)
			.then(res => {
				if (res.data.success) {
					history.push('/');
				}
			})
			.catch(err => {
				alert(err.data.message);
			});
	};
	render() {
		if (this.props.isAdmin) {
			return (
				<div className="topbar">
					<div
						style={{
							color: '#fff',
							padding: '50px',
							fontWeight: 'bold',
							alignSelf: 'center',
							fontSize: '18px'
						}}
					>
						Welcome: {this.props.firstName} {this.props.lastName}
					</div>

					<Button
						onClick={this.executeAllOrders}
						type="submit"
						style={{
							width: '200px',
							position: 'fixed',
							right: '43%',
							alignSelf: 'center',
							backgroundColor: 'red',
							color: 'white',
							cursor: 'pointer'
						}}
					>
						Execute All Orders
					</Button>
					<Button
						onClick={this.logout}
						variant="secondary"
						type="submit"
						style={{
							width: '200px',
							position: 'fixed',
							right: '20px',
							alignSelf: 'center'
						}}
					>
						Logout
					</Button>
				</div>
			);
		} else {
			return (
				<div className="topbar">
					<div
						style={{
							color: '#fff',
							padding: '50px',
							fontWeight: 'bold',
							alignSelf: 'center',
							fontSize: '18px'
						}}
					>
						Welcome: {this.props.firstName} {this.props.lastName}
					</div>

					<Button
						onClick={this.logout}
						variant="secondary"
						type="submit"
						style={{
							width: '200px',
							position: 'fixed',
							right: '20px',
							alignSelf: 'center'
						}}
					>
						Logout
					</Button>
				</div>
			);
		}
	}
}

export default TopBar;
