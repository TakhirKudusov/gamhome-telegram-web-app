import React from "react";
import { SectionHeader, Tag, TagsContainer } from "../UI";
import FormHelper from "../../common/FormHelper";
import { Ref } from "../../common/types";

type Props = {
  refs: Ref[];
  header: string;
};

const TagsSection: React.FC<Props> = ({ refs, header }) => {
  return (
    <>
      <SectionHeader>{header}</SectionHeader>
      <TagsContainer>
        {refs.map((el, i) => {
          return (
            <Tag
              onClickHandler={FormHelper.handleChangeActiveClick(
                refs[i].ref,
                refs
              )}
              ref={refs[i].ref}
              key={refs[i].children}
            >
              {refs[i].children}
            </Tag>
          );
        })}
      </TagsContainer>
    </>
  );
};

export default TagsSection;
