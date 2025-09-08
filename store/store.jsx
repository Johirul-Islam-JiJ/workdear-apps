import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api, liveSupportApi } from "./features/baseQuery";
import { jobForm } from "./slices/jobform";
import settings from "./slices/settings";
import user from "./slices/user";

export const store = configureStore({
  reducer: {
    settings,
    user,
    jobForm: jobForm.reducer,
    [api.reducerPath]: api.reducer,
    [liveSupportApi.reducerPath]: liveSupportApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, liveSupportApi.middleware),
});

setupListeners(store.dispatch);
