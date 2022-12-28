import React from "react";
import { SectionHeader, Tag, TagsContainer } from "../UI";
import { Refs } from "../../common/types";
import { useAppDispatch } from "../../redux/hooks";
import { setPrimitiveField } from "../../redux/slicers/formDataSlicer";

type Props = {
  refs: Refs;
  header: string;
};

const TagsSection: React.FC<Props> = ({ refs, header }) => {
  const dispatch = useAppDispatch();

  const handleTagClick = (value: number | boolean) => () => {
    dispatch(setPrimitiveField({ name: refs.type, value }));
  };

  return (
    <>
      <SectionHeader>{header}</SectionHeader>
      <TagsContainer>
        {refs.refs.map((el, i) => {
          return (
            <Tag
              onClickHandler={handleTagClick(el.value)}
              ref={el.ref}
              key={el.children}
            >
              {el.children}
            </Tag>
          );
        })}
      </TagsContainer>
    </>
  );
};

export default TagsSection;
