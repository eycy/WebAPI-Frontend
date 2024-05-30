import { useState, useContext, useEffect } from 'react';
import { Card, Button, Modal, message, Upload } from "antd";
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, InfoCircleOutlined, UploadOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import DogContext from '../contexts/DogContext';
import { dogAPI } from "../commons/http-commons";

const { Meta } = Card

const Dog = (props) => {

  const dog = props.dog;

  const [modalVisible, setModalVisible] = useState(false);
  const [modalUploadVisible, setUploadModalVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const { setSelectedDog } = useContext(DogContext);
  const [isFavorite, setIsFavorite] = useState(props.favoriteDogIds.includes(dog.id));

  useEffect(() => {
    if (props.favoriteDogIds.includes(dog.id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [props.favoriteDogIds]);

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
          'Authorization': `${props.credentials}`
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json(); // Parse the JSON response
        const { newFileName } = responseData; // Extract the newFileName value
        dog.new_filename = newFileName;
        message.success('Photo uploaded successfully.');
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


  const toggleFavorite = async () => {
    try {
      let response;
      let msgSuccess = 'Added to favorites.';
      let msgFail = 'Failed to add to favorites';
      setIsFavorite(!isFavorite);
      if (!props.favoriteDogIds.includes(dog.id)) {
        response = await fetch(`${dogAPI.url}/api/v1/users/addFavorite`, {
          method: 'POST',
          headers: {
            'Authorization': `${props.credentials}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            dogid: dog.id
          }),
        });
      } else {
        response = await fetch(`${dogAPI.url}/api/v1/users/removeFavorite`, {
          method: 'POST',
          headers: {
            'Authorization': `${props.credentials}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            dogid: dog.id
          }),
        });
        msgSuccess = 'Removed from favorites.';
        msgFail = 'Failed to remove from favorites';
      }

      if (response.ok) {
        props.fetchFavorites();
        message.success(msgSuccess);
      } else {
        setIsFavorite(!isFavorite);
        message.error(msgFail);
      }
    } catch (error) {
      message.error('Error occurred updating favorites');
    }
  };

  if (dog.new_filename == null)
    dog.new_filename = 'Photo_Not_Available.jpg'

  return (
    <>
      <Card
        hoverable
        style={{ width: 250, height: 'fit-content' }}
        cover={
          <Link to={`/a/${props.href}`}>
            <img
              alt="Dog Photo"
              src={`${dogAPI.url}/api/v1/dogs/photos?name=${dog.new_filename}`}
              style={{
                width: '100%',
              }}
            />
          </Link>
        }
        actions={
          props.isLoggedIn && props.isStaff ? ( // Condition 1: Staff
            [
              <Link to={`/a/${props.href}`}><InfoCircleOutlined key="detail" /></Link>,
              <Link to="/listingForm" onClick={handleEdit}><EditOutlined key="edit" /></Link>,
              <UploadOutlined key="uploadPhoto" onClick={() => setUploadModalVisible(true)} />,
              <DeleteOutlined key="delete" onClick={() => setModalVisible(true)} />
            ]
          ) : props.isLoggedIn && isFavorite ? ( // Condition 2a: public user + fav
            [
              <Link to={`/a/${props.href}`}><InfoCircleOutlined key="detail" /></Link>,
              <HeartFilled key="fav" onClick={toggleFavorite} />
            ]
          ) : props.isLoggedIn && !isFavorite ? ( // Condition 2b: public user + not fav
            [
              <Link to={`/a/${props.href}`}><InfoCircleOutlined key="detail" /></Link>,
              <HeartOutlined key="notFav" onClick={toggleFavorite} />
            ]
          ) : ( // Condition 3: not logged in
            <></>
            // [
            //   <Link to={`/a/${props.href}`}><InfoCircleOutlined key="detail" /></Link>
            // ]
          )
        }
      >
        <Meta name={props.name} title={props.name} description={props.dog.description} />
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