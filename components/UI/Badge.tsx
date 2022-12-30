import styled from "styled-components";
import { FC, memo } from "react";

type Props = {
  text: string;
  className?: string;
  onClickHandler?: () => void;
};

const Badge: FC<Props> = ({ text, className, onClickHandler }) => {
  return (
    <StyledBadge onClick={onClickHandler} className={className}>
      {text}
    </StyledBadge>
  );
};

const StyledBadge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d5d9e1;
  border-radius: 3px;
  height: fit-content;
  font-size: 14px;
  color: #676a71;
  width: fit-content;
  padding: 5px 10px;
  cursor: default;
`;

export default memo(Badge);
