import {
  Author,
  CategoryType,
  HouseMaterialType,
  Repair,
  Type,
  WallMaterial,
} from "./enums";

const houseTypeValues = [
  {
    value: HouseMaterialType.PANEL,
    children: HouseMaterialType.PANEL,
  },
  {
    value: HouseMaterialType.BRICK,
    children: HouseMaterialType.BRICK,
  },
  {
    value: HouseMaterialType.MONOLITHIC,
    children: HouseMaterialType.MONOLITHIC,
  },
  {
    value: HouseMaterialType.WOODEN,
    children: HouseMaterialType.WOODEN,
  },
  {
    value: HouseMaterialType.BLOCK,
    children: HouseMaterialType.BLOCK,
  },
];

const categoryValues = [
  {
    value: 3,
    children: CategoryType.ROOM,
  },
  {
    value: 2,
    children: CategoryType.FLAT,
  },
  {
    value: 4,
    children: CategoryType.HOUSE,
  },
];

const typeValues = [
  {
    value: 2,
    children: Type.RENT,
  },
  {
    value: 1,
    children: Type.BUY,
  },
];

const authorValues = [
  {
    value: 2,
    children: Author.AGENT,
  },
  {
    value: 3,
    children: Author.OWNER,
  },
];

const repairValues = [
  {
    value: Repair.NEEDING,
    children: Repair.NEEDING,
  },
  {
    value: Repair.COSMETIC,
    children: Repair.COSMETIC,
  },
  {
    value: Repair.DESIGN,
    children: Repair.DESIGN,
  },
  {
    value: Repair.EURO,
    children: Repair.EURO,
  },
];

const wallMaterialValues = [
  {
    value: WallMaterial.BRICK,
    children: WallMaterial.BRICK,
  },
  {
    value: WallMaterial.LOG,
    children: WallMaterial.LOG,
  },
  {
    value: WallMaterial.GAS_BLOCK,
    children: WallMaterial.GAS_BLOCK,
  },
  {
    value: WallMaterial.BAR,
    children: WallMaterial.BAR,
  },
  {
    value: WallMaterial.FOAM_BLOCK,
    children: WallMaterial.FOAM_BLOCK,
  },
  {
    value: WallMaterial.PANEL,
    children: WallMaterial.PANEL,
  },
  {
    value: WallMaterial.SANDWICH,
    children: WallMaterial.SANDWICH,
  },
  {
    value: WallMaterial.EXPERIMENTAL,
    children: WallMaterial.EXPERIMENTAL,
  },
  {
    value: WallMaterial.METAL,
    children: WallMaterial.METAL,
  },
];

export {
  houseTypeValues,
  categoryValues,
  typeValues,
  authorValues,
  repairValues,
  wallMaterialValues,
};
