type Params = {
  id: number;
};

export type userData = {
  author: number;
  category: number | Params;
  fee: boolean;
  isAgent: boolean;
  kmMetro: [number, number];
  location: string[];
  maxPrice: number;
  minPrice: number;
  type: number | Params;
  city?: Params;
  metros?: Params;
  districts?: Params;
};
