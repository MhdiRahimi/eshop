import { configureStore } from '@reduxjs/toolkit';
import menClothesSlice from './features/menClothesSlice';
import womenClothesSlice from './features/womenClothesSlice';
import cartSlice from './features/cartSlice';

export const store = configureStore({
  reducer: {
    menProducts: menClothesSlice,
    womenProducts: womenClothesSlice,
    cartProducts: cartSlice,
  },
});
