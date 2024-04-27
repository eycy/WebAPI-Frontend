import React from 'react';
import { Flex, Button } from "antd";
import Dog from "./Dog";
// import dogs from "./dogs.json";
// import { Link } from "react-router-dom";
import { blogAPI } from "../commons/http-commons";
import { filmAPI } from "../commons/http-commons";
import { dogAPI } from "../commons/http-commons";
import axios from "axios";

const Dogs = ({ credentials, isLoggedIn, dogs, setDogs, setIsEditMode }) => {


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

  if (!dogs) {
    return (<div>loading...</div>)
  } else {

    return (
      <>


        <Flex justify="space-evenly" wrap="wrap" gap="middle">
          {
            dogs &&
            dogs.map((dog) => (
              <>
                <Dog
                  isLoggedIn={isLoggedIn}
                  dog={dog}
                  name={dog.name}
                  key={dog.id}
                  href={dog.id}
                  handleDelete={() => handleDelete(dog.id)}
                  setIsEditMode={setIsEditMode}
                />
              </>
            ))
          }
        </Flex>
      </>
    )
  }
}

export default Dogs;