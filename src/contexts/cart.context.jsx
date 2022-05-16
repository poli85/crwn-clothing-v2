import { createContext, useEffect, useReducer, useState } from "react";

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
  isCartOpen: false,
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

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  totalItems: 0,
  totalPrice: 0
}

const cartReducer = (state, action) => {
  const {type, payload} = action;

  switch(type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      };  
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }
    default: 
      throw new Error(`Unhandled type ${type} in cartReducer`)
  }
}

export const CartProvider = ({ children }) => {

  const [{cartItems, isCartOpen, totalItems, totalPrice}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newTotalItems = newCartItems.reduce((total, item) => total + item.quantity, 0);
    const newTotalPrice = newCartItems.reduce((totalPrice, item) => totalPrice + (item.price * item.quantity), 0);
    dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: {
      cartItems: newCartItems, 
      totalPrice: newTotalPrice, 
      totalItems: newTotalItems
    }});
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  }

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  }

  const clearItemFromCart = (productToRemove) => {
    const newCartItems = clearCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  }

  const setIsCartOpen = (bool) => {
    dispatch({type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool});
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


  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}