import React, { useEffect, useMemo, useState } from "react";
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
import {
  handleFormatData,
  handleFormatDistrictsData,
  handleFormatMetrosData,
  handleFormSubmit,
  handleGetData,
} from "../common/helpers";
import {
  geolocationHandler,
  mapboxHandler,
} from "../common/geolocation.helper";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<"error" | undefined>();

  const [polygon, setPolygon] = useState<[number, number][] | null>(null);
  const [currCoords, setCurrCoords] = useState<[number, number]>([
    37.61556, 55.75222,
  ]);
  const [citiesData, setCitiesData] = useState<any[] | null>(null);
  const [mounted, setMounted] = useState(false);

  const [currCity, setCurrCity] = useState<string | null | undefined>(null);

  const [cityDisabled, setCityDisabled] = useState<boolean>(false);
  const [districtsDisabled, setDistrictsDisabled] = useState<boolean>(true);
  const [metrosDisabled, setMetrosDisabled] = useState<boolean>(true);

  const [form] = Form.useForm();

  const handleFormChange = (value: any) => {
    if (value.city || !form.getFieldsValue().city) {
      form.setFieldValue(FieldName.DISTRICTS, []);
      form.setFieldValue(FieldName.METROS, []);
    }
  };

  const handleChangeCity = (value: string) => {
    setCurrCity(value);
  };

  const cities = useMemo(handleFormatData(citiesData, "cities"), [citiesData]);

  const districts = useMemo(
    handleGetData(
      citiesData,
      currCity,
      setDistrictsDisabled,
      "districts",
      handleFormatDistrictsData
    ),
    [currCity]
  );

  const metros = useMemo(
    handleGetData(
      citiesData,
      currCity,
      setMetrosDisabled,
      "metroLines",
      handleFormatMetrosData
    ),
    [currCity]
  );

  useEffect(() => {
    setLoading(true);
    setCityDisabled(true);
    geolocationHandler(setCurrCoords);
    mapboxHandler(currCoords, setPolygon);
    setMounted(true);
    axiosInstance
      .get("regions")
      .then((data) => {
        setCitiesData(data.data);
        setLoading(false);
        setCityDisabled(false);
      })
      .catch((error) => {
        setCityDisabled(false);
        setLoading(false);
        setStatus("error");
        console.error(error);
      });
  }, []);

  return (
    <>
      <Wrapper>
        <Title level={4}>Снять недвижимость</Title>
        <Divider />
        <Form
          onValuesChange={handleFormChange}
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
        >
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
          {/*______CITIES______*/}
          <Form.Item label="Город" name={FieldName.CITY}>
            <TreeSelect
              allowClear
              showSearch
              style={{ width: "100%" }}
              treeData={cities}
              placeholder="Выбрать город"
              treeDefaultExpandAll
              onChange={handleChangeCity}
              loading={loading}
              status={status}
              disabled={cityDisabled}
            />
          </Form.Item>
          <Divider />
          {/*______DISTRICTS______*/}
          <Form.Item label="Районы" name={FieldName.DISTRICTS}>
            <Select
              allowClear
              showSearch
              style={{ width: "100%" }}
              disabled={districtsDisabled}
              options={districts}
              mode="multiple"
              placeholder="Выбрать район"
            />
          </Form.Item>
          <Divider />
          {/*______METROS______*/}
          <Form.Item label="Метро" name={FieldName.METROS}>
            <TreeSelect
              allowClear
              showSearch
              style={{ width: "100%" }}
              disabled={metrosDisabled}
              placeholder="Выбрать метро"
              treeDefaultExpandAll
              treeData={metros}
              treeCheckable
            />
          </Form.Item>
          <Divider />
          {/*______MAP______*/}
          <Form.Item label="Местоположение на карте">
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
