type Parameter = {
  id: number;
  name: string;
  type?: "input" | "tag";
};

type ParametersData = Parameter[];

type FormattedParametersData = Required<Parameter>[];

export type { ParametersData, FormattedParametersData, Parameter };
