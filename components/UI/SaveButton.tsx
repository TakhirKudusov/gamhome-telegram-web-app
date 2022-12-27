import styled from "styled-components";
import { useAppSelector } from "../../redux/hooks";
import { TFormData } from "../../redux/slicers/types";

const SaveButton = () => {
  const { data } = useAppSelector<TFormData>((state) => state.formData);

  const handlePushClick = () => {
    console.log(data);
  };

  return (
    <Container>
      <Button onClick={handlePushClick}>Отправить</Button>
    </Container>
  );
};

const Button = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  background-color: #252525;
  border-radius: 100px;
  font-size: 17px;
  cursor: pointer;
  color: white;
  align-items: center;
  justify-content: center;

  &:active {
    background-color: rgba(103, 106, 113, 0.9);
  }
`;

const Container = styled.div`
  position: fixed;
  bottom: 0;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 5px;
`;

export default SaveButton;
