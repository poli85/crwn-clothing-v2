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

export const addItemToCart = (cartItems, productToAdd) => {
  return addCartItem(cartItems, productToAdd);
}

export const removeItemFromCart = (cartItems, productToRemove) => {
  return removeCartItem(cartItems, productToRemove);
}

export const clearItemFromCart = (cartItems, productToRemove) => {
  return clearCartItem(cartItems, productToRemove);
}