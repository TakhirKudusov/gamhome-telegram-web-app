import React, { RefObject } from "react";
import { ChildrenProp, HandleChangeActiveClick } from "../../common/types";
import styled from "styled-components";

type Props = {
  onClickHandler: ReturnType<HandleChangeActiveClick>;
};

const Tag = React.forwardRef(
  ({ children, onClickHandler }: ChildrenProp & Props, ref) => {
    return (
      <StyledTag
        ref={ref as RefObject<HTMLDivElement>}
        onClick={onClickHandler}
      >
        {children}
      </StyledTag>
    );
  }
);

const StyledTag = styled.div`
  display: flex;
  padding: 10px 20px;
  border: 1px rgb(215, 219, 227) solid;
  border-radius: 20px;
  font-size: 14px;
  line-height: 18px;
  color: rgb(37, 37, 37);
  cursor: pointer;
  transition: 0.1s linear;

  &:hover {
    background-color: rgba(104, 110, 253, 0.15);
  }

  &:active {
    background-color: rgba(104, 110, 253, 0.25);
  }
  &.active {
    background-color: rgb(104, 110, 253);
    color: white;
  }
`;

export default Tag;
