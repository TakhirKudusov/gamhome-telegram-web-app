import { SpinnerIos } from "@styled-icons/fluentui-system-filled/SpinnerIos";
import styled, { keyframes } from "styled-components";

const Spinner = () => {
  return <SpinnerIcon />;
};

const SpinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerIcon = styled(SpinnerIos)`
  width: 40px;
  color: #526eff;
  animation: ${SpinAnimation} 0.5s linear infinite;
  align-self: center;
  margin-top: 50px;
`;

export default Spinner;
