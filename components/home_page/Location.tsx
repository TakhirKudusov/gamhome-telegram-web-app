import { SectionHeader } from "../UI";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ChevronRight } from "@styled-icons/bootstrap";
import { useRouter } from "next/router";
import { useAppSelector } from "../../redux/hooks";
import { TFormData } from "../../redux/slicers/types";
import { AppContext } from "../../common/AppContext";

const Location = () => {
  const { data } = useAppSelector<TFormData>((state) => state.formData);

  const { isMapOpen, setIsMapOpen } = useContext(AppContext);

  const router = useRouter();

  const handleMapOpen = () => {
    setIsMapOpen!(true);
  };

  return (
    <>
      <SectionHeader>Расположение</SectionHeader>
      <ButtonsContainer>
        <ChoseBtn onClick={handleMapOpen}>
          <Text>Нарисовать на карте</Text>
          <ChevronIcon />
        </ChoseBtn>
        {data.polygon && (
          <Badge>
            Количество выделенных областей: {data.polygon?.features.length}
          </Badge>
        )}
        <ChoseBtn>
          <Text>Выбрать город</Text>
          <ChevronIcon />
        </ChoseBtn>
        <ChoseBtn>
          <Text>Выбрать район</Text>
          <ChevronIcon />
        </ChoseBtn>
        <ChoseBtn>
          <Text>Выбрать метро</Text>
          <ChevronIcon />
        </ChoseBtn>{" "}
      </ButtonsContainer>
    </>
  );
};

const Badge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d5d9e1;
  border-radius: 3px;
  height: 28px;
  font-size: 14px;
  color: #676a71;
  width: fit-content;
  padding: 0 10px;
  cursor: default;
`;

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
  flex-direction: column;
  width: 100%;
  padding: 0 20px 20px;
  row-gap: 10px;
`;

export default Location;
