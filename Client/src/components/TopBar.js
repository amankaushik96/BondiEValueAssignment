import React from 'react';
import '../Styles/TopBar.css';
import { Form, Button } from 'react-bootstrap';
import history from '../History';
import axios from '../apis/requests';

class TopBar extends React.Component {
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

export default TopBar;
