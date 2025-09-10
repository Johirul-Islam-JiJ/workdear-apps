import { User } from "@/types/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserStore = {
  user: User | null;
  token: string | null;
  loading: boolean;
};

const user = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
    loading: true,
  } as UserStore,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      AsyncStorage.removeItem("token");
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
      AsyncStorage.removeItem("token");
    },
    updateUserBalance: (state, action: PayloadAction<string>) => {
      if (state.user !== null) {
        state.user.wallet_balance.earning_balance = (
          parseFloat(state.user.wallet_balance.earning_balance) +
          parseFloat(action.payload)
        ).toFixed(4);
      }
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
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
