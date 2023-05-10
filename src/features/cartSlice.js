import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  quantity: 0,
};

export const cartSlice = createSlice({
  name: 'cartProducts',
  initialState,

  reducers: {
    addCart: (state, action) => {
      const find = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (find === 0) {
        state.cart[find].quanty += 0;
      } else {
        state.quantity += 1;
        const items = { ...action.payload, quanty: 1, userId: '' };
        state.cart.push(items);
      }
    },
    incrementQuantity: (state, action) => {
      state.quantity += 1;
      const find = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (find >= 0) {
        state.cart[find].quanty += 1;
      } else {
        const items = { ...action.payload, quanty: 1, userId: '' };
        state.cart.push(items);
      }
    },

    decrementQuantity: (state, action) => {
      state.quantity -= 1;
      const find = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (find >= 0) {
        state.cart[find].quanty -= 1;
      } else {
        const items = { ...action.payload, quanty: 2, userId: '' };
        state.cart.push(items);
      }
    },
    removeItem: (state, action) => {
      state.quantity === state.cart.quanty;
      const find = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      // let indexToRemove = state.cart.indexOf(action.payload);
      if (find >= 0) {
        state.cart[find].quanty = 0;
      }
      state.cart = state.cart.filter((item) => item.quanty !== 0);

      // state.cart.splice(find, 1);
    },

    clearCart: (state, action) => {
      state.cart = [];
    },
  },
});

export const {
  addCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
