import styled from "styled-components";
import React, { FC, memo, useEffect, useState } from "react";
import { Cities, Metros, TFormData } from "../../../redux/slicers/types";
import { useAppDispatch, useAppSelector } from "../../../redux/utils/hooks";
import AreaRow from "../../UI/area_row_ui/AreaRow";
import { handleSetDataPoint, setActive } from "./helpers";
import CheckBox from "../../UI/checkbox_ui/CheckBox";
import { Done } from "@styled-icons/material";

type Props = {
  data: Cities | Metros;
  type: "cities" | "districts" | "metros";
};

const SelectChildItem: FC<Props> = ({ data, type }) => {
  const [checked, setChecked] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const {
    data: { metros },
  } = useAppSelector<TFormData>((state) => state.formData);

  useEffect(() => {
    setActive(setChecked, metros, data);
  }, [metros]);

  return (
    <Row
      onClickHandler={handleSetDataPoint(
        dispatch,
        type,
        data,
        type === "metros"
      )}
    >
      <Text>{data?.name}</Text>
      {type === "metros" && <CheckBox>{checked && <DoneIcon />}</CheckBox>}
    </Row>
  );
};

const DoneIcon = styled(Done)`
  color: green;
`;

const Text = styled.div`
  font-size: 14px;
`;

const Row = styled(AreaRow)`
  margin-left: 20px;
`;

export default memo(SelectChildItem);
