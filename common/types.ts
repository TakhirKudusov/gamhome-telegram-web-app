import { ReactNode, RefObject } from "react";
import { FieldName } from "../redux/slicers/types";
import { AppDispatch } from "../redux/types";

type Ref = {
  value: number | boolean;
  ref: RefObject<any>;
  children: string;
};

type ChildrenProp = {
  children: ReactNode;
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

export type { ChildrenProp, HandleChangeActiveClick, Refs };
