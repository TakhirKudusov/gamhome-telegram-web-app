import React, { useEffect, useMemo, useState } from "react";
import Title from "antd/lib/typography/Title";
import {
  Button,
  Divider,
  Form,
  InputNumber,
  Radio,
  Select,
  Slider,
  TreeSelect,
} from "antd";
import {
  authorOptions,
  categoryOptions,
  typeOptions,
} from "../common/constants";
import styled from "styled-components";
import { FieldName } from "../common/enums";
import { axiosInstance } from "../common/axiosInstance";
import {
  handleFormatData,
  handleFormatDistrictsData,
  handleFormatMetrosData,
  handleFormSubmit,
  handleGetData,
} from "../common/helpers";
import {
  geolocationHandler,
  mapboxHandler,
} from "../common/geolocation.helper";
import { createRef, useEffect } from "react";
import {
  Divider,
  GeneralWrapper,
  HeaderContainer,
  SaveButton,
} from "../components/UI";
import { Cost, TagsSection } from "../components/home_page";
import { Refs } from "../common/types";
import { fetchCitiesData } from "../redux/slicers/formDataSlicer";
import { useAppDispatch } from "../redux/hooks";
import RadioButton from "../components/UI/RadioButton";
import SimpleForm from "../components/home_page/SimpleForm";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<"error" | undefined>();

  const [polygon, setPolygon] = useState<[number, number][] | null>(null);
  const [currCoords, setCurrCoords] = useState<[number, number]>([
    37.61556, 55.75222,
  ]);
  const [citiesData, setCitiesData] = useState<any[] | null>(null);
  const [mounted, setMounted] = useState(false);

  const [currCity, setCurrCity] = useState<string | null | undefined>(null);

  const [cityDisabled, setCityDisabled] = useState<boolean>(false);
  const [districtsDisabled, setDistrictsDisabled] = useState<boolean>(true);
  const [metrosDisabled, setMetrosDisabled] = useState<boolean>(true);

  const [form] = Form.useForm();

  const handleFormChange = (value: any) => {
    if (value.city || !form.getFieldsValue().city) {
      form.setFieldValue(FieldName.DISTRICTS, []);
      form.setFieldValue(FieldName.METROS, []);
    }
  };

  const handleChangeCity = (value: string) => {
    setCurrCity(value);
  };

  const cities = useMemo(handleFormatData(citiesData, "cities"), [citiesData]);

  const districts = useMemo(
    handleGetData(
      citiesData,
      currCity,
      setDistrictsDisabled,
      "districts",
      handleFormatDistrictsData
    ),
    [currCity]
  );

  const metros = useMemo(
    handleGetData(
      citiesData,
      currCity,
      setMetrosDisabled,
      "metroLines",
      handleFormatMetrosData
    ),
    [currCity]
  );

  useEffect(() => {
    setLoading(true);
    setCityDisabled(true);
    geolocationHandler(setCurrCoords);
    mapboxHandler(currCoords, setPolygon);
    setMounted(true);
    axiosInstance
      .get("regions")
      .then((data) => {
        setCitiesData(data.data);
        setLoading(false);
        setCityDisabled(false);
      })
      .catch((error) => {
        setCityDisabled(false);
        setLoading(false);
        setStatus("error");
        console.error(error);
      });
  }, []);

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

  return (
    <>
      <GeneralWrapper>
        <HeaderContainer>Снять недвижимость</HeaderContainer>
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
        <SimpleForm
          header="Расстояние до метро, км."
          minType="minKmMetro"
          maxType="maxKmMetro"
        />
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
