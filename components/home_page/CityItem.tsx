import React, { FC } from "react";
import styled from "styled-components";
import { City } from "../../redux/slicers/types";
import AreaRow from "../UI/AreaRow";
import CityPoint from "./CityPoint";

type Props = {
  data: City | undefined;
};

const CityItem: FC<Props> = ({ data }) => {
  return (
    <CityContainer>
      <AreaRow>
        <Text>{data?.name}</Text>
      </AreaRow>
      {data &&
        data?.cities?.map((el, i) => {
          return <CityPoint data={el} key={`${el.name}${i}`} />;
        })}
    </CityContainer>
  );
};

const CityContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1px;
`;

const Text = styled.div`
  font-size: 14px;
`;

export default CityItem;
