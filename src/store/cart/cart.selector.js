import { createSelector } from "reselect";

const selectCartReducer = state => state.cart;

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  cartState => cartState.isCartOpen
);

export const selectCartItems = createSelector(
  [selectCartReducer],
  cartState => cartState.cartItems
);

export const newCartCount = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce((total, item) => total + item.quantity, 0)
);

export const newCartTotal = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce((totalPrice, item) => totalPrice + (item.price * item.quantity), 0)
);
