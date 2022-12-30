import { createSlice } from "@reduxjs/toolkit";
import { Select, TDisableSelect } from "./types";

const initialState: TDisableSelect = {
  isMapDisabled: true,
  isCitiesDisabled: true,
  isDistrictsDisabled: true,
  isMetrosDisabled: true,
};

const disableSelectsSlicer = createSlice({
  name: "disableSelects",
  initialState,
  reducers: {
    setDisabled(state, action: { type: string; payload: Select }) {
      state[action.payload] = true;
    },
    setEnabled(state, action: { type: string; payload: Select }) {
      state[action.payload] = false;
    },
  },
});

export const { setDisabled, setEnabled } = disableSelectsSlicer.actions;

export default disableSelectsSlicer.reducer;
