import { createRef, useEffect } from "react";
import { Divider, GeneralWrapper, HeaderContainer } from "../components/UI";
import { Cost, TagsSection } from "../components/home_page";
import { Ref } from "../common/types";
import { fetchCitiesData } from "../redux/slicers/formDataSlicer";
import { useAppDispatch } from "../redux/hooks";

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCitiesData());
  }, []);

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
      children: "Агент",
    },
    {
      ref: notAgentRef,
      children: "Собственник",
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
      <TagsSection refs={agentArr} header="Автор объявления" />
      <Divider />
      <Cost />
      <Divider />
    </GeneralWrapper>
  );
};

export default Home;
