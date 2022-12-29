import { FieldAction, TFormData } from "./types";
import { WritableDraft } from "immer/src/types/types-external";

const handleNumFormat = (
  state: WritableDraft<TFormData>,
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

export { handleNumFormat };
