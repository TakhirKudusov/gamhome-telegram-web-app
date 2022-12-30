import styled from "styled-components";
import React, { memo } from "react";
import { ChildrenProp } from "../../common/types";

type Props = {
  isOpen: boolean | undefined;
  className?: string;
};

const ModalWrapper: React.FC<ChildrenProp & Props> = ({
  children,
  isOpen,
  className,
}) => {
  return (
    <Wrapper className={className} isOpen={isOpen}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isOpen: boolean | undefined }>`
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: white;
`;

export default memo(ModalWrapper);
