import '../Styles/Header.css';
import React from 'react';
import { Link } from 'react-router-dom';
import history from '../History';
import axios from '../apis/requests';

class Header extends React.Component {
	setAction = () => {
		history.push(this.props.link);
	};

	adminLogin = () => {
		let email = window.prompt('Enter email');
		if (email) {
			let password = window.prompt('Enter password');
			if (password) {
				//make call here to login
				axios
					.post('/signin', {
						email,
						password
					})
					.then(res => {
						if (res.data.success) {
							history.push(`/admin/${res.data.token}`, {
								isloggedin: true,
								user_id: res.data.userID,
								firstName: res.data.firstName,
								lastName: res.data.lastName
							});
						} else alert(res.data.message);
					});
			} else {
				alert('Please enter a password');
			}
		}
	};

	render() {
		return (
			<div className="header">
				<Link
					to={this.props.link}
					className="signin-button"
					onClick={this.setAction}
				>
					{this.props.text}
				</Link>
				<Link className="signin-button-admin" onClick={this.adminLogin}>
					Admin Login
				</Link>
			</div>
		);
	}
}
export default Header;
