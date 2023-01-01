import { createRef } from "react";
import { Refs } from "../utils/types";
import { ParamType, RefType } from "../utils/enums";

const useGetRefs = (
  arr: Refs["refs"],
  type: RefType,
  paramType?: ParamType
): Refs => {
  const refs = arr.reduce((previousValue: Refs["refs"], currentValue) => {
    if (currentValue) {
      currentValue.ref = createRef();
      previousValue.push(currentValue);
    }
    return previousValue;
  }, []);

  return {
    refs,
    type,
    paramType,
  };
};

export { useGetRefs };
