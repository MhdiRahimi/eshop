// productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../config/supabaseClient';

export const fetchProductById = createAsyncThunk(
  'product/fetchProductById',
  async (productId) => {
    try {
      const { data, error } = await supabase
        .from('menProducts')
        .select('*')
        .eq('id', productId);

      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (updatedProduct) => {
    try {
      const { data, error } = await supabase
        .from('menProducts')
        .upsert([updatedProduct]);
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
  value: {},
  status: 'idle',
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Optionally update the state with the new product data
        state.value = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
