import React, { useState } from 'react';
import { Flex, Input, Row, Col } from "antd";
import Dog from "./Dog";
import SearchBar from "./SearchBar";
import { dogAPI } from "../commons/http-commons";
import axios from "axios";


const { Search } = Input;

const Dogs = ({ credentials, isLoggedIn, dogs, setDogs, setIsEditMode }) => {
  const [loading, setLoading] = useState(false); // Add loading state variable

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${dogAPI.url}/api/v1/dogs/${id}`, {
        headers: {
          'Authorization': `Basic ${credentials}`
        }
      });
      // Remove the deleted dog from the dogs array
      const updatedDogs = dogs.filter((dog) => dog.id !== id);
      setDogs(updatedDogs);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };


  React.useEffect(() => {
    axios.get(`${dogAPI.url}/api/v1/dogs`, {
      headers: {
        'Authorization': `Basic ${credentials}`
      }
    })

      .then((res) => {
        setDogs(res.data)
      })
  }, [])

  if (!dogs || loading) {
    return (<div>Loading...</div>)
  } else {

    return (
      <>
        <SearchBar setLoading={setLoading} setDogs={setDogs} isLoggedIn={isLoggedIn} />
        {(dogs.length === 0) ? (
          <div>No dogs found.</div>
        ) : (
          <Row justify="center" gutter={[16, 16]}>
            <Col span={24}>
              <Flex justify="space-evenly" wrap="wrap" gap="middle">
                {dogs.map((dog) => (
                  <Dog
                    dog={dog}
                    name={dog.name}
                    key={dog.id}
                    href={dog.id}
                    handleDelete={() => handleDelete(dog.id)}
                    setIsEditMode={setIsEditMode}
                    isLoggedIn={isLoggedIn}
                    credentials={credentials}
                  />
                ))}
              </Flex>
            </Col>
          </Row>
        )}
      </>
    )
  }
}

export default Dogs;