import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, clearItemFromCart, removeItemFromCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { CART_ACTION_TYPES } from "../../store/cart/cart.types";
import "./checkout-item.styles.scss";

const CheckoutItem = ({cartItem}) => {
  const {name, imageUrl, price, quantity} = cartItem;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const dispatchNewCartItems = newCartItems => dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems});
  const removeItemHandler = () => {
    const newCartItems = removeItemFromCart(cartItems, cartItem);
    dispatchNewCartItems(newCartItems);
  }
  const addItemHandler = () => {
    const newCartItems = addItemToCart(cartItems, cartItem);
    dispatchNewCartItems(newCartItems);
  }
  const clearItemHandler = () => {
    const newCartItems = clearItemFromCart(cartItems, cartItem);
    dispatchNewCartItems(newCartItems);
  }

  return(
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemHandler}>&#10094;</div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>&#10095;</div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={clearItemHandler}>&#10005;</div>
    </div>
  )
}

export default CheckoutItem;