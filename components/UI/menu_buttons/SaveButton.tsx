import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../redux/utils/hooks";
import { TFormData } from "../../../redux/slicers/types";
import { clearFormData } from "../../../redux/slicers/formDataSlicer";

const SaveButton = () => {
  const { data } = useAppSelector<TFormData>((state) => state.formData);

  const dispatch = useAppDispatch();

  const handlePushClick = () => {
    console.log(data);
  };

  const handleClearClick = () => {
    dispatch(clearFormData());
  };

  return (
    <Container>
      <ShadowContainer />
      <BtnContainer>
        <SendBtn onClick={handlePushClick}>Отправить</SendBtn>
        <ClearBtn onClick={handleClearClick}>Сбросить</ClearBtn>
      </BtnContainer>
    </Container>
  );
};

const ShadowContainer = styled.div`
  height: 19px;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
  transform: matrix(1, 0, 0, -1, 0, 0);
  width: 100%;
`;

const BtnContainer = styled.div`
  column-gap: 5px;
  display: flex;
  width: 100%;
  background-color: white;
  padding: 0 5px 5px;
`;

const Button = styled.div`
  display: flex;
  width: 100%;
  height: 44px;
  border-radius: 100px;
  font-size: 15px;
  cursor: pointer;
  color: white;
  align-items: center;
  justify-content: center;
`;

const SendBtn = styled(Button)`
  background-color: #bd52ff;
`;

const ClearBtn = styled(Button)`
  background-color: #676a71;
`;

const Container = styled.div`
  position: fixed;
  bottom: 0;
  align-items: center;
  justify-content: center;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default SaveButton;
