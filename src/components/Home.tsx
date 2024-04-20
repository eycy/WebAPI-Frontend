import React from 'react';
import { Divider } from 'antd';

import Articles from './Articles';
import MainTitle from './MainTitle';

const Home = () => {
  return (
    <>
      <MainTitle />
      <Divider plain>Articles</Divider>
      <Articles />
    </>
  )
}

export default Home;