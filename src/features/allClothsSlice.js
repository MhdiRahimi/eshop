// allClothsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../config/supabaseClient';

export const fetchAllClothes = createAsyncThunk(
  'allClothes/fetchAllClothes',
  async () => {
    try {
      const { data, error } = await supabase.from('menProducts').select('*');
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteCloth = createAsyncThunk(
  'allClothes/deleteCloth',
  async (itemId) => {
    try {
      const { error } = await supabase
        .from('menProducts')
        .delete()
        .eq('id', itemId);
      if (error) {
        throw error;
      }
      return id; 
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

const allClothsSlice = createSlice({
  name: 'allClothes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllClothes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllClothes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = action.payload;
      })
      .addCase(fetchAllClothes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteCloth.fulfilled, (state, action) => {
        // Remove the deleted item from the state
        state.value = state.value.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteCloth.rejected, (state, action) => {
        // Handle delete error if needed
        console.error('Error deleting item:', action.error.message);
      });
  },
});

export default allClothsSlice.reducer;
