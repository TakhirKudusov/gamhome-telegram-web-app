import { FormattedParametersData, Parameter, ParametersData } from "./types";

const getFormattedParams = (
  params: ParametersData
): FormattedParametersData => {
  return params.reduce((previousValue: any[], currentValue) => {
    if (
      currentValue.id === 1 ||
      currentValue.id === 8 ||
      currentValue.id === 14 ||
      currentValue.id === 18
    ) {
      currentValue.type = "tag";
      previousValue.push(currentValue);
      return previousValue;
    }
    currentValue.type = "input";
    previousValue.push(currentValue);
    return previousValue;
  }, []);
};

export { getFormattedParams };
