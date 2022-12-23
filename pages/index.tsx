import React, { useEffect } from "react";
import Title from "antd/lib/typography/Title";
import { Button, Divider, Form, Input, Radio, Select } from "antd";
import {
  authorOptions,
  categoryOptions,
  typeOptions,
} from "../common/constants";
import styled from "styled-components";

const { Option } = Select;

const Home = () => {
  const [form] = Form.useForm();

  // useEffect(() => {
  //   dispatch(fetchCitiesData());
  // }, []);

  return (
    <>
      <Wrapper>
        <Title level={4}>Снять недвижимость</Title>
        <Divider />
        <Form form={form} layout="vertical" onFinish={(e) => console.log(e)}>
          <Form.Item name="category" label="Тип жилья">
            <Select options={categoryOptions} allowClear />
          </Form.Item>
          <Divider />
          <Form.Item name="type" label="Тип услуги">
            <Select options={typeOptions} allowClear />
          </Form.Item>
          <Divider />
          <Form.Item name="author" label="Автор">
            <Select options={authorOptions} allowClear />
          </Form.Item>
          <Divider />
          <Form.Item label="Стоимость ₽">
            <Input.Group compact>
              <Input
                style={{ width: 100, textAlign: "center" }}
                placeholder="От"
              />
              <Input
                style={{
                  width: 30,
                  borderLeft: 0,
                  borderRight: 0,
                  pointerEvents: "none",
                }}
                placeholder="~"
                disabled
              />
              <Input
                style={{
                  width: 100,
                  textAlign: "center",
                }}
                placeholder="До"
              />
            </Input.Group>
          </Form.Item>
          <Divider />
          <Form.Item label="Без комиссии">
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="true">Да</Radio.Button>
              <Radio.Button value="false">Нет</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Divider />
          <Form.Item label="Являетесь агентом?">
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="true">Да</Radio.Button>
              <Radio.Button value="false">Нет</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Divider />
          <Form.Item label="Расстояние до метро, км">
            <Input.Group compact>
              <Input
                style={{ width: 100, textAlign: "center" }}
                placeholder="От"
              />
              <Input
                style={{
                  width: 30,
                  borderLeft: 0,
                  borderRight: 0,
                  pointerEvents: "none",
                }}
                placeholder="~"
                disabled
              />
              <Input
                style={{
                  width: 100,
                  textAlign: "center",
                }}
                placeholder="До"
              />
            </Input.Group>
          </Form.Item>
          <Divider />
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
