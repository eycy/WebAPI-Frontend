

//import './App.css'
// import React from 'react'
import { useState } from 'react';
import { Layout, Divider, Typography, FloatButton, Space, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import Articles from './components/Articles';
import MainTitle from './components/MainTitle';
import DetailArticles from './components/DetailArticles';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Copyright from './components/Copyright';
import LoginForm from './components/LoginForm';
import ListingForm from './components/ListingForm';
import Error from './components/Error';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const { Header, Footer, Content } = Layout;
const { Text } = Typography;


const App = () => {
  // const [isShow, setIsShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [articles, setArticles] = useState(null);
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
          <Routes>
            <Route index element={<Home credentials={credentials} isLoggedIn={isLoggedIn} articles={articles} setArticles={setArticles} />} />
            <Route path='/listingForm' element={<ListingForm credentials={credentials} isLoggedIn={isLoggedIn} />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/about' element={<About />} />
            <Route path='/a/:aid' element={<DetailArticles articles={articles} />} />
            <Route path='*' element={<Error />} />
          </Routes>
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
