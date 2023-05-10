import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';
import menClothesSlice from './features/menClothesSlice';
import womenClothesSlice from './features/womenClothesSlice';
import cartSlice from './features/cartSlice';
import authSlice from './features/authSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    menProducts: menClothesSlice,
    womenProducts: womenClothesSlice,
    cartProducts: cartSlice,
    auth: authSlice,
  },
});
