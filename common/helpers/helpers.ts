import { setPrimitiveField } from "../../redux/slicers/formDataSlicer";
import { AppDispatch } from "../../redux/utils/types";
import {
  setDisabled,
  setEnabled,
} from "../../redux/slicers/disableSelectsSlicer";
import { City, TFormData } from "../../redux/slicers/types";

const handleClearSelect =
  (name: "city" | "metros" | "districts", dispatch: AppDispatch) => () => {
    dispatch(
      setPrimitiveField({
        name,
        value: name === "city" ? { id: null, name: "" } : [],
      })
    );
  };

const getDataElement = (
  data: TFormData["data"],
  el: City,
  key: "districts" | "metroLines",
  index: number
) => {
  if (el.cities[index].id === data.city?.id) {
    return el.cities[index][key];
  }
};

const handleGetData =
  (
    data: TFormData["data"],
    citiesData: TFormData["citiesData"],
    key: "districts" | "metroLines",
    disabledKey: "isDistrictsDisabled" | "isMetrosDisabled",
    dispatch: AppDispatch
  ) =>
  () => {
    if (data.city?.id) {
      const newData = citiesData
        ?.map((el) => {
          for (let i = 0; i < el.cities.length; i++) {
            if (key === "districts") {
              return getDataElement(data, el, key, i);
            } else {
              for (let j = 0; j < el.cities[i][key].length; j++) {
                if (el.cities[i].id === data.city?.id) {
                  return getDataElement(data, el, key, i);
                }
              }
            }
          }
        })
        .filter((el) => el)[0];
      if (newData?.length === 0) {
        queueMicrotask(() => dispatch(setDisabled(disabledKey)));
      } else {
        queueMicrotask(() => dispatch(setEnabled(disabledKey)));
      }
      return newData;
    }
    return null;
  };

export { handleClearSelect, handleGetData };
