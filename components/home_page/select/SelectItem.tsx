import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { City, MetroLines, TFormData } from "../../../redux/slicers/types";
import AreaRow from "../../UI/area_row_ui/AreaRow";
import CityPoint from "./SelectChildItem";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import CheckBox from "../../UI/checkbox_ui/CheckBox";
import { Done } from "@styled-icons/material";
import { useAppDispatch, useAppSelector } from "../../../redux/utils/hooks";
import { handleCheckClick, setActiveDistrict } from "./helpers";

type Props = {
  data: City | MetroLines | Params | undefined;
  mode: "single" | "multi";
  type: "cities" | "districts" | "metros";
};

const CityItem: FC<Props> = ({ data, mode, type }) => {
  const [checked, setChecked] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const {
    data: { districts, metros },
  } = useAppSelector<TFormData>((state) => state.formData);

  useEffect(() => {
    setActiveDistrict(setChecked, districts, data);
  }, [districts]);

  return (
    <Container>
      <AreaRow onClickHandler={handleCheckClick(type, dispatch, data)}>
        <Text>{data?.name}</Text>
        {type === "districts" && <CheckBox>{checked && <DoneIcon />}</CheckBox>}
      </AreaRow>
      {data &&
        (data as any)?.[type]?.map((el: any, i: number) => {
          return <CityPoint data={el} key={`${el.name}${i}`} />;
        })}
    </Container>
  );
};

const DoneIcon = styled(Done)`
  color: green;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1px;
`;

const Text = styled.div`
  font-size: 14px;
`;

export default CityItem;
