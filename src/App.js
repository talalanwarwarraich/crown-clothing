import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
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

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	listenFirebaseAuthEvent = () => {
		this.unsubscribeFromAuth = auth.onAuthStateChanged((userAuth) => {
			if (userAuth) this.setAuthUserState(userAuth);
			else this.setState({ currentUser: userAuth });
		});
	};

	setAuthUserState = async (userAuth) => {
		const userRef = await createUserProfileDocument(userAuth);
		userRef.onSnapshot((snapShot) => {
			this.setState({
				currentUser: { id: snapShot.id, ...snapShot.data() },
			});
		});
	};

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
