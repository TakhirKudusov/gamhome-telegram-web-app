import React from "react";
import { SectionHeader, Tag, TagsContainer } from "../UI";
import FormHelper from "../../common/FormHelper";
import { Refs } from "../../common/types";
import { useAppDispatch } from "../../redux/hooks";

type Props = {
  refs: Refs;
  header: string;
};

const TagsSection: React.FC<Props> = ({ refs, header }) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <SectionHeader>{header}</SectionHeader>
      <TagsContainer>
        {refs.refs.map((el, i) => {
          return (
            <Tag
              onClickHandler={FormHelper.handleChangeActiveClick(
                refs.refs[i],
                refs,
                dispatch
              )}
              ref={refs.refs[i].ref}
              key={refs.refs[i].children}
            >
              {refs.refs[i].children}
            </Tag>
          );
        })}
      </TagsContainer>
    </>
  );
};

export default TagsSection;
