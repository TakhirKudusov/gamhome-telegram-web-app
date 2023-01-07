import React, { useContext, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/utils/hooks";
import { TFormData } from "../redux/slicers/types";
import { setActiveParams } from "../common/utils/helpers";
import GeneralWrapper from "../components/UI/wrapper_ui/GeneralWrapper";
import HeaderContainer from "../components/UI/container_ui/HeaderContainer";
import SimpleForm from "../components/home_page/simple_sections/SimpleForm";
import TagsSection from "../components/home_page/simple_sections/TagsSection";
import RadioButton from "../components/UI/radio_button_ui/RadioButton";
import SaveButton from "../components/UI/menu_buttons/SaveButton";
import Divider from "../components/UI/divider_ui/Divider";
import Parameters from "../components/home_page/simple_sections/Parameters";
import Map from "../components/home_page/location/Map";
import Location from "../components/home_page/location/Location";
import {
  fetchCitiesData,
  setFormData,
  setPrimitiveField,
} from "../redux/slicers/formDataSlicer";
import { AppContext } from "../common/context/AppContext";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { setDisabled, setEnabled } from "../redux/slicers/disableSelectsSlicer";
import Select from "../components/home_page/select/Select";
import { handleClearSelect, handleGetData } from "../common/helpers/helpers";
import { useGetRefs } from "../common/custom_hooks/useGetRefs";
import {
  authorValues,
  categoryValues,
  typeValues,
} from "../common/utils/constants";
import { RefType } from "../common/utils/enums";

const Home = () => {
  const { data, citiesData, isLoading, isError } = useAppSelector<TFormData>(
    (state) => state.formData
  );

  const {
    isCityOpen,
    setIsCityOpen,
    isDistrictOpen,
    setIsDistrictOpen,
    isMetroOpen,
    setIsMetroOpen,
  } = useContext(AppContext);

  const dispatch = useAppDispatch();

  const districts = useMemo(
    handleGetData(
      data,
      citiesData,
      "districts",
      "isDistrictsDisabled",
      dispatch
    ),
    [data.city, citiesData]
  );

  const metros = useMemo(
    handleGetData(data, citiesData, "metroLines", "isMetrosDisabled", dispatch),
    [data.city, citiesData]
  );

  const categoryRefsArr = useGetRefs(categoryValues, RefType.CATEGORY);
  const typeArr = useGetRefs(typeValues, RefType.TYPE);
  const authorArr = useGetRefs(authorValues, RefType.AUTHOR);

  useEffect(() => {
    if (!data.city.id) {
      dispatch(setPrimitiveField({ name: "districts", value: [] }));
      dispatch(setPrimitiveField({ name: "metros", value: [] }));
    }
  }, [data.city]);

  useEffect(() => {
    setActiveParams(categoryRefsArr.refs, data.category);
    setActiveParams(typeArr.refs, data.type);
    setActiveParams(authorArr.refs, data.author);
  }, [data]);

  useEffect(() => {
    dispatch(fetchCitiesData());

    const prevData = localStorage.getItem("formData");

    if (prevData) {
      dispatch(setFormData(JSON.parse(prevData)));
    }
  }, []);

  useEffect(() => {
    if (isLoading || isError) {
      dispatch(setDisabled("isCitiesDisabled"));
    } else {
      dispatch(setEnabled("isCitiesDisabled"));
    }
  }, [isLoading, isError]);

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
      <Select
        data={citiesData}
        type="cities"
        targetItem={data.city}
        isOpen={isCityOpen}
        setIsOpen={setIsCityOpen}
        handleClearAction={handleClearSelect("city", dispatch)}
        header="Пожалуйста, выберите город"
        placeholder="Введите название города"
      />
      <Select
        data={districts as Params[]}
        type="districts"
        targetItem={data.districts}
        isOpen={isDistrictOpen}
        setIsOpen={setIsDistrictOpen}
        handleClearAction={handleClearSelect("districts", dispatch)}
        header="Пожалуйста, выберите район"
        placeholder="Введите название района"
        mode="multi"
      />
      <Select
        data={metros as Params[]}
        type="metros"
        targetItem={data.metros}
        isOpen={isMetroOpen}
        setIsOpen={setIsMetroOpen}
        handleClearAction={handleClearSelect("metros", dispatch)}
        header="Пожалуйста, выберите станцию метро"
        placeholder="Введите название станции метро"
        mode="multi"
      />
      <SaveButton />
      <Map />
    </>
  );
};

export default Home;
