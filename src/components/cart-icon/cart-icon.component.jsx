import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { newCartCount, selectIsCartOpen } from "../../store/cart/cart.selector";
import { CART_ACTION_TYPES } from "../../store/cart/cart.types";
import "./cart-icon.styles.scss";

const CartIcon = () => {
  const totalItems = useSelector(newCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();
  const toggleIsCartOpen = () => dispatch({
    type: CART_ACTION_TYPES.SET_IS_CART_OPEN, 
    payload: !isCartOpen
  });
  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon"></ShoppingIcon>
      <span className="item-count">{totalItems}</span>
    </div>
  )
}

export default CartIcon;