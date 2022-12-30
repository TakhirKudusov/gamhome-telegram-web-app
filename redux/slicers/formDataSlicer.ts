import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { City, FieldAction, FieldName, TFormData } from "./types";
import { axiosInstance } from "../../common/axiosInstance";
import { handleNumFormat } from "./helpers";

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
  data: {
    city: {
      name: "",
      id: null,
    },
    metros: null,
    districts: null,
    polygon: null,
    isAgent: false,
    category: 2,
    type: 2,
    minPrice: "10 000 000",
    maxPrice: "15 000 000",
    author: 3,
    minKmMetro: "1",
    maxKmMetro: "5",
    fee: true,
    params: {
      repair: null,
      wallMaterial: null,
      houseType: null,
      minFloorsInHouse: "",
      maxFloorsInHouse: "",
      minKitchenSquare: "",
      maxKitchenSquare: "",
      minSquare: "",
      maxSquare: "",
      minRoomsQuantity: "",
      maxRoomsQuantity: "",
      minFloor: "",
      maxFloor: "",
      minLivingSquare: "",
      maxLivingSquare: "",
      minDeliveryTime: "",
      maxDeliveryTime: "",
      minHouseSquare: "",
      maxHouseSquare: "",
      minLandSquare: "",
      maxLandSquare: "",
      minRoomsInFlatQuantity: "",
      maxRoomsInFlatQuantity: "",
      minRoomSquare: "",
      maxRoomSquare: "",
    },
  },
  isError: false,
  isLoading: false,
};

const formDataSlicer = createSlice({
  name: "formData",
  initialState,
  reducers: {
    setPrimitiveField(state, action: FieldAction) {
      if (action.payload.name === "category") {
        state.data.params = {
          repair: null,
          wallMaterial: null,
          houseType: null,
          minFloorsInHouse: "",
          maxFloorsInHouse: "",
          minKitchenSquare: "",
          maxKitchenSquare: "",
          minSquare: "",
          maxSquare: "",
          minRoomsQuantity: "",
          maxRoomsQuantity: "",
          minFloor: "",
          maxFloor: "",
          minLivingSquare: "",
          maxLivingSquare: "",
          minDeliveryTime: "",
          maxDeliveryTime: "",
          minHouseSquare: "",
          maxHouseSquare: "",
          minLandSquare: "",
          maxLandSquare: "",
          minRoomsInFlatQuantity: "",
          maxRoomsInFlatQuantity: "",
          minRoomSquare: "",
          maxRoomSquare: "",
        };
      }

      if (
        action.payload.name === "minPrice" ||
        action.payload.name === "maxPrice"
      ) {
        handleNumFormat(state, action, 999_999_999, "999 999 999");
        return;
      }

      if (
        action.payload.name === "minKmMetro" ||
        action.payload.name === "maxKmMetro"
      ) {
        handleNumFormat(state, action, 50, "50");
        return;
      }

      if (action.payload.name === "params" && action.payload.addType) {
        (state.data[action.payload.name]![action.payload.addType] as any) =
          action.payload.value;
        return;
      }

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
    setParamInput(state, action: FieldAction) {
      if (action.payload.name.toLowerCase().includes("floor")) {
        handleNumFormat(state, action, 50, "50", true);
        return;
      }
      if (action.payload.name.toLowerCase().includes("square")) {
        handleNumFormat(state, action, 9_999, "9 999", true);
        return;
      }
      if (action.payload.name.toLowerCase().includes("quantity")) {
        handleNumFormat(state, action, 15, "15", true);
        return;
      }
      if (action.payload.name.toLowerCase().includes("delivery")) {
        handleNumFormat(state, action, 2023, "2023", true, true);
        return;
      }
      (state.data.params as any)[action.payload.name] = action.payload.value;
    },
    clearFormData(state) {
      state.data = {
        city: {
          name: "",
          id: null,
        },
        metros: null,
        districts: null,
        minPrice: "",
        maxPrice: "",
        minKmMetro: "",
        maxKmMetro: "",
        polygon: null,
        isAgent: false,
        category: null,
        type: null,
        author: null,
        fee: false,
        params: {
          repair: null,
          wallMaterial: null,
          houseType: null,
          minFloorsInHouse: "",
          maxFloorsInHouse: "",
          minKitchenSquare: "",
          maxKitchenSquare: "",
          minSquare: "",
          maxSquare: "",
          minRoomsQuantity: "",
          maxRoomsQuantity: "",
          minFloor: "",
          maxFloor: "",
          minLivingSquare: "",
          maxLivingSquare: "",
          minDeliveryTime: "",
          maxDeliveryTime: "",
          minHouseSquare: "",
          maxHouseSquare: "",
          minLandSquare: "",
          maxLandSquare: "",
          minRoomsInFlatQuantity: "",
          maxRoomsInFlatQuantity: "",
          minRoomSquare: "",
          maxRoomSquare: "",
        },
      };
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
        state.citiesData = action.payload.data;
      })
      .addCase(fetchCitiesData.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        console.error(action.payload);
      });
  },
});

export const {
  setPrimitiveField,
  setComplexField,
  clearFormData,
  setParamInput,
} = formDataSlicer.actions;

export default formDataSlicer.reducer;
