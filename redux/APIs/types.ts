type Param =
  | "FloorsInHouse"
  | "KitchenSquare"
  | "Square"
  | "RoomsQuantity"
  | "Floor"
  | "LivingSquare"
  | "RoomSquare"
  | "RoomsInFlatQuantity"
  | "HouseSquare"
  | "LandSquare"
  | "DeliveryTime";

type Parameter = {
  id: number;
  name: string;
  type?: "input" | "tag";
  paramType?: Param;
};

type ParametersData = Parameter[];

type FormattedParametersData = Required<Parameter>[];

export type { ParametersData, FormattedParametersData, Parameter };
