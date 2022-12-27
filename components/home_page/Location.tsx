import { SectionHeader } from "../UI";
import React, { useState } from "react";
import styled from "styled-components";
import { ChevronRight } from "@styled-icons/bootstrap";
import { useRouter } from "next/router";

const Location = () => {
  const router = useRouter();

  const handleMapOpen = () => {
    router.push("map_page");
  };

  return (
    <>
      <SectionHeader>Расположение</SectionHeader>
      <ButtonsContainer>
        <ChoseBtn onClick={handleMapOpen}>
          <Text>Нарисовать на карте</Text>
          <ChevronIcon />
        </ChoseBtn>
      </ButtonsContainer>
    </>
  );
};

const Text = styled.div`
  color: #676a71;
  font-size: 14px;
`;

const ChevronIcon = styled(ChevronRight)`
  width: 16px;
  color: #676a71;
`;

const ChoseBtn = styled.div`
  display: flex;
  width: 100%;
  background-color: #f1f2f4;
  height: 44px;
  border-radius: 100px;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 25px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0 20px 20px;
`;

export default Location;
