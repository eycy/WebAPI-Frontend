import React from 'react';
import { Divider } from 'antd';

import Dogs from './Dogs';
import MainTitle from './MainTitle';

const Home = ({ credentials, isLoggedIn, dogs, setDogs }) => {
  return (
    <>
      <MainTitle />
      <Divider plain>Dogs Availble for Adoption</Divider>
      <Dogs credentials={credentials} isLoggedIn={isLoggedIn} dogs={dogs} setDogs={setDogs} />
    </>
  )
}

export default Home;