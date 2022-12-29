import { Divider, SectionHeader } from "../UI";
import React, { createRef, useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { TFormData } from "../../redux/slicers/types";
import SimpleForm from "./SimpleForm";
import { useGetParametersByIdQuery } from "../../redux/APIs/parametersApi";
import styled from "styled-components";
import { TagsSection } from "./index";
import { Refs } from "../../common/types";
import { setActiveParams } from "../../common/helpers";

const Parameters = () => {
  const {
    data: { category },
  } = useAppSelector<TFormData>((state) => state.formData);

  const { data, isLoading, isError } = useGetParametersByIdQuery(category);

  const {
    data: { params },
  } = useAppSelector<TFormData>((state) => state.formData);

  const needRepairTagRef = createRef();
  const cosmeticRepairTagRef = createRef();
  const designRepairTagRef = createRef();
  const euroRepairTagRef = createRef();

  const repairRefsArr: Refs = {
    refs: [
      {
        value: "Требуется",
        ref: needRepairTagRef,
        children: "Требуется",
      },
      {
        value: "Косметический",
        ref: cosmeticRepairTagRef,
        children: "Косметический",
      },
      {
        value: "Дизайнерский",
        ref: designRepairTagRef,
        children: "Дизайнерский",
      },
      {
        value: "Евро",
        ref: euroRepairTagRef,
        children: "Евро",
      },
    ],
    type: "params",
    paramType: "repair",
  };

  const panelHouseTagRef = createRef();
  const brickHouseTagRef = createRef();
  const monolithicHouseTagRef = createRef();
  const woodenHouseTagRef = createRef();
  const blockHouseTagRef = createRef();

  const houseTypeRefsArr: Refs = {
    refs: [
      {
        value: "Панельный",
        ref: panelHouseTagRef,
        children: "Панельный",
      },
      {
        value: "Кирпичный",
        ref: brickHouseTagRef,
        children: "Кирпичный",
      },
      {
        value: "Монолитный",
        ref: monolithicHouseTagRef,
        children: "Монолитный",
      },
      {
        value: "Деревянный",
        ref: woodenHouseTagRef,
        children: "Деревянный",
      },
      {
        value: "Блочный",
        ref: blockHouseTagRef,
        children: "Блочный",
      },
    ],
    type: "params",
    paramType: "houseType",
  };

  const brickWallTagRef = createRef();
  const logWallTagRef = createRef();
  const gasBlockWallTagRef = createRef();
  const barWallTagRef = createRef();
  const foamBlockWallTagRef = createRef();
  const panelWallTagRef = createRef();
  const sandwichWallTagRef = createRef();
  const expMaterialWallTagRef = createRef();
  const MetalWallTagRef = createRef();

  const wallMaterialRefsArr: Refs = {
    refs: [
      {
        value: "Кирпич",
        ref: brickWallTagRef,
        children: "Кирпич",
      },
      {
        value: "Бревно",
        ref: logWallTagRef,
        children: "Бревно",
      },
      {
        value: "Газоблоки",
        ref: gasBlockWallTagRef,
        children: "Газоблоки",
      },
      {
        value: "Брус",
        ref: barWallTagRef,
        children: "Брус",
      },
      {
        value: "Пеноблоки",
        ref: foamBlockWallTagRef,
        children: "Пеноблоки",
      },
      {
        value: "Ж/б панели",
        ref: panelWallTagRef,
        children: "Ж/б панели",
      },
      {
        value: "Сэндвич-панели",
        ref: sandwichWallTagRef,
        children: "Сэндвич-панели",
      },
      {
        value: "Экспериментальные материалы",
        ref: expMaterialWallTagRef,
        children: "Экспериментальные материалы",
      },
      {
        value: "Металл",
        ref: MetalWallTagRef,
        children: "Металл",
      },
    ],
    type: "params",
    paramType: "wallMaterial",
  };

  const currentTagParams = (id: number): Refs | undefined => {
    if (id === 1) return repairRefsArr;
    if (id === 8) return houseTypeRefsArr;
    if (id === 14) return houseTypeRefsArr;
    if (id === 18) return wallMaterialRefsArr;
  };

  useEffect(() => {
    if (params?.repair) {
      setActiveParams(repairRefsArr.refs, params?.repair);
    }
  }, [params?.repair]);

  useEffect(() => {
    if (params?.houseType) {
      setActiveParams(houseTypeRefsArr.refs, params?.houseType);
    }
  }, [params?.houseType]);

  useEffect(() => {
    if (params?.wallMaterial) {
      setActiveParams(wallMaterialRefsArr.refs, params?.wallMaterial);
    }
  }, [params?.wallMaterial]);

  return (
    <ParametersContainer>
      {data?.map((el: any) => {
        return (
          <div key={el.id}>
            {el.type === "input" ? (
              <StyledForm
                header={el.name}
                minType="minKmMetro"
                maxType="maxKmMetro"
              />
            ) : (
              <StyledTags
                key={el.id}
                refs={currentTagParams(el.id)}
                header={el.name}
              />
            )}
          </div>
        );
      })}
    </ParametersContainer>
  );
};

const ParametersContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  padding: 20px 20px 10px;
`;

const StyledTags = styled(TagsSection)`
  & > div {
    padding: 0;
  }
  row-gap: 10px;
`;

const StyledForm = styled(SimpleForm)`
  & > div {
    padding: 0;
  }
  row-gap: 10px;
`;

export default Parameters;
