import { createSlice } from '@reduxjs/toolkit';
import items from '../items';

const initialState = {
  value: items.menClothes,
};

export const menClothesSlice = createSlice({
  name: 'menProducts',
  initialState,
  reducers: {},
});



export default menClothesSlice.reducer;
