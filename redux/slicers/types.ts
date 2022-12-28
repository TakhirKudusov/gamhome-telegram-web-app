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
  | "parameters"
  | "fee"
  | "polygon";

type FieldAction = {
  payload: {
    name: FieldName;
    value: string | number | boolean | undefined | null | any[];
  };
  type: string;
};

type Params = {
  id: number;
  name: string;
};

type City = Params & {
  cities: (Params & {
    metroLines: (Params & {
      color: string;
      metros: (Params & {
        lat: number;
        lng: number;
      })[];
    })[];
  })[];
};

type Data = {
  polygon?: any;
  isAgent?: boolean;
  category?: 2 | 3 | 4 | null;
  type?: 1 | 2 | null;
  minPrice?: string;
  maxPrice?: string;
  city?: number;
  metros?: number[];
  districts?: number[];
  author?: 2 | 3 | null;
  parameters?: number[];
  minKmMetro?: string;
  maxKmMetro?: string;
  fee?: boolean;
};

type TFormData = {
  citiesData: City[] | null;
  data: Data;
  isLoading: boolean;
  isError: boolean;
};

export type { TFormData, FieldAction, City, FieldName };
