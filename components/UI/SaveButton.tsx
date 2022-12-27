import styled from "styled-components";
import { useAppSelector } from "../../redux/hooks";
import { TFormData } from "../../redux/slicers/types";

const SaveButton = () => {
  const { data } = useAppSelector<TFormData>((state) => state.formData);

  const handlePushClick = () => {
    console.log(data);
  };

  return <Container onClick={handlePushClick}>Отправить</Container>;
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  position: fixed;
  background-color: #676a71;
  border-radius: 100px;
  bottom: 0;
  cursor: pointer;
  color: white;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  transition: 0.1s linear;

  &:hover {
    background-color: rgba(103, 106, 113, 0.95);
  }

  &:active {
    background-color: rgba(103, 106, 113, 0.9);
  }
`;

export default SaveButton;
