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
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCitiesData());
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

export default Home;
