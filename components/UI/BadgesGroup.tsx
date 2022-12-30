import Badge from "./Badge";
import React, { FC, memo } from "react";
import styled from "styled-components";

type Props = {
  text: string;
  onClickHandler: () => void;
};

const BadgesGroup: FC<Props> = ({ text, onClickHandler }) => {
  return (
    <BadgeContainer>
      <Badge text={text} />
      <ClearBadge onClickHandler={onClickHandler} text="Стереть" />
    </BadgeContainer>
  );
};

const ClearBadge = styled(Badge)`
  cursor: pointer;
`;

const BadgeContainer = styled.div`
  display: flex;
  column-gap: 5px;
`;

export default memo(BadgesGroup);
