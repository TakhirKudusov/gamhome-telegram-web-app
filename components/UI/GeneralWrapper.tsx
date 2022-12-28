import { ChildrenProp } from "../../common/types";
import styled from "styled-components";
import { useContext } from "react";
import { AppContext } from "../../common/AppContext";

const GeneralWrapper: React.FC<ChildrenProp> = ({ children }) => {
  const { isMapOpen } = useContext(AppContext);

  return (
    <Wrapper>
      <Container isOpen={isMapOpen as boolean}>{children}</Container>
    </Wrapper>
  );
};

const Container = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;
  background-color: white;
  max-width: 500px;
  height: 100vh;
  overflow: auto;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #fdfdfd;
  overflow: hidden;
`;

export default GeneralWrapper;
