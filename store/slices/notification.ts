import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
  visible: boolean;
  message: string;
  type: "success" | "error" | "info" | null;
}

const initialState: NotificationState = {
  visible: false,
  message: "",
  type: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<{
        message: string;
        type: "success" | "error" | "info";
      }>
    ) => {
      state.visible = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideNotification: (state) => {
      state.visible = false;
      state.message = "";
      state.type = null;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
