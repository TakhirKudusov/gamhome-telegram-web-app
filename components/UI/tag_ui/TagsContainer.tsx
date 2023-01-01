import React, { memo } from "react";
import { ChildrenProp } from "../../../common/utils/types";
import styled from "styled-components";

const TagsContainer: React.FC<ChildrenProp> = ({ children }) => {
  return <StyledTagsContainer>{children}</StyledTagsContainer>;
};

const StyledTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 20px 20px;
`;

export default memo(TagsContainer);
