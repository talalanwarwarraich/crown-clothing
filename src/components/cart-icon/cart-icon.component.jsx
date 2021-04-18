import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";

import { connect } from "react-redux";
import { toggleCartDropdown } from "../../redux/cart/cart.actions";

const CartIcon = ({ toggleCartDropdown }) => (
	<div onClick={toggleCartDropdown} className="cart-icon">
		<ShoppingIcon className="shopping-icon" />
		<span className="item-count">0</span>
	</div>
);

const mapDispatchToProps = (dispatch) => ({
	toggleCartDropdown: () => dispatch(toggleCartDropdown()),
});

export default connect(null, mapDispatchToProps)(CartIcon);
