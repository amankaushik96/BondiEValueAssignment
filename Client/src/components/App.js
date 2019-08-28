import React from 'react';
import '../Styles/App.css';
import Login from './Login';
import Signup from './Signup';
import history from '../History';
import { Router, Switch, Route } from 'react-router-dom';
import SiderBar from './Sidebar';
import UserComponent from './UserComponent';

class App extends React.Component {
	state = { path: '' };

	render() {
		return (
			<div>
				<Router history={history}>
					<Switch>
						<Route path="/signup" exact component={Signup} />
						<Route path="/" exact component={Login} />
						<Route
							path="/login/:id"
							exact
							component={UserComponent}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
