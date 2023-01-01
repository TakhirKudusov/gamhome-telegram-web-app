export enum HouseMaterialType {
  PANEL = "Панельный",
  BRICK = "Кирпичный",
  MONOLITHIC = "Монолитный",
  WOODEN = "Деревянный",
  BLOCK = "Блочный",
}

export enum CategoryType {
  ROOM = "Комната",
  FLAT = "Квартира",
  HOUSE = "Дом",
}

export enum Type {
  RENT = "Снять",
  BUY = "Купить",
}

export enum Author {
  AGENT = "Агент",
  OWNER = "Собственник",
}

export enum Repair {
  NEEDING = "Требуется",
  COSMETIC = "Косметический",
  DESIGN = "Дизайнерский",
  EURO = "Евро",
}

export enum RefType {
  PARAMS = "params",
  CATEGORY = "category",
  TYPE = "type",
  AUTHOR = "author",
}

export enum WallMaterial {
  BRICK = "Кирпич",
  LOG = "Бревно",
  GAS_BLOCK = "Газоблоки",
  BAR = "Брус",
  FOAM_BLOCK = "Пеноблоки",
  PANEL = "Ж/б панели",
  SANDWICH = "Сэндвич-панели",
  EXPERIMENTAL = "Экспериментальные материалы",
  METAL = "Металл",
}

export enum ParamType {
  HOUSE_TYPE = "houseType",
  REPAIR = "repair",
  WALL_MATERIAL = "wallMaterial",
}
