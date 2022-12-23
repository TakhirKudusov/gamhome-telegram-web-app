import React, { useEffect, useMemo, useState } from "react";
import Title from "antd/lib/typography/Title";
import { Button, Divider, Form, Radio, Select, Slider, TreeSelect } from "antd";
import {
  authorOptions,
  categoryOptions,
  typeOptions,
} from "../common/constants";
import styled from "styled-components";
import { FieldName } from "../common/enums";
import { axiosInstance } from "../common/axiosInstance";
import { handleGetLocationData } from "../common/helpers";

const Home = () => {
  const [citiesData, setCitiesData] = useState<any[] | null>(null);

  const [form] = Form.useForm();
  const { SHOW_PARENT } = TreeSelect;

  const districts = useMemo(handleGetLocationData(citiesData), [citiesData]);

  useEffect(() => {
    axiosInstance
      .get("regions")
      .then((data) => setCitiesData(data.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Wrapper>
        <Title level={4}>Снять недвижимость</Title>
        <Divider />
        <Form form={form} layout="vertical" onFinish={(e) => console.log(e)}>
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
          {/*______CATEGORY______*/}
          <Form.Item name={FieldName.PRICE} label="Стоимость ₽">
            <Slider
              range
              min={0}
              max={99_999_999}
              defaultValue={[0, 99_999_999]}
            />
          </Form.Item>
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
          {/*______DISTRICT______*/}
          <Form.Item label="Местоположение" name={FieldName.DISTRICTS}>
            <TreeSelect
              allowClear
              showSearch
              treeCheckable={true}
              showCheckedStrategy={SHOW_PARENT}
              style={{ width: "100%" }}
              treeData={districts}
              multiple
              placeholder="Выбрать местоположение"
            />
          </Form.Item>
          <Divider />
          {/*______KM_METRO______*/}
          <Form.Item label="Расстояние до метро, км" name={FieldName.KM_METRO}>
            <Slider range min={0} max={50} defaultValue={[0, 50]} />
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

const Wrapper = styled.div`
  display: flex;
  padding: 5px;
  flex-direction: column;
`;

export default Home;
