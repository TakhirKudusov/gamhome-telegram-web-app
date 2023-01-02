type Parameter = {
  parameterId: number;
  value: string;
  minValue: string;
};

type PostData = {
  isAgent: boolean;
  category: {
    id: number | null;
  };
  type: {
    id: number | null;
  };
  minPrice: number;
  maxPrice: number;
  city: {
    id: number | null;
  };
  metros: {
    id: number;
  }[];
  districts: {
    id: number;
  }[];
  author: {
    id: number | null;
  };
  parameters: Parameter[];
  minKmMetro: number;
  maxKmMetro: number;
  fee: boolean;
};

export type { PostData, Parameter };
