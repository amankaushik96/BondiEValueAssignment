import React from 'react';
import '../Styles/Signup.css';
import { Form, Button } from 'react-bootstrap';
import axios from '../apis/requests';
import Header from './Header';

class Signup extends React.Component {
	state = { email: '', firstName: '', password: '', lastName: '' };

	submitForm = e => {
		let { firstName, lastName, email, password } = this.state;
		if (!firstName || !lastName || !password || !email) {
			alert('All fields are mandatory');
		} else {
			axios
				.post('/signup', {
					email,
					firstName,
					lastName,
					password
				})
				.then(res => {
					alert(res.data.message);
				})
				.catch(err => {
					console.log(err.message);
				});
		}
		e.preventDefault();
	};
	setEmail = e => {
		this.setState({ email: e.target.value });
	};
	setfirstName = e => {
		this.setState({ firstName: e.target.value });
	};
	setlastName = e => {
		this.setState({ lastName: e.target.value });
	};
	setPassword = e => {
		this.setState({ password: e.target.value });
	};
	render() {
		return (
			<div>
				<Header link="/" text="Sign In" />

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
						<Form.Group controlId="formBasicPassword">
							<Form.Label>First Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="first name"
								onChange={this.setfirstName}
							/>
						</Form.Group>
						<Form.Group controlId="formBasicPassword">
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="last name"
								onChange={this.setlastName}
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

export default Signup;
