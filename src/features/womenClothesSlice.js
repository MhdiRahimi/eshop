// import { createSlice } from '@reduxjs/toolkit';
// import items from '../items';

// const initialState = {
//   value: items.womenClothes,
// };

// export const womenClothesSlice = createSlice({
//   name: 'womenProducts',
//   initialState,
//   reducers: {},
// });

// export default womenClothesSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../config/supabaseClient';
export const fetchWomenClothes = createAsyncThunk(
  'menProducts/fetchWomenClothes',
  async () => {
    try {
      const { data, error } = await supabase
        .from('menProducts')
        .select('*')
        .neq('gender', 'men');
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

export const womenClothesSlice = createSlice({
  name: 'womenProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWomenClothes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWomenClothes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = action.payload;
      })
      .addCase(fetchWomenClothes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default womenClothesSlice.reducer;
