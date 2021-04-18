import { Component } from "react";
import "./header.styles.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropDown from "../cart-dropdown/cart-dropdown.component";
import { toggleCartDropdown } from "../../redux/cart/cart.actions";

// class Header extends Component {
// 	handleCartDropDownToggle = () => {
// 		const { toggleCartDropdown } = this.props;
// 		toggleCartDropdown();
// 	};

// 	render() {
// 		const { currentUser, hidden } = this.props;
// 		return (
// 			<div className="header">
// 				<Link className="logo-container" to="/">
// 					<Logo className="logo" />
// 				</Link>
// 				<div className="options">
// 					<Link className="option" to="/shop">
// 						SHOP
// 					</Link>
// 					<Link className="option" to="/shop">
// 						CONTACT
// 					</Link>
// 					{currentUser ? (
// 						<div className="option" onClick={() => auth.signOut()}>
// 							SIGN OUT
// 						</div>
// 					) : (
// 						<Link className="option" to="/signin">
// 							SIGN IN
// 						</Link>
// 					)}
// 					<CartIcon onClick={this.handleCartDropDownToggle} />
// 				</div>
// 				{!hidden ? <CartDropDown /> : null}
// 			</div>
// 		);
// 	}
// }

const Header = ({ currentUser, hidden }) => {
	return (
		<div className="header">
			<Link className="logo-container" to="/">
				<Logo className="logo" />
			</Link>
			<div className="options">
				<Link className="option" to="/shop">
					SHOP
				</Link>
				<Link className="option" to="/shop">
					CONTACT
				</Link>
				{currentUser ? (
					<div className="option" onClick={() => auth.signOut()}>
						SIGN OUT
					</div>
				) : (
					<Link className="option" to="/signin">
						SIGN IN
					</Link>
				)}
				<CartIcon />
			</div>
			{!hidden ? <CartDropDown /> : null}
		</div>
	);
};

const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
	currentUser,
	hidden,
});

export default connect(mapStateToProps)(Header);
