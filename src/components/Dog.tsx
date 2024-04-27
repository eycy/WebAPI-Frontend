import { useState, useContext } from 'react';
import { Card, Button, Modal } from "antd";
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, InfoCircleOutlined, SettingOutlined } from '@ant-design/icons';
import DogContext from '../contexts/DogContext';

const { Meta } = Card

const Dog = (props) => {

  const [modalVisible, setModalVisible] = useState(false);
  const { setSelectedDog } = useContext(DogContext);

  const dog = props.dog;

  const handleEdit = () => {
    setSelectedDog(dog);
    props.setIsEditMode(true);
  }

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

    </>
  )
}



export default Dog;