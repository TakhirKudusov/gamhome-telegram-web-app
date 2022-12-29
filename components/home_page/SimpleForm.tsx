import React, { SyntheticEvent } from "react";
import { CostContainer, Input, SectionHeader } from "../UI";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setParamInput,
  setPrimitiveField,
} from "../../redux/slicers/formDataSlicer";
import { FieldName, TFormData } from "../../redux/slicers/types";
import styled from "styled-components";
import { AddParameters } from "../../common/types";

type Props = {
  header: string;
  minType: FieldName | string;
  maxType: FieldName | string;
  className?: string;
  isParam?: boolean;
};

const SimpleForm: React.FC<Props> = ({
  header,
  minType,
  maxType,
  className,
  isParam,
}) => {
  const { data } = useAppSelector<TFormData>((state) => state.formData);

  const dispatch = useAppDispatch();

  const handleChangeValue = (type: "min" | "max") => (e: any) => {
    if (type === "min") {
      if (isParam) {
        dispatch(
          setParamInput({ name: minType as FieldName, value: e.target.value })
        );
        return;
      }
      dispatch(
        setPrimitiveField({ name: minType as FieldName, value: e.target.value })
      );
    } else {
      if (isParam) {
        dispatch(
          setParamInput({ name: maxType as FieldName, value: e.target.value })
        );
        return;
      }
      dispatch(
        setPrimitiveField({ name: maxType as FieldName, value: e.target.value })
      );
    }
  };

  const getInputValue = (type: "min" | "max") => {
    if (type === "min") {
      if (isParam) return data.params[minType as AddParameters];
      return data[minType as FieldName];
    } else {
      if (isParam) return data.params[maxType as AddParameters];
      return data[maxType as FieldName];
    }
  };

  return (
    <Wrapper className={className}>
      <SectionHeader>{header}</SectionHeader>
      <CostContainer>
        <Input
          value={getInputValue("min")}
          onChangeHandler={handleChangeValue("min")}
          placeholder="от"
        />
        —
        <Input
          value={getInputValue("max")}
          onChangeHandler={handleChangeValue("max")}
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
