import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../Styles/MainContent.css';
import axios from '../apis/requests';

class MainContent extends Component {
	state = { itemName: '', price: 0 };
	makeSELLCall = () => {
		axios
			.post('/sellItem', {
				token: this.props.token,
				email: this.props.email,
				price: this.state.price,
				itemName: this.state.itemName
			})
			.then(succ => {
				this.props.callback(succ);
			})
			.catch(err => {
				console.log(err);
			});
	};
	sellOrder = () => {
		if (this.state.itemName.length === 0 || this.state.price === 0) {
			alert('Both fields are required');
		} else {
			this.makeSELLCall();
		}
	};
	setName = e => {
		this.setState({ itemName: e.target.value });
	};
	setPrice = e => {
		this.setState({ price: e.target.value });
	};
	render() {
		return (
			<div className="main-order">
				<div className="sell-order">
					<div style={{ alignSelf: 'center', paddingBottom: '30px' }}>
						Sell Order
					</div>
					<Form className="login-card" onSubmit={this.submitForm}>
						<Form.Group controlId="formBasicEmail">
							<Form.Label style={{ fontSize: '12px' }}>
								Order Name
							</Form.Label>
							<Form.Control type="text" onChange={this.setName} />
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label style={{ fontSize: '12px' }}>
								Order Amount($)
							</Form.Label>
							<Form.Control
								type="number"
								onChange={this.setPrice}
							/>
						</Form.Group>
						<div
							style={{
								padding: ' 0 0 10px 0',
								borderRadius: '10px'
							}}
						></div>
						<div className="login-button-container">
							<Button variant="primary" onClick={this.sellOrder}>
								SELL
							</Button>
						</div>
					</Form>
				</div>
				<div className="execute-order">
					<div>
						<Button
							variant="primary"
							type="submit"
							style={{ width: '200px' }}
						>
							Execute All Orders
						</Button>
					</div>
				</div>
			</div>
		);
	}
}

export default MainContent;
