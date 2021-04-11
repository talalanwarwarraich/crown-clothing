import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { auth } from "./firebase/firebase.utils";
import SignInAndSignUpPage from "./pages/signin-and-signup/signin-and-signup.component.jsx";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";

class App extends Component {
	unsubscribeFromAuth = null;

	constructor() {
		super();
		this.state = {
			currentUser: null,
		};
	}

	componentDidMount() {
		this.listenFirebaseAuthEvent();
	}

	listenFirebaseAuthEvent = () => {
		this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
			this.setState({ currentUser: user });
			console.log("currentUser", user);
		});
	};

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		return (
			<div>
				<Header currentUser={this.state.currentUser} />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/shop" component={ShopPage} />
					<Route path="/signin" component={SignInAndSignUpPage} />
				</Switch>
			</div>
		);
	}
}

export default App;
