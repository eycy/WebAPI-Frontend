import React, { useState } from 'react';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Select,
  Space,
  Switch,
  TreeSelect,
} from 'antd';

import { Typography } from 'antd';

import { useNavigate } from 'react-router-dom';

import { articleAPI } from "../commons/http-commons";


const { Title, Text } = Typography;

type SizeType = Parameters<typeof Form>[0]['size'];

const ListingForm = ({ credentials, isLoggedIn }) => {

  const navigate = useNavigate();
  const [form] = Form.useForm(); // Create the form instance
  const { TextArea } = Input;
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const handleSubmit = async (values) => {
    console.log('Received values of form: ', values);

    // Convert userId to integer
    const authorID = parseInt(values.authorID, 10);

    // Perform the login request to the server
    const response = await fetch(`${articleAPI.url}/api/v1/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`
      },
      body: JSON.stringify({ ...values, authorID })
    });


    if (response.ok) {
      console.log(response.data);

      message.success('Listing is added successfully.');

      console.log("before reset");
      console.log(form);
      form.resetFields();
      console.log("after reset");
    } else {
      message.error('Failed to add listing.');
    }

  };


  const onReset = () => {
    form.resetFields();
  };


  return (
    <>
      {isLoggedIn ? (
        <div style={{ textAlign: 'left', marginLeft: '20px' }}>
          <Title>Create New Listing</Title>
          <Form
            labelCol={{ span: 4 }}
            labelAlign="right"
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            initialValues={{ size: componentSize }}
            onValuesChange={onFormLayoutChange}
            size={componentSize as SizeType}
            style={{ maxWidth: 600, marginTop: '20px' }}
            form={form}
            onFinish={handleSubmit}
          >
            <Form.Item label="Name" name="title">
              <Input />
            </Form.Item>
            <Form.Item label="Breed" name="allText">
              <Select>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Date of Birth" >
              <DatePicker />
            </Form.Item>
            <Form.Item label="Description" >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Author ID" name="authorID">
              <Input />
            </Form.Item>
            <div style={{ marginLeft: '20px' }}>
              <Space>
                <Button type="primary" htmlType="submit">Submit</Button>
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
                <Button htmlType="button" onClick={() => navigate(-1)}>Cancel</Button>
              </Space>
            </div>
          </Form>
        </div>
      ) : <div>Access denied. Please login.</div>}
    </>
  );
}

export default ListingForm;