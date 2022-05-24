import "./product-card.styles.scss";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { addItemToCart } from "../../store/cart/cart.action";
import { CART_ACTION_TYPES } from "../../store/cart/cart.types";

const ProductCard = ({product}) => {
  const {name, price, imageUrl} = product;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const addProductToCart = () => {
    const newCartItems = addItemToCart(cartItems, product);
    dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems});
  }
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>
    </div>
  )
}

export default ProductCard;