import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { City, MetroLines, TFormData } from "../../redux/slicers/types";
import AreaRow from "../UI/AreaRow";
import CityPoint from "./CityPoint";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import CheckBox from "../UI/CheckBox";
import { Done } from "@styled-icons/material";
import { setComplexField } from "../../redux/slicers/formDataSlicer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

type Props = {
  data: City | MetroLines | Params | undefined;
  mode: "single" | "multi";
  type: "cities" | "districts" | "metros";
};

const CityItem: FC<Props> = ({ data, mode, type }) => {
  const [checked, setChecked] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const {
    data: { districts },
  } = useAppSelector<TFormData>((state) => state.formData);

  useEffect(() => {
    setChecked(false);
    for (let i = 0; i < districts.length; i++) {
      if (districts[i].id === data?.id) {
        setChecked(true);
        break;
      }
    }
  }, [districts]);

  const handleCheckClick = () => {
    if (mode === "multi") {
      // setChecked((prevState) => !prevState);
      if (type === "districts") {
        dispatch(
          setComplexField({
            name: "districts",
            value: { id: data?.id, name: data?.name },
          })
        );
      }
    }
  };

  return (
    <CityContainer>
      <AreaRow onClickHandler={handleCheckClick}>
        <Text>{data?.name}</Text>
        {mode === "multi" && <CheckBox>{checked && <DoneIcon />}</CheckBox>}
      </AreaRow>
      {data &&
        (typeof data as any) !== "Params" &&
        data?.cities?.map((el, i) => {
          return <CityPoint data={el} key={`${el.name}${i}`} />;
        })}
    </CityContainer>
  );
};

const DoneIcon = styled(Done)`
  color: green;
`;

const CityContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1px;
`;

const Text = styled.div`
  font-size: 14px;
`;

export default CityItem;
