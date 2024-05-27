import React, { useState, useEffect } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  Row,
  Col,
  message,
  Image,
} from 'antd';
import { dogAPI } from '../commons/http-commons';

const { Option } = Select;

type SizeType = Parameters<typeof Form>[0]['size'];

const AdvanceSearchPanel = ({ onAdvSearch, isAdvanceSearchOpen }) => {
  const [form] = Form.useForm(); // Create the form instance
  const [breeds, setBreeds] = useState([]);
  const { TextArea } = Input;
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
  const [selectedBreed, setSelectedBreed] = useState('');
  const [breedImageUrl, setBreedImageUrl] = useState('');

  const initialValues = {
    size: componentSize,
  };

  const onFinish = (values) => {
    // Format the date of birth
    const dob = values.dob ? values.dob.format('YYYY-MM-DD') : '';

    // Modify the values object to include the formatted date of birth
    const updatedValues = {
      ...values,
      dob,
    };

    // Call the onAdvSearch function with the updated values
    onAdvSearch(updatedValues);
  };

  const handleBreedSelect = async (value) => {
    setSelectedBreed(value);

    try {
      let breedParts = value.split(' ');
      let breedUrl = '';

      if (breedParts.length === 1) {
        breedUrl = `https://dog.ceo/api/breed/${value.toLowerCase()}/images/random`;
      } else {
        breedUrl = `https://dog.ceo/api/breed/${breedParts[1].toLowerCase()}/${breedParts[0].toLowerCase()}/images/random`;
      }

      const response = await fetch(breedUrl);
      const data = await response.json();
      setBreedImageUrl(data.message);
    } catch (error) {
      console.error('Error fetching breed image:', error);
      message.error('Failed to fetch breed image.');
    }
  };

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch(`${dogAPI.url}/api/v1/dogs/breeds`);
        const data = await response.json();
        setBreeds(data);
      } catch (error) {
        console.error('Error fetching breeds:', error);
        message.error('Failed to fetch breeds.');
      }
    };

    fetchBreeds();
  }, []);

  return (
    <>
      {isAdvanceSearchOpen && (
        <Row gutter={24}>
          <Col span={16}>
            <Form
              labelCol={{ span: 6 }}
              labelAlign="right"
              wrapperCol={{ span: 18 }}
              layout="horizontal"
              initialValues={initialValues}
              onValuesChange={() => { }}
              size={componentSize as SizeType}
              style={{ padding: '10px', maxWidth: 1000, marginTop: '20px' }}
              form={form}
              onFinish={onFinish}
            >
              <Row gutter={24}>
                <Col span={9}>
                  <Form.Item label="Name" name="name">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Location" name="location">
                    <Select>
                      <Select.Option value="Aberdeen">Aberdeen</Select.Option>
                      <Select.Option value="Jordan">Jordan</Select.Option>
                      <Select.Option value="Shatin">Shatin</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item label="Breed" name="breed_id">
                    <Select value={selectedBreed} onChange={handleBreedSelect}>
                      <Select.Option value="">Select a breed</Select.Option>
                      {breeds.map((breed) => (
                        <Select.Option key={breed.id} value={breed.name}>
                          {breed.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={9} align="left">
                  <Form.Item label="Date of Birth" name="dob">
                    <DatePicker />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Description" name="description">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <div style={{ marginLeft: '20px', align: 'left' }}>
                <Space>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                  <Button htmlType="button" onClick={() => form.resetFields()}>
                    Reset
                  </Button>
                </Space>
              </div>
            </Form>
          </Col>
          <Col span={8} align="left">
            {breedImageUrl && (
              <div>
                Breed Sample:
                <Image
                  src={breedImageUrl}
                  alt={selectedBreed}
                  width={150}
                  height={150}
                  style={{
                    marginBottom: '20px',
                    objectFit: 'contain',
                    marginLeft: '20px',
                    align: 'left'
                  }}
                />
              </div>
            )}
          </Col>
        </Row>
      )}
    </>
  );
};

export default AdvanceSearchPanel;