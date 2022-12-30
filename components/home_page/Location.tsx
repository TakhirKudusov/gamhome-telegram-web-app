import React, { Dispatch, SetStateAction, useContext } from "react";
import styled from "styled-components";
import { ChevronRight } from "@styled-icons/bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { TFormData } from "../../redux/slicers/types";
import { AppContext } from "../../common/AppContext";
import SectionHeader from "../UI/SectionHeader";
import Badge from "../UI/Badge";
import { setPrimitiveField } from "../../redux/slicers/formDataSlicer";
import BadgesGroup from "../UI/BadgesGroup";

const Location = () => {
  const { data } = useAppSelector<TFormData>((state) => state.formData);

  const dispatch = useAppDispatch();

  const { setIsMapOpen, setIsCityOpen, setIsDistrictOpen, setIsMetroOpen } =
    useContext(AppContext);

  const handleMapOpen =
    (setStateAction: Dispatch<SetStateAction<boolean>> | undefined) => () => {
      if (setStateAction) {
        setStateAction(true);
      }
    };

  const handleClearPolygon = () => {
    dispatch(setPrimitiveField({ name: "polygon", value: null }));
  };

  const handleClearCity = () => {
    dispatch(
      setPrimitiveField({ name: "city", value: { id: null, name: "" } })
    );
  };

  return (
    <>
      <SectionHeader>Расположение</SectionHeader>
      <ButtonsContainer>
        <ChoseBtn onClick={handleMapOpen(setIsMapOpen)}>
          <Text>Нарисовать на карте</Text>
          <ChevronIcon />
        </ChoseBtn>
        {data.polygon && (
          <BadgesGroup
            text={`Количество выделенных областей: ${data.polygon?.features.length}`}
            onClickHandler={handleClearPolygon}
          />
        )}
        <ChoseBtn onClick={handleMapOpen(setIsCityOpen)}>
          <Text>Выбрать город</Text>
          <ChevronIcon />
        </ChoseBtn>
        {data?.city?.id && (
          <BadgesGroup
            text={data?.city?.name}
            onClickHandler={handleClearCity}
          />
        )}
        <ChoseBtn onClick={handleMapOpen(setIsDistrictOpen)}>
          <Text>Выбрать район</Text>
          <ChevronIcon />
        </ChoseBtn>
        <ChoseBtn onClick={handleMapOpen(setIsMetroOpen)}>
          <Text>Выбрать метро</Text>
          <ChevronIcon />
        </ChoseBtn>{" "}
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
  flex-direction: column;
  width: 100%;
  padding: 0 20px 20px;
  row-gap: 10px;
`;

export default Location;
