import { createRef } from "react";
import {
  CostContainer,
  Divider,
  GeneralWrapper,
  HeaderContainer,
  Input,
  SectionHeader,
} from "../components/UI";
import { Cost, TagsSection } from "../components/home_page";
import { Ref } from "../common/types";

const Home = () => {
  const roomTagRef = createRef();
  const flatTagRef = createRef();
  const houseTagRef = createRef();

  const propertyRefsArr: Ref[] = [
    {
      ref: roomTagRef,
      children: "Комната",
    },
    {
      ref: flatTagRef,
      children: "Квартира",
    },
    {
      ref: houseTagRef,
      children: "Дом",
    },
  ];

  const rentTagRef = createRef();
  const buyTagRef = createRef();

  const servTypeArr: Ref[] = [
    {
      ref: rentTagRef,
      children: "Снять",
    },
    {
      ref: buyTagRef,
      children: "Купить",
    },
  ];

  const agentRef = createRef();
  const notAgentRef = createRef();

  const agentArr: Ref[] = [
    {
      ref: agentRef,
      children: "Да",
    },
    {
      ref: notAgentRef,
      children: "Нет",
    },
  ];

  return (
    <GeneralWrapper>
      <HeaderContainer>Снять недвижимость</HeaderContainer>
      <Divider />
      <TagsSection refs={propertyRefsArr} header="Тип жилья" />
      <Divider />
      <TagsSection refs={servTypeArr} header="Тип услуги" />
      <Divider />
      <TagsSection refs={agentArr} header="Агент" />
      <Divider />
      <Cost />
      <Divider />
    </GeneralWrapper>
  );
};

export default Home;
