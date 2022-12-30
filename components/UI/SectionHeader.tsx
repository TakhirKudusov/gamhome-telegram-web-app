import { ChildrenProp } from "../../common/types";
import styled from "styled-components";
import { memo } from "react";

type Props = {
  className?: string;
};

const SectionHeader: React.FC<ChildrenProp & Props> = ({
  children,
  className,
}) => {
  return (
    <StyledSectionHeader className={className}>{children}</StyledSectionHeader>
  );
};

const StyledSectionHeader = styled.div`
  display: flex;
  color: rgb(104, 107, 114);
  font-size: 14px;
  font-weight: bold;
  line-height: 18px;
  padding: 20px 20px 8px;
`;

export default memo(SectionHeader);
