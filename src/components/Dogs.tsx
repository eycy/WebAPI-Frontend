import React from 'react';
import { Flex, Button } from "antd";
import Dog from "./Dog";
// import dogs from "./dogs.json";
// import { Link } from "react-router-dom";
import { blogAPI } from "../commons/http-commons";
import { filmAPI } from "../commons/http-commons";
import { dogAPI } from "../commons/http-commons";
import axios from "axios";

const Dogs = ({ credentials, isLoggedIn, dogs, setDogs }) => {

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
            dogs.map(({ id, name, description }) => (
              <>
                <Dog isLoggedIn={isLoggedIn} name={name} key={id} href={id}>{description}</Dog>
              </>
            ))
          }
        </Flex>
      </>
    )
  }
}

export default Dogs;