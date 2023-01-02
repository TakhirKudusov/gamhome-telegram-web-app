import { Dispatch, SetStateAction } from "react";
import { setPrimitiveField } from "../../../redux/slicers/formDataSlicer";
import { AppDispatch } from "../../../redux/utils/types";

const openModal =
  (
    setStateAction: Dispatch<SetStateAction<boolean>> | undefined,
    isDisabled: boolean
  ) =>
  () => {
    if (setStateAction && !isDisabled) {
      setStateAction(true);
    }
  };

const handleClearPolygon = (dispatch: AppDispatch) => () => {
  dispatch(setPrimitiveField({ name: "polygon", value: null }));
};

const handleClearCity = (dispatch: AppDispatch) => () => {
  dispatch(setPrimitiveField({ name: "city", value: { id: null, name: "" } }));
};

const handleClearDistricts = (dispatch: AppDispatch) => () => {
  dispatch(setPrimitiveField({ name: "districts", value: [] }));
};

export { openModal, handleClearPolygon, handleClearDistricts, handleClearCity };
