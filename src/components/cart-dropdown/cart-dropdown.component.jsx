import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartDropdown } from "../../redux/cart/cart.actions";

import {
	CartDropdownContainer,
	CartItemsContainer,
	EmptyMessage,
	CheckoutButton,
} from "./cart-dropdown.styles";

const CartDropDown = ({ cartItems, history, dispatch }) => (
	<CartDropdownContainer>
		<CartItemsContainer>
			{cartItems.length ? (
				cartItems.map((cartItem) => (
					<CartItem key={cartItem.id} item={cartItem} />
				))
			) : (
				<EmptyMessage>Your cart is empty.</EmptyMessage>
			)}
		</CartItemsContainer>
		<CheckoutButton
			onClick={() => {
				history.push("/checkout");
				dispatch(toggleCartDropdown());
			}}
		>
			CHECKOUT
		</CheckoutButton>
	</CartDropdownContainer>
);

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems,
});

export default withRouter(connect(mapStateToProps)(CartDropDown));
