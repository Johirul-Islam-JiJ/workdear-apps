import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
    loading: true,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      AsyncStorage.removeItem("token");
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
      AsyncStorage.removeItem("token");
    },
    updateUserBalance: (state, action) => {
      if (state.user) {
        state.user.wallet_balance.earning_balance = (
          parseFloat(state.user.wallet_balance.earning_balance) +
          parseFloat(action.payload)
        ).toFixed(4);
      }
    },
    setUserLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setUser,
  logout,
  setToken,
  updateUserBalance,
  setUserLoading,
  removeToken,
} = user.actions;
export default user.reducer;
