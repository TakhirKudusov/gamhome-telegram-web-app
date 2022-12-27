import React, { useEffect, useMemo, useRef, useState } from "react";
import Title from "antd/lib/typography/Title";
import {
  Button,
  Divider,
  Form,
  InputNumber,
  Radio,
  Select,
  Slider,
  TreeSelect,
} from "antd";
import {
  authorOptions,
  categoryOptions,
  typeOptions,
} from "../common/constants";
import styled from "styled-components";
import { FieldName } from "../common/enums";
import { axiosInstance } from "../common/axiosInstance";
import { handleFormSubmit, handleGetLocationData } from "../common/helpers";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import * as turf from "@turf/turf";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import {
  geolocationHandler,
  mapboxHandler,
} from "../common/geolocation.helper";

const Home = () => {
  const [polygon, setPolygon] = useState<[number, number][] | null>(null);
  const [currCoords, setCurrCoords] = useState<[number, number]>([
    37.61556, 55.75222,
  ]);
  const [citiesData, setCitiesData] = useState<any[] | null>(null);
  const [mounted, setMounted] = useState(false);

  const [form] = Form.useForm();

  const districts = useMemo(handleGetLocationData(citiesData), [citiesData]);

  useEffect(() => {
    setMounted(true);
    axiosInstance
      .get("regions")
      .then((data) => setCitiesData(data.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    geolocationHandler(setCurrCoords);
    mapboxHandler(currCoords, setPolygon);
  }, []);

  return (
    <>
      <Wrapper>
        <Title level={4}>Снять недвижимость</Title>
        <Divider />
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          {/*______CATEGORY______*/}
          <Form.Item name={FieldName.CATEGORY} label="Тип жилья">
            <Select options={categoryOptions} allowClear />
          </Form.Item>
          <Divider />
          {/*______TYPE______*/}
          <Form.Item name={FieldName.TYPE} label="Тип услуги">
            <Select options={typeOptions} allowClear />
          </Form.Item>
          <Divider />
          {/*______AUTHOR______*/}
          <Form.Item name={FieldName.AUTHOR} label="Автор">
            <Select options={authorOptions} allowClear />
          </Form.Item>
          <Divider />
          {/*______MIN_PRICE______*/}
          {mounted && (
            <Form.Item
              name={FieldName.MIN_PRICE}
              label="Минимальная стоимость ₽"
            >
              <InputNumber min={1000} max={999_999_999} />
            </Form.Item>
          )}
          <Divider />
          {/*______MAX_PRICE______*/}
          {mounted && (
            <Form.Item
              name={FieldName.MAX_PRICE}
              label="Максимальная стоимость ₽"
            >
              <InputNumber min={1000} max={999_999_999} />
            </Form.Item>
          )}
          <Divider />
          {/*______FEE______*/}
          <Form.Item label="Без комиссии" name={FieldName.FEE}>
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="true">Да</Radio.Button>
              <Radio.Button value="false">Нет</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Divider />
          {/*______IS_AGENT______*/}
          <Form.Item label="Являетесь агентом?" name={FieldName.IS_AGENT}>
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="true">Да</Radio.Button>
              <Radio.Button value="false">Нет</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Divider />
          {/*______LOCATION______*/}
          <Form.Item label="Местоположение" name={FieldName.LOCATION}>
            <TreeSelect
              allowClear
              showSearch
              // treeCheckable={true}
              style={{ width: "100%" }}
              treeData={districts}
              // multiple
              placeholder="Выбрать местоположение"
            />
          </Form.Item>
          <Divider />
          {/*______MAP______*/}
          <Form.Item label="Расстояние до метро, км" name={FieldName.KM_METRO}>
            <MapContainer id="map" />
          </Form.Item>
          <Divider />
          {/*______KM_METRO______*/}
          <Form.Item label="Расстояние до метро, км" name={FieldName.KM_METRO}>
            <Slider range min={0} max={20} />
          </Form.Item>
          <Divider />
          {/*______SUBMIT_BTN______*/}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Отправить
            </Button>
          </Form.Item>
        </Form>
      </Wrapper>
    </>
  );
};

const MapContainer = styled.div`
  height: 300px;
  max-width: 500px;
`;

const Wrapper = styled.div`
  display: flex;
  padding: 5px;
  flex-direction: column;
`;

export default Home;
