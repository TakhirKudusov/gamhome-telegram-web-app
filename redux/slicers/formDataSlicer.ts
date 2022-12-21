import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { City, FieldAction, TFormData } from "./types";
import { axiosInstance } from "../../common/axiosInstance";

export const fetchCitiesData = createAsyncThunk<{ data: City[] }>(
  "formData/fetchCitiesData",
  async function (_, { rejectWithValue }) {
    try {
      return await axiosInstance.get(`regions`);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const initialState: TFormData = {
  citiesData: null,
  data: {},
  isError: false,
  isLoading: false,
};

const formDataSlicer = createSlice({
  name: "formData",
  initialState,
  reducers: {
    setPrimitiveField(state, action: FieldAction) {
      state.data[action.payload.name] = action.payload.value as any;
    },
    setComplexField(state, action: FieldAction) {
      if (typeof state.data[action.payload.name] !== "object") {
        state.data.metros = [];
      }
      if (
        (state.data[action.payload.name] as Array<any>).includes(
          action.payload.value
        )
      ) {
        (state.data[action.payload.name] as Array<any>) = (
          state.data[action.payload.name] as Array<any>
        ).filter((el) => el !== action.payload);
      } else {
        (state.data[action.payload.name] as Array<any>).push(
          action.payload.value
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCitiesData.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchCitiesData.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.citiesData = action.payload.data;
      })
      .addCase(fetchCitiesData.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        console.error(action.payload);
      });
  },
});

export const { setPrimitiveField, setComplexField } = formDataSlicer.actions;

export default formDataSlicer.reducer;
