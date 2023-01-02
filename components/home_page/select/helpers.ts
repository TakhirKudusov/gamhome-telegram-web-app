import { Dispatch, SetStateAction } from "react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { City, FieldName, MetroLines } from "../../../redux/slicers/types";
import { setComplexField } from "../../../redux/slicers/formDataSlicer";
import { AppDispatch } from "../../../redux/utils/types";

const setActiveDistrict = (
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

const handleCheckClick =
  (
    type: "cities" | "districts" | "metros",
    dispatch: AppDispatch,
    data: City | MetroLines | Params | undefined
  ) =>
  () => {
    if (type === "districts") {
      dispatch(
        setComplexField({
          name: type as FieldName,
          value: { id: data?.id, name: data?.name },
        })
      );
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

export {
  setActiveDistrict,
  handleCheckClick,
  handleClickClose,
  handleValueChange,
  handleFilterData,
};
