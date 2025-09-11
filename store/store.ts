import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api, liveSupportApi } from "./features/baseQuery";
import jobForm from "./slices/jobform";
import notification from "./slices/notification";
import settings from "./slices/settings";
import user from "./slices/user";

export const store = configureStore({
  reducer: {
    settings,
    user,
    jobForm,
    notification,
    [api.reducerPath]: api.reducer,
    [liveSupportApi.reducerPath]: liveSupportApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, liveSupportApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
