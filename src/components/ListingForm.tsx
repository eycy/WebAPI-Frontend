import React, { useState, useEffect } from 'react';
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
  Image,
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
  // const [breeds, setBreeds] = useState([]);
  const [breeds, setBreeds] = useState<{ id: number; name: string }[]>([]);
  const [breedImage, setBreedImage] = useState('');
  const { selectedDog } = useContext(DogContext);
  const [initialValues, setInitialValues] = useState({
    name: selectedDog?.name || '',
    breed: '', // Initialize with empty string
    breed_id: selectedDog?.breed_id || '',
    location: selectedDog?.location || '',
    dob: selectedDog?.dob ? moment(selectedDog.dob) : null,
    description: selectedDog?.description || '',
    authorID: selectedDog?.authorid || '',
    size: componentSize
  });

  const fetchBreeds = async () => {
    console.log('fetchBreeds');
    try {
      const response = await fetch(`${dogAPI.url}/api/v1/dogs/breeds`);
      const data = await response.json();
      setBreeds(data);

      // Find the selected breed name
      const selectedBreed = data.find((breed) => breed.id === selectedDog?.breed_id);
      console.log(selectedBreed);
      const selectedBreedName = selectedBreed?.name || '';
      console.log(selectedBreedName);

      // Update the initialValues object with the breed name
      form.setFieldValue('breed_id', selectedBreed.id);
    } catch (error) {
      console.error('Error fetching breeds:', error);
    }
  };

  useEffect(() => {
    console.log('useEffect []');
    fetchBreeds();
  }, []);


  const handleBreedChange = (value) => {
    console.log('handleBreedChange');
    form.setFieldValue('breed_id', value);
    fetchBreedImage(value);
  };

  const fetchBreedImage = async (breedId) => {
    console.log('fetchBreedImage');
    try {
      const selectedBreed = breeds.find((breed) => breed.id === breedId);
      if (selectedBreed) {

        let breedParts = selectedBreed.name.split(' ');
        let breedUrl = '';

        if (breedParts.length === 1) {
          breedUrl = `https://dog.ceo/api/breed/${selectedBreed.name.toLowerCase()}/images/random`;
        } else {
          breedUrl = `https://dog.ceo/api/breed/${breedParts[1].toLowerCase()}/${breedParts[0].toLowerCase()}/images/random`;
        }
        const response = await fetch(breedUrl);
        const data = await response.json();
        if (data.status === 'success') {
          setBreedImage(data.message);
        } else {
          console.error('Error fetching breed image:', data.message);
        }
      }
    } catch (error) {
      console.error('Error fetching breed image:', error);
    }
  };

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const handleSubmit = async (values) => {
    console.log('Received values of form: ', values);
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
      body: JSON.stringify({ ...values })
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
              labelCol={{ span: 6 }}
              labelAlign="right"
              wrapperCol={{ span: 18 }}
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
                <Select onChange={handleBreedChange}>
                  {breeds.map((breed) => (
                    <Select.Option key={breed.id} value={breed.id}>
                      {breed.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              {breedImage && (
                <div>
                  <Space>
                    Sample of this breed:
                    <Image
                      src={breedImage}
                      alt={form.getFieldValue('breed_id')}
                      width={150}
                      height={150}
                      style={{
                        objectFit: 'contain',
                      }}
                    />
                  </Space>
                </div>
              )}
              <Form.Item label="Location" name="location" style={{ textAlign: 'left' }} >
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