import { AddParameters } from "../../common/utils/types";

type FieldName =
  | "isAgent"
  | "category"
  | "type"
  | "minPrice"
  | "maxPrice"
  | "city"
  | "author"
  | "minKmMetro"
  | "maxKmMetro"
  | "metros"
  | "districts"
  | "params"
  | "fee"
  | "polygon";

type Params = {
  id: number | null;
  name: string;
};

type FieldAction = {
  payload: {
    name: FieldName;
    value: string | number | boolean | undefined | Params | any[] | null;
    addType?: AddParameters;
  };
  type: string;
};

type Metros = Params & {
  lat: number;
  lng: number;
};

type MetroLines = Params & {
  color: string;
  metros: Metros[];
};

type Cities = Params & {
  metroLines: MetroLines[];
  districts: Params[];
};

type City = Params & {
  cities: Cities[];
};

type ParametersObj = Partial<Record<AddParameters, string | null>>;

type Data = {
  polygon: any;
  isAgent: boolean;
  category: 2 | 3 | 4 | null;
  type: 1 | 2 | null;
  minPrice: string;
  maxPrice: string;
  city: Params;
  metros: Params[];
  districts: Params[];
  author: 2 | 3 | null;
  params: ParametersObj;
  minKmMetro: string;
  maxKmMetro: string;
  fee: boolean;
};

type TFormData = {
  citiesData: City[] | null;
  data: Data;
  isLoading: boolean;
  isError: boolean;
};

type Select =
  | "isMapDisabled"
  | "isCitiesDisabled"
  | "isDistrictsDisabled"
  | "isMetrosDisabled";

type TDisableSelect = Record<Select, boolean>;

export type {
  TFormData,
  FieldAction,
  City,
  FieldName,
  Cities,
  MetroLines,
  Metros,
  TDisableSelect,
  Select,
};
