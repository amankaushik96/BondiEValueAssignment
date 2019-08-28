import '../Styles/Header.css';
import React from 'react';
import { Link } from 'react-router-dom';
import history from '../History';

class Header extends React.Component {
	setAction = () => {
		history.push(this.props.link);
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
			</div>
		);
	}
}
export default Header;
