import { FC } from "react";
import { ChildrenProp } from "../../common/types";
import styled from "styled-components";

const CheckBox: FC<ChildrenProp> = ({ children }) => {
  return <StyledCheckBox>{children}</StyledCheckBox>;
};

const StyledCheckBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 14px;
  width: 14px;
  background-color: white;
  border-radius: 3px;
`;

export default CheckBox;
