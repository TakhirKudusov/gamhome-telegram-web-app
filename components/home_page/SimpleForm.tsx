import React, { SyntheticEvent } from "react";
import { CostContainer, Input, SectionHeader } from "../UI";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setPrimitiveField } from "../../redux/slicers/formDataSlicer";
import { FieldName, TFormData } from "../../redux/slicers/types";
import styled from "styled-components";

type Props = {
  header: string;
  minType: FieldName;
  maxType: FieldName;
  className?: string;
};

const SimpleForm: React.FC<Props> = ({
  header,
  minType,
  maxType,
  className,
}) => {
  const { data } = useAppSelector<TFormData>((state) => state.formData);

  const dispatch = useAppDispatch();

  const handleMinChange = (e: any) => {
    dispatch(setPrimitiveField({ name: minType, value: e.target.value }));
  };

  const handleMaxChange = (e: any) => {
    dispatch(setPrimitiveField({ name: maxType, value: e.target.value }));
  };

  return (
    <Wrapper className={className}>
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default SimpleForm;
