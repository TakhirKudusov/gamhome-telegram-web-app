import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/utils/hooks";
import { FieldName, TFormData } from "../../../redux/slicers/types";
import styled from "styled-components";
import { AddParameters } from "../../../common/utils/types";
import SectionHeader from "../../UI/section_header_ui/SectionHeader";
import CostContainer from "../../UI/container_ui/CostContainer";
import Input from "../../UI/input_ui/Input";
import { getInputValue, handleChangeValue } from "./helpers";

type Props = {
  header: string;
  minType: FieldName | AddParameters;
  maxType: FieldName | AddParameters;
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

  return (
    <Wrapper className={className}>
      <SectionHeader>{header}</SectionHeader>
      <CostContainer>
        <Input
          value={getInputValue("min", isParam, data, minType, maxType)}
          onChangeHandler={handleChangeValue(
            "min",
            isParam,
            minType as FieldName,
            maxType as FieldName,
            dispatch
          )}
          placeholder="от"
        />
        —
        <Input
          value={getInputValue("max", isParam, data, minType, maxType)}
          onChangeHandler={handleChangeValue(
            "max",
            isParam,
            minType as FieldName,
            maxType as FieldName,
            dispatch
          )}
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
