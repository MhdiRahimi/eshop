import { configureStore } from '@reduxjs/toolkit';
import menClothesSlice from './features/menClothesSlice';
import womenClothesSlice from './features/womenClothesSlice';
import cartSlice from './features/cartSlice';
import offClothes from './features/offClothes';
import allClothsSlice from './features/allClothsSlice';
import productSlice from './features/productSlice';

export const store = configureStore({
  reducer: {
    menProducts: menClothesSlice,
    womenProducts: womenClothesSlice,
    offProducts: offClothes,
    cartProducts: cartSlice,
    allClothes: allClothsSlice,
    product: productSlice,
  },
});
