import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sessionToken: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      async function getSession() {
        const { data, error } = await supabase.auth.getSession();

        try {
          state.sessionToken = data.session;
        } catch (error) {
          console.log(error);
        }
      }

      getSession();
    },
  },
});
export const { login } = authSlice.actions;

export default authSlice.reducer;
