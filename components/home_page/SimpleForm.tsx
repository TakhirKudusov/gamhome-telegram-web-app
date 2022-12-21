import React, { SyntheticEvent } from "react";
import { CostContainer, Input, SectionHeader } from "../UI";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setPrimitiveField } from "../../redux/slicers/formDataSlicer";
import { FieldName, TFormData } from "../../redux/slicers/types";

type Props = {
  header: string;
  minType: FieldName;
  maxType: FieldName;
};

const SimpleForm: React.FC<Props> = ({ header, minType, maxType }) => {
  const { data } = useAppSelector<TFormData>((state) => state.formData);

  const dispatch = useAppDispatch();

  const handleMinChange = (e: any) => {
    dispatch(setPrimitiveField({ name: minType, value: e.target.value }));
  };

  const handleMaxChange = (e: any) => {
    dispatch(setPrimitiveField({ name: maxType, value: e.target.value }));
  };

  return (
    <>
      <SectionHeader>{header}</SectionHeader>
      <CostContainer>
        <Input
          value={data[minType] as any}
          onChangeHandler={handleMinChange}
          placeholder="от"
        />
        —
        <Input
          value={data[maxType] as any}
          onChangeHandler={handleMaxChange}
          placeholder="до"
        />
      </CostContainer>
    </>
  );
};

export default SimpleForm;
