import { ReactNode, RefObject } from "react";
import { FieldName } from "../redux/slicers/types";
import { AppDispatch } from "../redux/types";

type Ref = {
  value: number | boolean;
  ref: RefObject<any>;
  children: string;
};

type Params = {
  id: number;
};

type ChildrenProp = {
  children: ReactNode;
};

type userData = {
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

type Refs = {
  refs: Ref[];
  type: FieldName;
};

type HandleChangeActiveClick = (
  ref: Ref,
  obj: Refs,
  dispatch: AppDispatch
) => () => void;

export type { ChildrenProp, HandleChangeActiveClick, Refs, userData };
