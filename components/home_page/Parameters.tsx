import { Divider, SectionHeader } from "../UI";
import React, { useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { TFormData } from "../../redux/slicers/types";
import { useGetParametersByIdQuery } from "../../redux/APIs/parametersApi";
import SimpleForm from "./SimpleForm";

const Parameters = () => {
  const {
    data: { category },
  } = useAppSelector<TFormData>((state) => state.formData);

  const { data, isLoading, isError } = useGetParametersByIdQuery(category);
  return (
    <>
      {data?.map((el: any) => {
        return (
          <>
            <SimpleForm
              key={el.id}
              header={el.name}
              minType="minKmMetro"
              maxType="maxKmMetro"
            />
            <Divider />
          </>
        );
      })}
    </>
  );
};

export default Parameters;
