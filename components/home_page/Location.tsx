import React, { Dispatch, SetStateAction, useContext } from "react";
import styled from "styled-components";
import { ChevronRight } from "@styled-icons/bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { TDisableSelect, TFormData } from "../../redux/slicers/types";
import { AppContext } from "../../common/AppContext";
import SectionHeader from "../UI/SectionHeader";
import Badge from "../UI/Badge";
import { setPrimitiveField } from "../../redux/slicers/formDataSlicer";
import BadgesGroup from "../UI/BadgesGroup";

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

  const handleMapOpen =
    (
      setStateAction: Dispatch<SetStateAction<boolean>> | undefined,
      isDisabled: boolean
    ) =>
    () => {
      if (setStateAction && !isDisabled) {
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

  const handleClearDistricts = () => {
    dispatch(setPrimitiveField({ name: "districts", value: [] }));
  };

  return (
    <>
      <SectionHeader>Расположение</SectionHeader>
      <ButtonsContainer>
        <ChoseBtn
          disabled={isMapDisabled}
          onClick={handleMapOpen(setIsMapOpen, isMapDisabled)}
        >
          <Text>Нарисовать на карте</Text>
          <ChevronIcon />
        </ChoseBtn>
        {data.polygon && (
          <BadgesGroup
            text={`Количество выделенных областей: ${data.polygon?.features.length}`}
            onClickHandler={handleClearPolygon}
          />
        )}
        <ChoseBtn
          disabled={isCitiesDisabled}
          onClick={handleMapOpen(setIsCityOpen, isCitiesDisabled)}
        >
          <Text>Выбрать город</Text>
          <ChevronIcon />
        </ChoseBtn>
        {data?.city?.id && (
          <BadgesGroup
            text={data?.city?.name}
            onClickHandler={handleClearCity}
          />
        )}
        <ChoseBtn
          disabled={!data?.city?.id || isDistrictsDisabled}
          onClick={handleMapOpen(setIsDistrictOpen, isDistrictsDisabled)}
        >
          <Text>Выбрать район</Text>
          <ChevronIcon />
        </ChoseBtn>
        {data?.districts.length !== 0 && (
          <BadgesGroup
            text={data?.districts[0]?.name}
            quantity={data?.districts.length}
            onClickHandler={handleClearDistricts}
          />
        )}
        <ChoseBtn
          disabled={!data?.city?.id || isMetrosDisabled}
          onClick={handleMapOpen(setIsMetroOpen, isMetrosDisabled)}
        >
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
