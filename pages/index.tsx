import React, { createRef, useEffect, useState } from "react";
import styled from "styled-components";
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
import { useAppSelector } from "../redux/hooks";
import { TFormData } from "../redux/slicers/types";
import { setActiveParams } from "../common/helpers";
import Map from "../components/home_page/Map";
import Parameters from "../components/home_page/Parameters";

const Home = () => {
  const { data } = useAppSelector<TFormData>((state) => state.formData);

  const roomTagRef = createRef();
  const flatTagRef = createRef();
  const houseTagRef = createRef();

  const categoryRefsArr: Refs = {
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

  const typeArr: Refs = {
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
  const ownerRef = createRef();

  const authorArr: Refs = {
    refs: [
      {
        value: 2,
        ref: agentRef,
        children: "Агент",
      },
      {
        value: 3,
        ref: ownerRef,
        children: "Собственник",
      },
    ],
    type: "author",
  };

  useEffect(() => {
    setActiveParams(categoryRefsArr.refs, data.category);
    setActiveParams(typeArr.refs, data.type);
    setActiveParams(authorArr.refs, data.author);
  }, [data]);

  return (
    <>
      <GeneralWrapper>
        <HeaderContainer>Настроить параметры поиска</HeaderContainer>
        <Divider />
        <TagsSection refs={categoryRefsArr} header="Тип жилья" />
        <Divider />
        <TagsSection refs={typeArr} header="Тип услуги" />
        <Divider />
        <TagsSection refs={authorArr} header="Автор объявления" />
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
        <Divider />
        {data?.category && <Parameters />}
      </GeneralWrapper>
      <SaveButton />
      <Map />
    </>
  );
};

export default Home;
