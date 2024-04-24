import React from 'react';
import { Divider } from 'antd';

import Articles from './Articles';
import MainTitle from './MainTitle';

const Home = ({credentials, isLoggedIn}) => {
  return (
    <>
      <MainTitle />
      <Divider plain>Articles</Divider>
      <Articles  credentials={credentials} isLoggedIn={isLoggedIn}/>
    </>
  )
}

export default Home;