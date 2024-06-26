import React, { useState, useEffect } from 'react';
import { Flex, Input, Row, Col } from "antd";
import Dog from "./Dog";
import SearchBar from "./SearchBar";
import { dogAPI } from "../commons/http-commons";
import axios from "axios";


const { Search } = Input;

const Dogs = ({ credentials, isLoggedIn, isStaff, dogs, setDogs, setIsEditMode }) => {
  const [loading, setLoading] = useState(false);
  const [favoriteDogIds, setFavoriteDogIds] = useState([]);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(`${dogAPI.url}/api/v1/users/favorites`, {
        headers: {
          'Authorization': `${credentials}`
        }
      });

      if (response.status === 200) {
        const { dogIds } = response.data;
        setFavoriteDogIds(dogIds);
      } else {
        // Handle the response error
      }
    } catch (error) {
      // Handle the fetch error
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [credentials]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${dogAPI.url}/api/v1/dogs/${id}`, {
        headers: {
          'Authorization': `${credentials}`
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
        'Authorization': `${credentials}`
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
        <SearchBar setLoading={setLoading} setDogs={setDogs} isLoggedIn={isLoggedIn} isStaff={isStaff} setIsEditMode={setIsEditMode} />
        {(dogs.length === 0) ? (
          <div>No dogs found.</div>
        ) : (
          <Row justify="center" gutter={[16, 16]}>
            <Col span={24}>
              <Flex justify="space-evenly" wrap="wrap" gap="middle">
                {dogs.sort((a, b) => b.id - a.id).map((dog) => (
                  <Dog
                    dog={dog}
                    name={dog.name}
                    key={dog.id}
                    href={dog.id}
                    image={dog.new_filename}
                    handleDelete={() => handleDelete(dog.id)}
                    setIsEditMode={setIsEditMode}
                    isLoggedIn={isLoggedIn}
                    isStaff={isStaff}
                    credentials={credentials}
                    favoriteDogIds={favoriteDogIds}
                    fetchFavorites={fetchFavorites}
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