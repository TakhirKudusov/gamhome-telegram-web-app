import styled from "styled-components";
import React, { memo } from "react";

type Props = {
  placeholder: string;
  onChangeHandler: (e: any) => void;
  value: string;
};

const Input: React.FC<Props> = ({ placeholder, onChangeHandler, value }) => {
  return (
    <StyledInput
      onChange={onChangeHandler}
      placeholder={placeholder}
      value={value}
    />
  );
};

const StyledInput = styled.input`
  background-color: rgb(243, 244, 246);
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 100px;
  border: none;
  width: 100%;
  font-size: 15px;
  outline: none;
  &::placeholder {
    color: rgb(198, 202, 213);
  }
`;

export default memo(Input);
