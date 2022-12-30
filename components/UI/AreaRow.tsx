import styled from "styled-components";
import React, { memo } from "react";
import { ChildrenProp } from "../../common/types";

type Props = {
  onClickHandler?: () => void;
  className?: string;
};

const AreaRow: React.FC<Props & ChildrenProp> = ({
  className,
  children,
  onClickHandler,
}) => {
  return (
    <StyledAreaRow onClick={onClickHandler} className={className}>
      {children}
    </StyledAreaRow>
  );
};

const StyledAreaRow = styled.div`
  display: flex;
  height: 24px;
  background-color: rgb(243, 244, 246);
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  &:hover {
    background-color: rgb(233, 233, 237);
  }
`;

export default memo(AreaRow);
