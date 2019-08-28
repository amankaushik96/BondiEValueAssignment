import React, { Component } from 'react';
import '../Styles/Login.css';
import { Form, Button } from 'react-bootstrap';
import axios from '../apis/requests';
import Header from './Header';
import history from '../History';

class Login extends Component {
	state = { email: '', password: '' };

	submitForm = e => {
		let { email, password } = this.state;
		if (!email || !password) {
			alert('Email/Password cannot be blank');
		} else {
			axios
				.post('/signin', {
					email: email,
					password: password
				})
				.then(res => {
					if (res.data.success) {
						let token = res.data.token;
						history.push(`/login/${token}`, {
							isloggedin: true,
							user_id: res.data.userID,
							firstName: res.data.firstName,
							lastName: res.data.lastName,
							email: email
						});
					} else alert(res.data.message);
				})
				.catch(err => {
					console.log(err);
				});
		}
		e.preventDefault();
	};
	setEmail = e => {
		this.setState({ email: e.target.value });
	};

	setPassword = e => {
		this.setState({ password: e.target.value });
	};
	render() {
		return (
			<div>
				<Header link="/signup" text="Sign Up" />
				<div className="login-main">
					<Form className="login-card" onSubmit={this.submitForm}>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								onChange={this.setEmail}
							/>
							<Form.Text className="text-muted">
								We'll never share your email with anyone else.
							</Form.Text>
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								onChange={this.setPassword}
							/>
						</Form.Group>
						<div className="login-button-container">
							<Button variant="primary" type="submit">
								Submit
							</Button>
						</div>
					</Form>
				</div>
			</div>
		);
	}
}

export default Login;
