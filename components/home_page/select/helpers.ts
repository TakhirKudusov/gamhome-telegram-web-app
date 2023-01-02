import { Dispatch, SetStateAction } from "react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import {
  Cities,
  City,
  FieldName,
  MetroLines,
  Metros,
} from "../../../redux/slicers/types";
import {
  setComplexField,
  setPrimitiveField,
} from "../../../redux/slicers/formDataSlicer";
import { AppDispatch } from "../../../redux/utils/types";

const setActive = (
  setActive: Dispatch<SetStateAction<boolean>>,
  districts: Params[],
  data: City | MetroLines | Params | undefined
) => {
  setActive(false);
  for (let i = 0; i < districts.length; i++) {
    if (districts[i].id === data?.id) {
      setActive(true);
      break;
    }
  }
};

const handleClickClose =
  (setIsOpen: Dispatch<SetStateAction<boolean>> | undefined) => () => {
    if (setIsOpen) setIsOpen(false);
  };

const handleValueChange =
  (
    setFiltering: Dispatch<SetStateAction<boolean>>,
    setInputValue: Dispatch<SetStateAction<string>>
  ) =>
  (e: any) => {
    setFiltering(true);
    setInputValue(e.target.value);
  };

const handleFilterData =
  (
    data: City[] | MetroLines[] | Params[] | null,
    filtering: boolean,
    inputValue: string,
    type: "cities" | "districts" | "metros",
    setFiltering: Dispatch<SetStateAction<boolean>>
  ) =>
  () => {
    if (data) {
      if (filtering && inputValue !== "") {
        const filteredArr = data
          .map((el) => {
            if (el.name.toLowerCase().includes(inputValue.toLowerCase())) {
              return el;
            }
            if (type !== "districts") {
              const filteredChildren = (el as any)[type].filter((el: any) =>
                el.name.toLowerCase().includes(inputValue.toLowerCase())
              );
              if (filteredChildren.length !== 0) {
                return {
                  name: el.name,
                  id: el.id,
                  [type]: filteredChildren,
                };
              }
            }
          })
          .filter((el) => el);
        setFiltering(false);
        return filteredArr;
      }
      setFiltering(false);
      return data;
    }
    return null;
  };

const handleSetComplexField = (
  dispatch: AppDispatch,
  type: "cities" | "districts" | "metros",
  data: Cities | Metros | Params | undefined
) => {
  dispatch(
    setComplexField({
      name: type as FieldName,
      value: { id: data?.id, name: data?.name },
    })
  );
};

const handleSetDataPoint =
  (
    dispatch: AppDispatch,
    type: "cities" | "districts" | "metros",
    data: Cities | Metros | Params | undefined,
    isMetroChild?: boolean
  ) =>
  () => {
    if (type === "cities") {
      dispatch(
        setPrimitiveField({
          name: "city",
          value: { id: data?.id, name: data?.name },
        })
      );
    }
    if (type === "districts") {
      handleSetComplexField(dispatch, type, data);
    }
    if (type === "metros" && isMetroChild) {
      handleSetComplexField(dispatch, type, data);
    }
  };

export {
  setActive,
  handleClickClose,
  handleValueChange,
  handleFilterData,
  handleSetDataPoint,
};
