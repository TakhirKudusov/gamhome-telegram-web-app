import React from "react";
import styled from "styled-components";

const Divider: React.FC = () => {
  return <StyledDivider />;
};

const StyledDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgb(215, 219, 227);
`;

export default Divider;
