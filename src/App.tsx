

import { useState } from 'react';
import { Layout, Typography, FloatButton, Space } from 'antd';
import DetailDogs from './components/DetailDogs';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Copyright from './components/Copyright';
import LoginForm from './components/LoginForm';
import ListingForm from './components/ListingForm';
import UserCreationForm from './components/UserCreationForm';
import Adoption from './components/Adoption';
import Error from './components/Error';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import DogContext from './contexts/DogContext';

const { Header, Footer, Content } = Layout;


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [dogs, setDogs] = useState(null);
  const [selectedDog, setSelectedDog] = useState(null);
  const [credentials, setCredentials] = useState("");

  return (
    <Router>
      <Layout >
        <Header
          title="Blog"
          style={{
            width: '100%',
            zIndex: 1,
            position: 'sticky',
            top: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <Space>
              <Link to="/">Home</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/adoption">Adoption</Link>
              <Link to="/about">About</Link>
            </Space>
          </div>
          <LoginForm
            setCredentials={setCredentials}
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
            setIsStaff={setIsStaff}
          />
        </Header>
        <Content style={{ textAlign: 'center' }}>
          <DogContext.Provider value={{ selectedDog, setSelectedDog }}>
            <Routes>
              <Route index element={<Home credentials={credentials} isLoggedIn={isLoggedIn} isStaff={isStaff} dogs={dogs} setDogs={setDogs} setIsEditMode={setIsEditMode} />} />
              <Route path='/listingForm' element={<ListingForm credentials={credentials} isLoggedIn={isLoggedIn} isEditMode={isEditMode} />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/about' element={<About />} />
              <Route path='/a/:aid' element={<DetailDogs dogs={dogs} isLoggedIn={isLoggedIn} isStaff={isStaff} credentials={credentials} />} />
              <Route path='/createuser' element={<UserCreationForm />} />
              <Route path='/adoption' element={<Adoption isLoggedIn={isLoggedIn} isStaff={isStaff} credentials={credentials} />} />
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
