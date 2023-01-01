import styled from "styled-components";
import React, { FC, memo } from "react";
import { Cities } from "../../../redux/slicers/types";
import { useAppDispatch } from "../../../redux/utils/hooks";
import { setPrimitiveField } from "../../../redux/slicers/formDataSlicer";
import AreaRow from "../../UI/area_row_ui/AreaRow";

type Props = {
  data: Cities;
};

const SelectChildItem: FC<Props> = ({ data }) => {
  const dispatch = useAppDispatch();

  const handleCityCheck = () => {
    dispatch(
      setPrimitiveField({
        name: "city",
        value: { id: data.id, name: data.name },
      })
    );
  };

  return (
    <CityRow onClickHandler={handleCityCheck}>
      <Text>{data?.name}</Text>
    </CityRow>
  );
};

const Text = styled.div`
  font-size: 14px;
`;

const CityRow = styled(AreaRow)`
  margin-left: 20px;
`;

export default memo(SelectChildItem);
