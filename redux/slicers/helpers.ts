import { FieldAction, TFormData } from "./types";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const handleNumFormat = (
  state: any,
  action: FieldAction,
  maxNum: number,
  maxVar: string,
  isParam?: boolean,
  isDelivery?: boolean
) => {
  const regexp = /^\d*$/;

  const value = (action.payload.value as string)
    .split("")
    .filter((el) => el !== " ");

  if (Number.parseInt(value.join(""), 10) > maxNum) {
    if (isParam) {
      (state.data.params as any)[action.payload.name] = maxVar;
      return;
    }
    (state.data[action.payload.name] as any) = maxVar;
    return;
  }

  if (regexp.test(value.join(""))) {
    const num = isDelivery
      ? value.join("")
      : value.reduce((previousValue, currentValue, currentIndex, array) => {
          if (array.length > 3) {
            currentValue =
              currentIndex === (array.length - 1) % 3 ||
              currentIndex === (array.length - 4) % 6
                ? (currentValue += " ")
                : currentValue;
          }
          return previousValue + currentValue;
        }, "");
    if (isParam) {
      (state.data.params as any)[action.payload.name] = num;
      return;
    }
    (state.data[action.payload.name] as any) = num;
  }
};

const handleSetPrimitiveField = (state: any, action: FieldAction) => {
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
};

const handleSetComplexField = (state: any, action: FieldAction) => {
  let isExist = false;

  for (
    let i = 0;
    i < (state.data[action.payload.name] as Array<any>).length;
    i++
  ) {
    if (
      (action.payload?.value as Params)?.id ===
      state.data[action.payload.name][i].id
    ) {
      isExist = true;
      break;
    }
  }

  if (isExist) {
    (state.data[action.payload.name] as Array<any>) = (
      state.data[action.payload.name] as Array<any>
    ).filter((el) => el.id !== (action.payload?.value as Params)?.id);
  } else {
    (state.data[action.payload.name] as Array<any>).push(action.payload.value);
  }
};

const handleSetParamInput = (state: any, action: FieldAction) => {
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
};

const handleClearData = (state: any) => {
  state.data = {
    city: {
      name: "",
      id: null,
    },
    metros: [],
    districts: [],
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
};

const handleErrorFetch = (state: any, action: FieldAction) => {
  state.isError = true;
  state.isLoading = false;
  console.error(action.payload);
};

const handlePendingFetch = (state: any) => {
  state.isError = false;
  state.isLoading = true;
};

export {
  handleNumFormat,
  handleSetPrimitiveField,
  handleSetComplexField,
  handleSetParamInput,
  handleClearData,
  handleErrorFetch,
  handlePendingFetch,
};
