

//import './App.css'
// import React from 'react'
import { useState } from 'react';
import { Layout, Divider, Typography, FloatButton, Space, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import Dogs from './components/Dogs';
import MainTitle from './components/MainTitle';
import DetailDogs from './components/DetailDogs';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Copyright from './components/Copyright';
import LoginForm from './components/LoginForm';
import ListingForm from './components/ListingForm';
import Error from './components/Error';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import DogContext from './contexts/DogContext';

const { Header, Footer, Content } = Layout;
const { Text } = Typography;


const App = () => {
  // const [isShow, setIsShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [dogs, setDogs] = useState(null);
  const [selectedDog, setSelectedDog] = useState(null);
  // const [user, setUser] = useState(null);

  const [credentials, setCredentials] = useState("");


  return (
    <Router>
      <Layout >
        <Header title='Blog' style={{ width: '100%', zIndex: 1, position: 'sticky', top: 0 }}>
          <Space>
            <Link to='/'>Home</Link>
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/about'>About</Link>
            <LoginForm setCredentials={setCredentials} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
          </Space>
        </Header>
        <Content style={{ textAlign: 'center' }}>
          <DogContext.Provider value={{ selectedDog, setSelectedDog }}>
            <Routes>
              <Route index element={<Home credentials={credentials} isLoggedIn={isLoggedIn} dogs={dogs} setDogs={setDogs} setIsEditMode={setIsEditMode}/>} />
              <Route path='/listingForm' element={<ListingForm credentials={credentials} isLoggedIn={isLoggedIn} isEditMode={isEditMode}/>} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/about' element={<About />} />
              <Route path='/a/:aid' element={<DetailDogs dogs={dogs} />} />
              <Route path='*' element={<Error />} />
            </Routes>
          </DogContext.Provider>
        </Content>
        <Footer>
          <Copyright />
        </Footer>
        <FloatButton.BackTop />
      </Layout>

    </Router>
  )
}

export default App
