import { CostCenter } from "@/types/CostCenter";
import { Advertisement, AppConfig } from "@/types/GeneralData";
import { createSlice } from "@reduxjs/toolkit";

export interface SettingsState {
  showSidebar: boolean;
  theme: string;
  advertisement: Advertisement[] | [];
  generalData: AppConfig;
  costCenter: CostCenter[] | [];
  handleKeyboard: boolean;
}

const settings = createSlice({
  name: "settings",
  initialState: {
    showSidebar: true,
    theme: "light",
    advertisement: [],
    generalData: {},
    costCenter: [],
    handleKeyboard: false,
  } as SettingsState,
  reducers: {
    toggleSideBar: (state, action) => {
      if (action.payload === undefined) {
        state.showSidebar = state.showSidebar === true ? false : true;
      } else {
        state.showSidebar = action.payload;
      }
    },
    setTheme: (state, action) => {
      const newTheme = action.payload;
      state.theme = newTheme;
    },
    setAdvertisement: (state, action) => {
      state.advertisement = action.payload;
    },
    setGeneralData: (state, action) => {
      state.generalData = action.payload;
    },
    setCostCenter: (state, action) => {
      state.costCenter = action.payload;
    },
    setHandleKeyboard: (state, action) => {
      state.handleKeyboard = action.payload;
    },
  },
});

export const {
  toggleSideBar,
  setTheme,
  setAdvertisement,
  setGeneralData,
  setCostCenter,
  setHandleKeyboard,
} = settings.actions;
export default settings.reducer;
