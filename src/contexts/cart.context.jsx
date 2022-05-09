import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);
  if (existingCartItem) {
    return cartItems.map(cartItem => {
      return cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity += 1} : cartItem
    })
  }
  return [...cartItems, {...productToAdd, quantity: 1}];
}

export const CartContext = createContext({
  isCartOpern: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  totalItems: 0,
  setTotalItems: () => {}
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, totalItems };

  useEffect(() => {
    setTotalItems(cartItems.reduce((total, item) => total + item.quantity, 0))
  }, [cartItems])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}