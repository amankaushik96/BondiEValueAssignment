import React from 'react';
import '../Styles/SideBar.css';

class SideBar extends React.Component {
	render() {
		return (
			<div className="sidebar">
				<div className="topTitle">
					<span>BOND-E</span>
					<br />
					<span style={{ position: 'relative', left: '15px' }}>
						VALUE
					</span>
				</div>
				<div className="sidebar-contents">
					<div className="sidebar-top-content">
						<div className="sidebar-top-content-item">
							<img
								src="../ic_nav_collections.svg"
								alt="Smiley face"
								className="img-sidebar-top-level"
							/>
							<div className="menu-item-text">Sell Order</div>
						</div>
						<div className="sidebar-top-content-item">
							<img
								src="../ic_nav_sampling.svg"
								alt="Smiley face"
								className="img-sidebar-top-level"
							/>
							<div className="menu-item-text">Buy Order</div>
						</div>
						<div className="sidebar-top-content-item">
							<img
								src="../ic_nav_production.svg"
								alt="Smiley face"
								className="img-sidebar-top-level"
							/>
							<div className="menu-item-text">Match Order</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default SideBar;
