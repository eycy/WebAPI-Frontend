

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
import Error from './components/Error';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const { Header, Footer, Content } = Layout;
const { Text } = Typography;


const App = () => {
  const [isShow, setIsShow] = useState(false);
  return (
    <Router>
      <Layout >
        <Header title='Blog' style={{ width: '100%', zIndex: 1, position: 'sticky', top: 0 }}>
          <Space>
            <Link to='/'>Home</Link>
            <Link to='/dashboard'>Dashboard</Link>
            {/* <Link to='/loginForm'>Login</Link> */}
            <Link to='/about'>About</Link>
            <Button icon={<UserOutlined />} onClick={() => setIsShow(true)} />
          </Space>
        </Header>
        <Content style={{ textAlign: 'center' }}>
          <LoginForm isShow={isShow} setIsShow={setIsShow} />
          <Routes>
            <Route index element={<Home />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/about' element={<About />} />
            <Route path='/a/:aid' element={<DetailArticles />} />
            {/* <Route path='/loginForm' element={<LoginForm />} /> */}
            {/* <Route path='/loginForm' element={<LoginForm isShow={isShow} setIsShow={setIsShow} />} /> */}
            <Route path='*' element={<Error />} />
          </Routes>
          {/* <MainTitle />
          <Divider plain>Articles</Divider>
          <Articles /> */}
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
