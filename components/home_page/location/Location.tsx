import React, { Dispatch, SetStateAction, useContext } from "react";
import styled from "styled-components";
import { ChevronRight } from "@styled-icons/bootstrap";
import { useAppDispatch, useAppSelector } from "../../../redux/utils/hooks";
import { TDisableSelect, TFormData } from "../../../redux/slicers/types";
import { AppContext } from "../../../common/context/AppContext";
import SectionHeader from "../../UI/section_header_ui/SectionHeader";
import Badge from "../../UI/badge_ui/Badge";
import { setPrimitiveField } from "../../../redux/slicers/formDataSlicer";
import BadgesGroup from "../../UI/badge_ui/BadgesGroup";
import {
  handleClearCity,
  handleClearComplexField,
  handleClearPolygon,
  openModal,
} from "./helpers";

const Location = () => {
  const { data } = useAppSelector<TFormData>((state) => state.formData);

  const {
    isMapDisabled,
    isCitiesDisabled,
    isDistrictsDisabled,
    isMetrosDisabled,
  } = useAppSelector<TDisableSelect>((state) => state.disableSelects);

  const dispatch = useAppDispatch();

  const { setIsMapOpen, setIsCityOpen, setIsDistrictOpen, setIsMetroOpen } =
    useContext(AppContext);

  return (
    <>
      <SectionHeader>Расположение</SectionHeader>
      <ButtonsContainer>
        <ChoseBtn
          disabled={isMapDisabled}
          onClick={openModal(setIsMapOpen, isMapDisabled)}
        >
          <Text>Нарисовать на карте</Text>
          <ChevronIcon />
        </ChoseBtn>
        {data.polygon && (
          <BadgesGroup
            text={`Количество выделенных областей: ${data.polygon?.features.length}`}
            onClickHandler={handleClearPolygon(dispatch)}
          />
        )}
        <ChoseBtn
          disabled={isCitiesDisabled}
          onClick={openModal(setIsCityOpen, isCitiesDisabled)}
        >
          <Text>Выбрать город</Text>
          <ChevronIcon />
        </ChoseBtn>
        {data?.city?.id && (
          <BadgesGroup
            text={data?.city?.name}
            onClickHandler={handleClearCity(dispatch)}
          />
        )}
        <ChoseBtn
          disabled={!data?.city?.id || isDistrictsDisabled}
          onClick={openModal(
            setIsDistrictOpen,
            !data?.city?.id || isDistrictsDisabled
          )}
        >
          <Text>Выбрать район</Text>
          <ChevronIcon />
        </ChoseBtn>
        {data?.districts.length !== 0 && (
          <BadgesGroup
            text={data?.districts[0]?.name}
            quantity={data?.districts.length}
            onClickHandler={handleClearComplexField(dispatch, "districts")}
          />
        )}
        <ChoseBtn
          disabled={!data?.city?.id || isMetrosDisabled}
          onClick={openModal(
            setIsMetroOpen,
            !data?.city?.id || isMetrosDisabled
          )}
        >
          <Text>Выбрать метро</Text>
          <ChevronIcon />
        </ChoseBtn>
        {data?.metros.length !== 0 && (
          <BadgesGroup
            text={data?.metros[0]?.name}
            quantity={data?.metros.length}
            onClickHandler={handleClearComplexField(dispatch, "metros")}
          />
        )}
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

const ChoseBtn = styled.div<{ disabled?: boolean }>`
  display: flex;
  width: 100%;
  background-color: ${({ disabled }) =>
    disabled ? "rgba(0,0,0,0.02)" : "#f1f2f4"};
  height: 44px;
  border-radius: 100px;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 25px;

  & * {
    color: ${({ disabled }) => disabled && "rgba(103,106,113,0.25)"};
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 20px 20px;
  row-gap: 10px;
`;

export default Location;
