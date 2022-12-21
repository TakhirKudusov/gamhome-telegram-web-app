import { AnyAction, combineReducers } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { configureStore } from "@reduxjs/toolkit";
import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import formDataReducer from "./slicers/formDataSlicer";

const combinedReducer = combineReducers({
  formData: formDataReducer,
});

const reducer = (
  state: ReturnType<typeof combinedReducer>,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware<any>) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  } as any);

export const wrapper = createWrapper(makeStore, { debug: true });
