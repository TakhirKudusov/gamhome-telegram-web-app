import React, {
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import styled from "styled-components";
import { City, MetroLines } from "../../../redux/slicers/types";
import ModalWrapper from "../../UI/wrapper_ui/ModalWrapper";
import SelectItem from "./SelectItem";
import SectionHeader from "../../UI/section_header_ui/SectionHeader";
import Input from "../../UI/input_ui/Input";
import BadgesGroup from "../../UI/badge_ui/BadgesGroup";
import Spinner from "../../UI/spinner/Spinner";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Badge from "../../UI/badge_ui/Badge";

type Props = {
  data: City[] | MetroLines[] | Params[] | null;
  isOpen: boolean | undefined;
  setIsOpen: Dispatch<SetStateAction<boolean>> | undefined;
  targetItem: Params | Params[];
  handleClearAction: () => void;
  type: "cities" | "districts" | "metros";
  header: string;
  placeholder: string;
  mode?: "single" | "multi";
};

const Select: FC<Props> = ({
  data,
  isOpen,
  setIsOpen,
  targetItem,
  handleClearAction,
  type,
  header,
  placeholder,
  mode = "single",
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filtering, setFiltering] = useState<boolean>(false);

  const handleClickClose = () => {
    if (setIsOpen) setIsOpen(false);
  };

  const handleValueChange = (e: any) => {
    setFiltering(true);
    setInputValue(e.target.value);
  };

  const currValue = useMemo(() => {
    if (data) {
      if (filtering && inputValue !== "") {
        const filteredArr = data
          .map((el) => {
            if (el.name.toLowerCase().includes(inputValue.toLowerCase())) {
              return el;
            }
            if (type !== "districts") {
              const filteredChildren = (el as any)[type].filter((el: any) =>
                el.name.toLowerCase().includes(inputValue.toLowerCase())
              );
              if (filteredChildren.length !== 0) {
                return {
                  name: el.name,
                  id: el.id,
                  [type]: filteredChildren,
                };
              }
            }
          })
          .filter((el) => el);
        setFiltering(false);
        return filteredArr;
      }
      setFiltering(false);
      return data;
    }
    return null;
  }, [inputValue, data]);

  return (
    <StyledWrapper isOpen={isOpen}>
      <ModalContainer>
        <HeaderContainer>
          <StyledHeader>{header}</StyledHeader>
          <CloseIcon onClick={handleClickClose} />
        </HeaderContainer>
        <Input
          placeholder={placeholder}
          onChangeHandler={handleValueChange}
          value={inputValue}
        />
        {mode === "multi"
          ? targetItem.length !== 0 && (
              <BadgesGroup
                onClickHandler={handleClearAction}
                quantity={targetItem.length}
                text={(targetItem as any[])[0].name}
              />
            )
          : (targetItem as Params)?.id && (
              <BadgesGroup
                text={(targetItem as Params)?.name}
                onClickHandler={handleClearAction}
              />
            )}
        <Wrapper>
          {filtering ? (
            <Spinner />
          ) : (
            currValue &&
            currValue?.map((el, i) => {
              return (
                <SelectItem
                  type={type}
                  mode={mode}
                  data={el}
                  key={`${el?.name}${i}`}
                />
              );
            })
          )}
        </Wrapper>
      </ModalContainer>
    </StyledWrapper>
  );
};

const ModalContainer = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  background-color: white;
  width: 500px;
  overflow: auto;
  row-gap: 10px;
`;

const StyledHeader = styled(SectionHeader)`
  padding: 0;
  color: black;
`;

const HeaderContainer = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  align-items: center;
`;

const CloseIcon = styled(CloseOutline)`
  height: 28px;
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 3px;
  row-gap: 1px;
`;

const StyledWrapper = styled(ModalWrapper)`
  overflow: hidden;
  display: flex;
  justify-content: center;
  width: 100%;
  z-index: 15;
  background-color: #fdfdfd;
`;

export default memo(Select);
