

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../config/supabaseClient'; // Import your Supabase configuration

// Async thunk for fetching data from Supabase
export const fetchMenClothes = createAsyncThunk(
  'menProducts/fetchMenClothes',
  async () => {
    try {
      const { data, error } = await supabase
        .from('menProducts')
        .select('*')
        .neq('gender', 'women'); // Exclude women's clothes
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

export const menClothesSlice = createSlice({
  name: 'menProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenClothes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenClothes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = action.payload;
      })
      .addCase(fetchMenClothes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default menClothesSlice.reducer;
