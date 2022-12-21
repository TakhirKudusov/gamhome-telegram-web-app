import styled from "styled-components";
import React from "react";

type Props = {
  placeholder: string;
  type: string;
};

const Input: React.FC<Props> = ({ placeholder, type }) => {
  return <StyledInput placeholder={placeholder} type={type} />;
};

const StyledInput = styled.input`
  background-color: rgb(243, 244, 246);
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 100px;
  border: none;
  max-width: 170px;
  font-size: 15px;
  outline: none;
  &::placeholder {
    color: rgb(198, 202, 213);
  }
`;

export default Input;
