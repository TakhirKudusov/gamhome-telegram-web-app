import React from "react";
import { ChildrenProp } from "../../../common/utils/types";
import styled from "styled-components";

const HeaderContainer: React.FC<ChildrenProp> = ({ children }) => {
  return <StyledHeaderContainer>{children}</StyledHeaderContainer>;
};

const StyledHeaderContainer = styled.div`
  padding: 20px;
  color: rgb(37, 37, 37);
  font-size: 22px;
  font-weight: bold;
  line-height: 30px;
`;

export default HeaderContainer;
