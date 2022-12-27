import { ChildrenProp } from "../../common/types";
import styled from "styled-components";

const GeneralWrapper: React.FC<ChildrenProp> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;
  background-color: white;
`;

export default GeneralWrapper;
