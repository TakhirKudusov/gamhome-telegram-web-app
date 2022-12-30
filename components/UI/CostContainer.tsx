import React from "react";
import { ChildrenProp } from "../../common/types";
import styled from "styled-components";

const CostContainer: React.FC<ChildrenProp> = ({ children }) => {
  return <StyledCostContainer>{children}</StyledCostContainer>;
};

const StyledCostContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 20px 20px;
  align-items: center;
  gap: 7px;
`;

export default CostContainer;
