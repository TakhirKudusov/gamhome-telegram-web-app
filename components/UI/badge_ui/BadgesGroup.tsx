import Badge from "./Badge";
import React, { FC, memo } from "react";
import styled from "styled-components";

type Props = {
  text: string;
  onClickHandler: () => void;
  quantity?: number;
};

const BadgesGroup: FC<Props> = ({ text, onClickHandler, quantity = 1 }) => {
  return (
    <BadgeContainer>
      <Badge text={text} />
      {quantity > 1 && <Badge text={`+ ${quantity - 1} ...`} />}
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
