import React from 'react';
import { Divider } from 'antd';

import Dogs from './Dogs';
import MainTitle from './MainTitle';

const Home = ({ credentials, isLoggedIn, isStaff, dogs, setDogs, setIsEditMode }) => {
  return (
    <>
      <MainTitle />
      <Divider plain>Dogs Available for Adoption</Divider>
      <Dogs credentials={credentials} isLoggedIn={isLoggedIn} isStaff={isStaff} dogs={dogs} setDogs={setDogs} setIsEditMode={setIsEditMode} />
    </>
  )
}

export default Home;