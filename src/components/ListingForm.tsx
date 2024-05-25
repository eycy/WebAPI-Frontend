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
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { dogAPI } from "../commons/http-commons";
import { useContext } from 'react';
import DogContext from '../contexts/DogContext';

const { Title, Text } = Typography;

type SizeType = Parameters<typeof Form>[0]['size'];

const ListingForm = ({ credentials, isLoggedIn, isEditMode }) => {

  const navigate = useNavigate();
  const [form] = Form.useForm(); // Create the form instance
  const { TextArea } = Input;
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
  const { selectedDog } = useContext(DogContext);

  const initialValues = {
    name: selectedDog?.name || '',
    breed_id: selectedDog?.breed_id || '',
    location: selectedDog?.location || '',
    dob: selectedDog?.dob ? moment(selectedDog.dob) : null,
    description: selectedDog?.description || '',
    authorID: selectedDog?.authorid || '',
    size: componentSize
  };

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const handleSubmit = async (values) => {
    console.log('Received values of form: ', values);

    // Convert authorID to integer
    const authorID = parseInt(values.authorID, 10);

    let method = 'POST'
    let url = `${dogAPI.url}/api/v1/dogs`
    if (isEditMode) {
      method = 'PUT';
      url = `${dogAPI.url}/api/v1/dogs/${selectedDog.id}`
    }

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${credentials}`
      },
      body: JSON.stringify({ ...values, authorID })
    });


    if (response.ok) {
      if (isEditMode) {
        message.success('Listing is updated successfully.');
        navigate(-1);
      } else {
        message.success('Listing is added successfully.');
        form.resetFields();
      }
    } else {
      if (isEditMode) {
        message.error('Failed to update listing.');
      } else {
        message.error('Failed to add listing.');

      }
    }

  };


  const onReset = () => {
    form.resetFields();
  };


  return (
    <>
      {isLoggedIn ? (

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '50%' }}>
            {isEditMode ? (<Title>Edit Listing</Title>) : (<Title>Create New Listing</Title>)}
            <Form
              labelCol={{ span: 4 }}
              labelAlign="right"
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              initialValues={initialValues}
              onValuesChange={onFormLayoutChange}
              size={componentSize as SizeType}
              style={{ maxWidth: 600, marginTop: '20px' }}
              form={form}
              onFinish={handleSubmit}
            >
              <Form.Item label="Name" name="name">
                <Input />
              </Form.Item>
              <Form.Item label="Breed" name="breed_id" style={{ textAlign: 'left' }}>
                <Select>
                  <Select.Option value={1}>Akita</Select.Option>
                  <Select.Option value={2}>Bouvier</Select.Option>
                  <Select.Option value={3}>Dachshund</Select.Option>
                  <Select.Option value={4}>German Shepherd</Select.Option>
                  <Select.Option value={5}>Otterhound</Select.Option>
                  <Select.Option value={6}>Terrier</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Location" name="location" >
                <Select >
                  <Select.Option value="Aberdeen">Aberdeen</Select.Option>
                  <Select.Option value="Jordan">Jordan</Select.Option>
                  <Select.Option value="Shatin">Shatin</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Date of Birth" name="dob" style={{ textAlign: 'left' }} >
                <DatePicker />
              </Form.Item>
              <Form.Item label="Description" name="description">
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
        </div>
      ) : <div>Access denied. Please login.</div>}
    </>
  );
}

export default ListingForm;