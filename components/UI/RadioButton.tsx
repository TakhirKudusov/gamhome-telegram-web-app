import React, { useState } from "react";
import styled from "styled-components";
import { FieldName } from "../../redux/slicers/types";
import { setPrimitiveField } from "../../redux/slicers/formDataSlicer";
import { useAppDispatch } from "../../redux/hooks";
import { HeaderContainer, SectionHeader } from "./index";

type Props = {
  label: string;
  header: string;
  fieldType: FieldName;
};

const RadioButton: React.FC<Props> = ({ label, header, fieldType }) => {
  const [activeCheckbox, setActiveCheckbox] = useState<boolean>(
    fieldType === "fee"
  );

  const dispatch = useAppDispatch();

  const handleSetActiveClick = () => {
    dispatch(setPrimitiveField({ name: fieldType, value: !activeCheckbox }));
    setActiveCheckbox((prev) => !prev);
  };

  return (
    <>
      <SectionHeader>{header}</SectionHeader>
      <CheckboxContainer>
        <StyledRadioButton
          isActive={activeCheckbox}
          onClick={handleSetActiveClick}
        />
        <StyledLabel>{label}</StyledLabel>
      </CheckboxContainer>
    </>
  );
};

const StyledLabel = styled.div`
  font-size: 15px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  padding: 0 20px 20px;
  gap: 5px;
`;

const StyledRadioButton = styled.div<{ isActive: boolean }>`
  width: 18px;
  height: 18px;
  margin: 0;
  border-radius: 5px;
  border: ${({ isActive }) =>
      isActive ? "5px #526eff" : "1px rgb(215, 219, 227)"}
    solid;
  cursor: pointer;
`;

export default RadioButton;
