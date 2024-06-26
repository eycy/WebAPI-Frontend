import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, Row, Col, Modal, Input, message, Space, Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import { dogAPI } from "../commons/http-commons";

const { Title, Text } = Typography;

const DetailDogs = ({ dogs, isLoggedIn, isStaff, credentials }) => {
  const { aid } = useParams();
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [adoptionMessage, setAdoptionMessage] = useState('');
  const [adoptingDog, setAdoptingDog] = useState(null);
  const [userAdoptions, setUserAdoptions] = useState([]);
  // const [breedName, setBreedName] = useState('');

  useEffect(() => {
    // Fetch the dog based on the provided ID
    fetch(`${dogAPI.url}/api/v1/dogs/${aid}`)
      .then(response => response.json())
      .then(data => {
        setAdoptingDog(data);
      })
      .catch(error => console.error(error));

    // Fetch the user's adoptions
    getUserAdoption();
  }, [aid, credentials]);

  // useEffect(() => {
  //   if (adoptingDog) {
  //     fetchBreedInfo();
  //   }
  // }, [adoptingDog]);

  // Fetch the breed information
  // const fetchBreedInfo = async () => {
  //   try {
  //     console.log('fetch breed info');
  //     const response = await fetch(`${dogAPI.url}/api/v1/dogs/breeds`, {
  //       method: 'GET'
  //     });
  //     console.log('1');
  //     const data = await response.json();
  //     console.log('2');
  //     console.log(adoptingDog);
  //     const bName = data.find(breed => breed.id === adoptingDog?.breed_id)?.name || '';
  //     console.log(bName);
  //     setBreedName(bName);
  //     console.log('3');
  //   } catch (error) {
  //     console.error('Error fetching breed information:', error);
  //   }
  // }

  const getUserAdoption = async () => {
    // Fetch the user's adoptions
    console.log('get adoption');
    fetch(`${dogAPI.url}/api/v1/users/getAdoptions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${credentials}`
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.result.success) {
          setUserAdoptions(data.result.messages);
        } else {
          message.error('Failed to fetch user adoptions.');
        }
      })
      .catch(error => console.error(error));
  }

  const handleAdopt = (dog) => {
    setAdoptingDog(dog);
    setModalVisible(true);
  };

  const handleModalSubmit = async () => {
    try {
      const response = await fetch(`${dogAPI.url}/api/v1/users/submitAdoption`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${credentials}`
        },
        body: JSON.stringify({
          dogid: adoptingDog.id,
          message: adoptionMessage,
        }),
      });

      if (response.ok) {
        message.success('Adoption request is sent successfully.');
        // Disable the adopt button after successful submission
        setAdoptingDog({ ...adoptingDog, requested: true });
        setAdoptionMessage('');
        getUserAdoption();
      } else {
        message.error('Failed to send adoption request.');
      }

      setModalVisible(false);
    } catch (error) {
      console.error(error);
      message.error('An error occurred while sending the adoption request.');
    }
  };

  const handleModalCancel = () => {
    // Close the modal without submitting
    setModalVisible(false);
    setAdoptionMessage('');
  };

  const isDogAdopted = () => {
    const dogAdoption = userAdoptions.find(adoption => adoption.dogid === adoptingDog.id);
    return dogAdoption !== undefined;
  };

  for (const dog of dogs) {
    if (dog.id == +aid) {
      console.log(dog);
      const { name, breedname, location, description, dob } = dog;

      const items: DescriptionsProps['items'] = [
        {
          key: '1',
          label: 'Name',
          children: name,
        },
        {
          key: '2',
          label: 'Breed',
          children: breedname,
        },
        {
          key: '3',
          label: 'Location',
          children: location,
        },
        {
          key: '4',
          label: 'Date of Birthday',
          children: dob,
        },
        {
          key: '5',
          label: 'Description',
          span: 2,
          children: description,
        }
      ];

      return (
        <>
          <div style={{ margin: '20px' }}>
            <Row>
              <Col span={12}>
                <Descriptions title="Dog Details" layout="vertical" bordered items={items} />
              </Col>
              <Col span={12}>
                <img
                  alt="Dog Photo"
                  src={`${dogAPI.url}/api/v1/dogs/photos?name=${dog.new_filename}`}
                  style={{ width: 250, height: 'fit-content' }}
                />
              </Col>
            </Row>
          </div>
          <Space>
            {isLoggedIn && !isStaff && (
              <Button onClick={handleAdopt} disabled={isDogAdopted()}>
                I want to adopt!
              </Button>
            )}
            <Button onClick={() => navigate(-1)} icon={<RollbackOutlined />}>
              Go Back
            </Button>
          </Space>
          <Modal
            title={`Leave us a message for your adoption`}
            visible={modalVisible}
            onOk={handleModalSubmit}
            onCancel={handleModalCancel}
          >
            <Input.TextArea
              rows={4}
              placeholder="Enter your message"
              value={adoptionMessage}
              onChange={(e) => setAdoptionMessage(e.target.value)}
            />
          </Modal>
        </>
      );
    }
  }
};

export default DetailDogs;