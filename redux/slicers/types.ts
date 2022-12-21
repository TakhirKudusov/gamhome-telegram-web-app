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
  | "parameters";

type FieldAction = {
  payload: {
    name: FieldName;
    value: number | boolean | undefined;
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
  isAgent?: boolean;
  category?: 2 | 3 | 4;
  type?: 1 | 2;
  minPrice?: number;
  maxPrice?: number;
  city?: number;
  metros?: number[];
  districts?: number[];
  author?: 2 | 3;
  parameters?: number[];
  minKmMetro?: number;
  maxKmMetro?: number;
};

type TFormData = {
  citiesData: City[] | null;
  data: Data;
  isLoading: boolean;
  isError: boolean;
};

export type { TFormData, FieldAction, City };
