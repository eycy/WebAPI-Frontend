import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import dogs from './dogs.json';
import { Button } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';

const DetailDogs = ({ dogs }) => {
  const { aid } = useParams();
  const navigate = useNavigate();

  for (const dog of dogs) {
    if (dog.id == +aid) {
      return (
        <>
          <h1>{dog.name}</h1>
          <h1>{dog.description}</h1>
          <Button onClick={() => navigate(-1)} icon={<RollbackOutlined />}></Button>
        </>
      )
    }
  }

}

export default DetailDogs;