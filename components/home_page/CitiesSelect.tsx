import React, { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../common/AppContext";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { TFormData } from "../../redux/slicers/types";
import { fetchCitiesData } from "../../redux/slicers/formDataSlicer";
import ModalWrapper from "../UI/ModalWrapper";
import CityItem from "./CityItem";
import SectionHeader from "../UI/SectionHeader";
import Input from "../UI/Input";
import Badge from "../UI/Badge";

const CitiesSelect = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const { isCityOpen, setIsCityOpen } = useContext(AppContext);

  const { citiesData } = useAppSelector<TFormData>((state) => state.formData);

  const {
    data: { city },
  } = useAppSelector<TFormData>((state) => state.formData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCitiesData());
  }, []);

  const handleClickClose = () => {
    if (setIsCityOpen) setIsCityOpen(false);
  };

  const handleValueChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const currCitiesValue = useMemo(() => {
    if (citiesData) {
      const newCitiesData = structuredClone(citiesData);
      return newCitiesData
        ?.map((el) => {
          el.cities = el.cities.sort((a, b) => a.name.localeCompare(b.name));
          return el;
        })
        ?.sort((a, b) => a.name.localeCompare(b.name));
    }
    return null;
  }, [inputValue, citiesData]);

  return (
    <StyledWrapper isOpen={isCityOpen}>
      <ModalContainer>
        <HeaderContainer>
          <StyledHeader>Пожалуйста, выберите город</StyledHeader>
          <CloseIcon onClick={handleClickClose} />
        </HeaderContainer>
        <Input
          placeholder="Введите название города"
          onChangeHandler={handleValueChange}
          value={inputValue}
        />
        {city?.id && <Badge text={city?.name} />}
        <CitiesWrapper>
          {currCitiesValue &&
            currCitiesValue?.map((el, i) => {
              return <CityItem data={el} key={`${el?.name}${i}`} />;
            })}
        </CitiesWrapper>
      </ModalContainer>
    </StyledWrapper>
  );
};

const ModalContainer = styled.div`
  display: flex;
  padding: 20px 20px 60px;
  flex-direction: column;
  background-color: white;
  width: 500px;
  overflow: auto;
  row-gap: 10px;
`;

const StyledHeader = styled(SectionHeader)`
  padding: 0;
  color: black;
`;

const HeaderContainer = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  align-items: center;
`;

const CloseIcon = styled(CloseOutline)`
  height: 28px;
  cursor: pointer;
`;

const CitiesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 3px;
  row-gap: 1px;
`;

const StyledWrapper = styled(ModalWrapper)`
  overflow: hidden;
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #fdfdfd;
`;

export default CitiesSelect;
