import React from "react";
import { CostContainer, Input, SectionHeader } from "../UI";

const Cost: React.FC = () => {
  return (
    <>
      <SectionHeader>Стоимость, ₽</SectionHeader>
      <CostContainer>
        <Input placeholder="от" type="number" />—
        <Input placeholder="до" type="number" />
      </CostContainer>
    </>
  );
};

export default Cost;
