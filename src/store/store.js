import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import { cartReducer } from './cart/cart.reducer';
import { categoriesReducer } from './categories/categories.reducer';
import { userReducer } from './user/user.reducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer
})

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, reducers);

const middleware = process.env.NODE_ENV === 'development' ? [logger] : [];


export const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: process.env.NODE_ENV === 'development'
});

export const persistor = persistStore(store);