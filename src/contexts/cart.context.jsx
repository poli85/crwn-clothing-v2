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

const removeCartItem = (cartItems, productToRemove) => {
  if (productToRemove.quantity > 1) {
    return cartItems.map(cartItem => {
      return cartItem.id === productToRemove.id ? {...cartItem, quantity: cartItem.quantity -= 1} : cartItem
    })
  }
  return cartItems.filter(item => item.id !== productToRemove.id);
}

const clearCartItem = (cartItems, productToRemove) => {
  return cartItems.filter(item => item.id !== productToRemove.id);
}

export const CartContext = createContext({
  isCartOpern: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  totalItems: 0,
  setTotalItems: () => {},
  totalPrice: 0,
  setTotalPrice: () => {}
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  }

  const clearItemFromCart = (productToRemove) => {
    setCartItems(clearCartItem(cartItems, productToRemove));
  }

  const value = { 
    isCartOpen, 
    setIsCartOpen, 
    cartItems, 
    addItemToCart, 
    removeItemFromCart, 
    clearItemFromCart, 
    totalItems,
    totalPrice
  };

  useEffect(() => {
    setTotalItems(cartItems.reduce((total, item) => total + item.quantity, 0))
  }, [cartItems]);

  useEffect(() => {
    setTotalPrice(cartItems.reduce((totalPrice, item) => totalPrice + (item.price * item.quantity), 0))
  }, [cartItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}