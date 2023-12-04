// import { createSlice } from '@reduxjs/toolkit';
// import items from '../items';

// const initialState = {
//   value: items.menClothes,
// };

// export const menClothesSlice = createSlice({
//   name: 'menProducts',
//   initialState,
//   reducers: {},
// });

// export default menClothesSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../config/supabaseClient'; // Import your Supabase configuration

// Async thunk for fetching data from Supabase
export const fetchOffClothes = createAsyncThunk(
  'menProducts/fetchOffClothes',
  async () => {
    try {
      const { data, error } = await supabase
        .from('menProducts')
        .select('*')
        .gt('discount', 0);
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  value: [],
  status: 'idle',
  error: null,
};

export const offClothesSlice = createSlice({
  name: 'offProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffClothes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOffClothes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = action.payload;
      })
      .addCase(fetchOffClothes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default offClothesSlice.reducer;
