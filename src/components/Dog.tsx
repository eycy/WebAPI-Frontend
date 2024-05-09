import { useState, useContext } from 'react';
import { Card, Button, Modal, message, Upload } from "antd";
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, InfoCircleOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import DogContext from '../contexts/DogContext';
import { dogAPI } from "../commons/http-commons";

const { Meta } = Card

const Dog = (props) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalUploadVisible, setUploadModalVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const { setSelectedDog } = useContext(DogContext);

  const dog = props.dog;

  const handleEdit = () => {
    setSelectedDog(dog);
    props.setIsEditMode(true);
  }

  const handleUploadPhoto = async () => {
    const formData = new FormData();
    formData.append('photo', selectedPhoto);

    try {
      const response = await fetch(`${dogAPI.url}/api/v1/dogs/${dog.id}/upload-photo`, {
        method: 'PUT',
        headers: {
          'Authorization': `Basic ${props.credentials}`
        },
        body: formData,
      });

      if (response.ok) {
        message.success('Photo uploaded successfully.');
        // Refresh the dog data or update the photo URL
      } else {
        // Failed to upload photo
        message.error('Photo uploaded failed');
      }
    } catch (error) {
      message.error('Photo uploaded Error');
    } finally {
      setUploadModalVisible(false);
    }
  };

  return (
    <>
      <Card
        style={{ width: 300 }}
        cover={<img alt="example" src="https://dummyimage.com/medrect" />}
        actions={props.isLoggedIn ? ([
          <Link to={`/a/${props.href}`}><InfoCircleOutlined key="detail" /></Link>,
          <Link
            to="/listingForm"
            onClick={handleEdit}
          >
            <EditOutlined key="edit" />
          </Link>,

          <Link
            onClick={() => setUploadModalVisible(true)}
          >
            <UploadOutlined key="upload" />
          </Link>,
          <DeleteOutlined key="delete" onClick={() => setModalVisible(true)} />
        ]) : ([
          <Link to={`/a/${props.href}`}><InfoCircleOutlined key="detail" /></Link>
        ])}
      >
        <Meta name={props.name} description={props.name} />
      </Card>

      <Modal
        title="Confirmation"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>Cancel</Button>,
          <Button key="delete" type="primary" danger onClick={props.handleDelete}>Delete</Button>
        ]}
      >
        <p>Are you sure you want to delete this dog?</p>
      </Modal>

      <Modal
        title="Upload Photo"
        visible={modalUploadVisible}
        onCancel={() => setUploadModalVisible(false)}
        onOk={handleUploadPhoto}
      >

        {/* Add file input to allow the user to select a photo */}
        <input type="file" onChange={(e) => setSelectedPhoto(e.target.files[0])} />
      </Modal>

    </>
  )
}



export default Dog;