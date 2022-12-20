import styled from "styled-components";
import { MutableRefObject, useRef } from "react";

const Home = () => {
  const roomTagRef = useRef(null);
  const flatTagRef = useRef(null);
  const houseTagRef = useRef(null);

  const propertyRefsArr = [roomTagRef, flatTagRef, houseTagRef];

  const rentTagRef = useRef(null);
  const buyTagRef = useRef(null);

  const servTypeArr = [rentTagRef, buyTagRef];

  const agentRef = useRef(null);
  const notAgentRef = useRef(null);

  const agentArr = [agentRef, notAgentRef];

  const handleChangeActiveClick =
    (ref: MutableRefObject<null>, arr: MutableRefObject<null>[]) => () => {
      for (let i = 0; i < arr.length; i++) {
        (arr[i].current as unknown as HTMLDivElement).classList.remove(
          "active"
        );
      }
      (ref.current as unknown as HTMLDivElement).classList.add("active");
    };

  return (
    <Wrapper>
      <HeaderContainer>Снять недвижимость</HeaderContainer>
      <Divider />
      <SectionHeader>Тип жилья</SectionHeader>
      <TagsContainer>
        <Tag
          onClick={handleChangeActiveClick(roomTagRef, propertyRefsArr)}
          ref={roomTagRef}
        >
          Комната
        </Tag>
        <Tag
          onClick={handleChangeActiveClick(flatTagRef, propertyRefsArr)}
          ref={flatTagRef}
        >
          Квартира
        </Tag>
        <Tag
          onClick={handleChangeActiveClick(houseTagRef, propertyRefsArr)}
          ref={houseTagRef}
        >
          Дом
        </Tag>
      </TagsContainer>
      <Divider />
      <SectionHeader>Тип услуги</SectionHeader>
      <TagsContainer>
        <Tag
          onClick={handleChangeActiveClick(rentTagRef, servTypeArr)}
          ref={rentTagRef}
        >
          Снять
        </Tag>
        <Tag
          onClick={handleChangeActiveClick(buyTagRef, servTypeArr)}
          ref={buyTagRef}
        >
          Купить
        </Tag>
      </TagsContainer>
      <Divider />
      <SectionHeader>Агент</SectionHeader>
      <TagsContainer>
        <Tag
          onClick={handleChangeActiveClick(agentRef, agentArr)}
          ref={agentRef}
        >
          Да
        </Tag>
        <Tag
          onClick={handleChangeActiveClick(notAgentRef, agentArr)}
          ref={notAgentRef}
        >
          Нет
        </Tag>
      </TagsContainer>
      <Divider />
      <SectionHeader>Стоимость, ₽</SectionHeader>
      <CostContainer>
        <Input placeholder="от" type="number" />—
        <Input placeholder="до" type="number" />
      </CostContainer>
    </Wrapper>
  );
};

const Input = styled.input`
  background-color: rgb(243, 244, 246);
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 100px;
  border: none;
  max-width: 170px;
  font-size: 15px;
  outline: none;
  &::placeholder {
    color: rgb(198, 202, 213);
  }
`;

const CostContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  gap: 5px;
`;

const Tag = styled.div`
  display: flex;
  padding: 10px 20px;
  border: 1px rgb(215, 219, 227) solid;
  border-radius: 20px;
  font-size: 14px;
  line-height: 18px;
  color: rgb(37, 37, 37);
  cursor: pointer;
  transition: 0.1s linear;

  &:hover {
    background-color: rgba(104, 110, 253, 0.15);
  }

  &:active {
    background-color: rgba(104, 110, 253, 0.25);
  }
  &.active {
    background-color: rgb(104, 110, 253);
    color: white;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 20px 20px;
`;

const SectionHeader = styled.div`
  display: flex;
  color: rgb(104, 107, 114);
  font-size: 14px;
  font-weight: bold;
  line-height: 18px;
  padding: 20px 20px 8px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgb(215, 219, 227);
`;

const HeaderContainer = styled.div`
  padding: 20px;
  color: rgb(37, 37, 37);
  font-size: 20px;
  font-weight: bold;
  line-height: 30px;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: fixed;
  overflow-x: hidden;
  overflow-y: scroll;
  flex-direction: column;
`;

export default Home;
