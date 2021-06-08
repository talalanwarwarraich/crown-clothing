import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.css";
import SignInAndSignUpPage from "./pages/signin-and-signup/signin-and-signup.component.jsx";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import Checkout from "./pages/checkout/checkout.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

class App extends Component {
	unsubscribeFromAuth = null;

	componentDidMount() {
		this.listenFirebaseAuthEvent();
	}

	listenFirebaseAuthEvent = () => {
		const { setCurrentUser } = this.props;
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);
				userRef.onSnapshot((snapShot) => {
					setCurrentUser({ id: snapShot.id, ...snapShot.data() });
				});
			} else setCurrentUser(userAuth);
		});
	};

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	renderSignInPage = () => {
		const { currentUser } = this.props;
		return currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />;
	};

	render() {
		return (
			<div>
				<Header />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/shop" component={ShopPage} />
					<Route exact path="/checkout" component={Checkout} />
					<Route exact path="/signin" render={this.renderSignInPage} />
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
