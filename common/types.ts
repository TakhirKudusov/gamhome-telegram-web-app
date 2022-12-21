import { ReactNode, RefObject } from "react";

type Ref = {
  ref: RefObject<any>;
  children: string;
};

type ChildrenProp = {
  children: ReactNode;
};

type HandleChangeActiveClick = (
  ref: RefObject<unknown>,
  arr: Ref[]
) => () => void;

export type { ChildrenProp, HandleChangeActiveClick, Ref };
