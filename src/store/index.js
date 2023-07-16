import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { createSelector } from "reselect";

const appSlice = createSlice({
  name: "app",
  initialState: {
    counter: 0,
  },
  reducers: {
    increment(state) {
      state.counter += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => ({
      ...state,
      ...action.payload.app,
    }));
  },
});

export const { increment } = appSlice.actions;

const selectAppState = (store) => store?.app;

export const selectCounter = createSelector(
  [selectAppState],
  (state) => state?.counter || 0
);

const rootReducer = combineReducers({
  [appSlice.name]: appSlice.reducer,
});

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
  });

export const store = makeStore();

export const wrapper = createWrapper(makeStore);
