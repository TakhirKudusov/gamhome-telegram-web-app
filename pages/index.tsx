import React, { useEffect, useMemo, useState, createRef } from "react";
import styled from "styled-components";
import { FieldName } from "../common/enums";
import { axiosInstance } from "../common/axiosInstance";
import {
  handleFormatData,
  handleFormatDistrictsData,
  handleFormatMetrosData,
  handleGetData,
} from "../common/helpers";
import {
  geolocationHandler,
  mapboxHandler,
} from "../common/geolocation.helper";
import {
  Divider,
  GeneralWrapper,
  HeaderContainer,
  SaveButton,
  SectionHeader,
} from "../components/UI";
import { TagsSection } from "../components/home_page";
import { Refs } from "../common/types";
import RadioButton from "../components/UI/RadioButton";
import SimpleForm from "../components/home_page/SimpleForm";
import Location from "../components/home_page/Location";

const Home = () => {
  // const [loading, setLoading] = useState<boolean>(false);
  // const [status, setStatus] = useState<"error" | undefined>();
  //

  // const [citiesData, setCitiesData] = useState<any[] | null>(null);
  // const [mounted, setMounted] = useState(false);
  //
  // const [currCity, setCurrCity] = useState<string | null | undefined>(null);
  //
  // const [cityDisabled, setCityDisabled] = useState<boolean>(false);
  // const [districtsDisabled, setDistrictsDisabled] = useState<boolean>(true);
  // const [metrosDisabled, setMetrosDisabled] = useState<boolean>(true);

  // useEffect(() => {
  //   // geolocationHandler(setCurrCoords);
  //   mapboxHandler(currCoords, setPolygon);
  // }, []);

  const roomTagRef = createRef();
  const flatTagRef = createRef();
  const houseTagRef = createRef();

  const propertyRefsArr: Refs = {
    refs: [
      {
        value: 3,
        ref: roomTagRef,
        children: "Комната",
      },
      {
        value: 2,
        ref: flatTagRef,
        children: "Квартира",
      },
      {
        value: 4,
        ref: houseTagRef,
        children: "Дом",
      },
    ],
    type: "category",
  };

  const rentTagRef = createRef();
  const buyTagRef = createRef();

  const servTypeArr: Refs = {
    refs: [
      {
        value: 2,
        ref: rentTagRef,
        children: "Снять",
      },
      {
        value: 1,
        ref: buyTagRef,
        children: "Купить",
      },
    ],
    type: "type",
  };

  const agentRef = createRef();
  const notAgentRef = createRef();

  const agentArr: Refs = {
    refs: [
      {
        value: 2,
        ref: agentRef,
        children: "Агент",
      },
      {
        value: 3,
        ref: notAgentRef,
        children: "Собственник",
      },
    ],
    type: "isAgent",
  };

  useEffect(() => {
    if (flatTagRef?.current && rentTagRef?.current && notAgentRef?.current) {
      (flatTagRef.current as HTMLDivElement).classList.add("active");
      (rentTagRef.current as HTMLDivElement).classList.add("active");
      (notAgentRef.current as HTMLDivElement).classList.add("active");
    }
  }, []);

  return (
    <>
      <GeneralWrapper>
        <HeaderContainer>Настроить параметры поиска</HeaderContainer>
        <Divider />
        <TagsSection refs={propertyRefsArr} header="Тип жилья" />
        <Divider />
        <TagsSection refs={servTypeArr} header="Тип услуги" />
        <Divider />
        <TagsSection refs={agentArr} header="Автор объявления" />
        <Divider />
        <SimpleForm
          header="Стоимость ₽"
          minType="minPrice"
          maxType="maxPrice"
        />
        <Divider />
        <RadioButton header="Без комиссии" label="Да" fieldType="fee" />
        <Divider />
        <RadioButton
          header="Являетесь агентом?"
          label="Да"
          fieldType="isAgent"
        />
        <Divider />
        <SimpleForm
          header="Расстояние до метро, км."
          minType="minKmMetro"
          maxType="maxKmMetro"
        />
        <Divider />
        <Location />
      </GeneralWrapper>
      <SaveButton />
    </>
  );
};

const MapContainer = styled.div`
  height: 300px;
  max-width: 500px;
`;

const Wrapper = styled.div`
  display: flex;
  padding: 5px;
  flex-direction: column;
`;

export default Home;
