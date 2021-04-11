import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import SignInAndSignUpPage from "./pages/signin-and-signup/signin-and-signup.component.jsx";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";

function App() {
	return (
		<div>
			<Header />
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route path="/shop" component={ShopPage} />
				<Route path="/signin" component={SignInAndSignUpPage} />
			</Switch>
		</div>
	);
}

export default App;
