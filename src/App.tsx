

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
import UserCreationForm from './components/UserCreationForm';
import Error from './components/Error';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './public/css/animate.css';

import './public/css/font-awesome.min.css';
import './public/css/flaticon.css';
import './public/css/owl.carousel.min.css';
import './public/css/owl.theme.default.min.css';
import './public/css/bootstrap.min.css';
import './public/css/bootsnav.css';
import './public/css/style.css';
import './public/css/responsive.css';

import DogContext from './contexts/DogContext';


const { Header, Footer, Content } = Layout;
const { Text } = Typography;


const App = () => {
  // const [isShow, setIsShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [dogs, setDogs] = useState(null);
  const [selectedDog, setSelectedDog] = useState(null);
  // const [user, setUser] = useState(null);

  const [credentials, setCredentials] = useState("");


  return (
    <Router>
      <Layout >
        <Header className="top-area header-area navbar navbar-default bootsnav navbar-fixed dark no-background navbar-header" title='Blog' style={{ width: '100%', zIndex: 1, position: 'sticky', top: 0 }}>
          <div class-name="nav navbar-nav navbar-right">
          <Space>
            <Link to='/'>Home</Link>
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/about'>About</Link>
            <LoginForm setCredentials={setCredentials} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setIsStaff={setIsStaff} />
            </Space>
              </div>
        </Header>
        <Content style={{ textAlign: 'center' }}>
          <DogContext.Provider value={{ selectedDog, setSelectedDog }}>
            <Routes>
              <Route index element={<Home credentials={credentials} isLoggedIn={isLoggedIn} isStaff={isStaff} dogs={dogs} setDogs={setDogs} setIsEditMode={setIsEditMode}/>} />
              <Route path='/listingForm' element={<ListingForm credentials={credentials} isLoggedIn={isLoggedIn} isEditMode={isEditMode}/>} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/about' element={<About />} />
              <Route path='/a/:aid' element={<DetailDogs dogs={dogs} />} />
              <Route path='/createuser' element={<UserCreationForm />} />
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
