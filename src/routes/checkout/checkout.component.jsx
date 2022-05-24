import { useSelector } from "react-redux";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { newCartTotal, selectCartItems } from "../../store/cart/cart.selector";
import "./checkout.styles.scss";

const Checkout = () => {
  const totalPrice = useSelector(newCartTotal);
  const cartItems = useSelector(selectCartItems);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Qauntity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>  
      {
        cartItems.map(item => {
          return(
            <CheckoutItem key={item.id} cartItem={item}></CheckoutItem>
          );
        })
      }
      <span className="total">Total: {totalPrice}</span>
    </div>
  )
}

export default Checkout;