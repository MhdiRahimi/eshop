import { createSlice } from '@reduxjs/toolkit';
import items from '../items';

const initialState = {
  value: items.womenClothes,
};

export const womenClothesSlice = createSlice({
  name: 'womenProducts',
  initialState,
  reducers: {},
});

export default womenClothesSlice.reducer;
