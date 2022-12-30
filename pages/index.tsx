import React, { createRef, useContext, useEffect, useMemo } from "react";
import { Refs } from "../common/types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { TFormData } from "../redux/slicers/types";
import { setActiveParams } from "../common/helpers";
import GeneralWrapper from "../components/UI/GeneralWrapper";
import HeaderContainer from "../components/UI/HeaderContainer";
import SimpleForm from "../components/home_page/SimpleForm";
import TagsSection from "../components/home_page/TagsSection";
import RadioButton from "../components/UI/RadioButton";
import SaveButton from "../components/UI/SaveButton";
import Divider from "../components/UI/Divider";
import Parameters from "../components/home_page/Parameters";
import Map from "../components/home_page/Map";
import Location from "../components/home_page/Location";
import {
  fetchCitiesData,
  setPrimitiveField,
} from "../redux/slicers/formDataSlicer";
import Select from "../components/home_page/Select";
import { AppContext } from "../common/AppContext";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { setDisabled, setEnabled } from "../redux/slicers/disableSelectsSlicer";

const Home = () => {
  const { data, citiesData, isLoading, isError } = useAppSelector<TFormData>(
    (state) => state.formData
  );

  const { isCityOpen, setIsCityOpen, isDistrictOpen, setIsDistrictOpen } =
    useContext(AppContext);

  const dispatch = useAppDispatch();

  const handleClearSelect = (name: "city" | "metros" | "districts") => () => {
    dispatch(
      setPrimitiveField({
        name,
        value: name === "city" ? { id: null, name: "" } : [],
      })
    );
  };

  const districts = useMemo(() => {
    if (data.city?.id) {
      const districtsData = citiesData
        ?.map((el) => {
          for (let i = 0; i < el.cities.length; i++) {
            if (el.cities[i].id === data.city?.id) {
              return el.cities[i].districts;
            }
          }
        })
        .filter((el) => el)[0];
      if (districtsData?.length === 0) {
        queueMicrotask(() => dispatch(setDisabled("isDistrictsDisabled")));
      } else {
        queueMicrotask(() => dispatch(setEnabled("isDistrictsDisabled")));
      }
      return districtsData;
    }
    return null;
  }, [data.city]);

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
    dispatch(setPrimitiveField({ name: "districts", value: [] }));
    dispatch(setPrimitiveField({ name: "metros", value: [] }));
  }, [data.city]);

  useEffect(() => {
    setActiveParams(categoryRefsArr.refs, data.category);
    setActiveParams(typeArr.refs, data.type);
    setActiveParams(authorArr.refs, data.author);
  }, [data]);

  useEffect(() => {
    dispatch(fetchCitiesData());
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
        handleClearAction={handleClearSelect("city")}
        header="Пожалуйста, выберите город"
        placeholder="Введите название города"
      />
      <Select
        data={districts as Params[]}
        type="districts"
        targetItem={data.districts}
        isOpen={isDistrictOpen}
        setIsOpen={setIsDistrictOpen}
        handleClearAction={handleClearSelect("districts")}
        header="Пожалуйста, выберите район"
        placeholder="Введите название района"
        mode="multi"
      />
      <SaveButton />
      <Map />
    </>
  );
};

export default Home;
