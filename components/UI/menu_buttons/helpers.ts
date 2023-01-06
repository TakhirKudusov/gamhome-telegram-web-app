import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { TFormData } from "../../../redux/slicers/types";
import { Parameter, PostData } from "./types";
import { parametersKeys } from "../../../common/utils/constants";
import { AddParameters } from "../../../common/utils/types";

const formatComplexData = (arr: Params[]) => {
  return arr.reduce(
    (
      previousValue: {
        id: number;
      }[],
      currentValue
    ) => {
      previousValue.push({
        id: Number.parseInt(currentValue.id),
      });
      return previousValue;
    },
    []
  );
};

const reduceSpaces = (data: string) => {
  return Number.parseInt(data.replaceAll(" ", ""));
};

const formatParameters = (
  params: TFormData["data"]["params"],
  category: number | null
): Parameter[] => {
  const paramsArr: Parameter[] = [];
  let isHouseTypeExist = false;
  for (let i = 0; i < parametersKeys.length; i++) {
    if (
      (parametersKeys[i].name === "repair" ||
        parametersKeys[i].name === "houseType" ||
        parametersKeys[i].name === "wallMaterial") &&
      !!params[parametersKeys[i].name as AddParameters]
    ) {
      let tagParam: Parameter;
      switch (parametersKeys[i].name) {
        case "houseType":
          tagParam = {
            parameterId: category === 2 ? 8 : 14,
            value: params[parametersKeys[i].name as AddParameters] as any,
            minValue: "",
          };
          !isHouseTypeExist && paramsArr.push(tagParam);
          isHouseTypeExist = true;
          break;
        default:
          tagParam = {
            parameterId: parametersKeys[i].id,
            value: params[parametersKeys[i].name as AddParameters] as any,
            minValue: "",
          };
          paramsArr.push(tagParam);
      }
      continue;
    }

    const value = params[`max${parametersKeys[i].name}` as AddParameters];
    const minValue = params[`min${parametersKeys[i].name}` as AddParameters];

    if ((!!value || !!minValue) && category === parametersKeys[i].categoryId) {
      const inputParam: Parameter = {
        parameterId: parametersKeys[i].id,
        value: reduceSpaces(value as string) as any,
        minValue: reduceSpaces(minValue as string) as any,
      };
      paramsArr.push(inputParam);
    }
  }

  return paramsArr;
};

const handlePushClick = (data: TFormData["data"]) => () => {
  const newData: PostData = {
    isAgent: data.isAgent,
    category: {
      id: data.category,
    },
    type: {
      id: data.type,
    },
    minPrice: reduceSpaces(data.minPrice),
    maxPrice: reduceSpaces(data.maxPrice),
    city: {
      id: data.city.id,
    },
    metros: formatComplexData(data.metros),
    districts: formatComplexData(data.districts),
    author: {
      id: data.author,
    },
    minKmMetro: reduceSpaces(data.minKmMetro),
    maxKmMetro: reduceSpaces(data.maxKmMetro),
    fee: data.fee,
    parameters: formatParameters(data.params, data.category),
    polygons: data.polygon ?? "",
  };
  if (typeof window?.Telegram !== "undefined") {
    try {
      window?.Telegram.WebApp.sendData(JSON.stringify(newData));
    } catch (error) {
      console.error(error);
    }
  }
};

export { handlePushClick };
