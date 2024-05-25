import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Row, Button, Form, Input, Modal, Spin, Space, Typography } from 'antd';
import axios from 'axios';

import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';

import { dogAPI } from "../commons/http-commons";
import GoogleAuth from './GoogleAuth';

interface loginFields {
  username?: string;
  password?: string;
};

const { Text } = Typography;

const LoginForm = ({ setCredentials, setIsLoggedIn, isLoggedIn, setIsStaff }) => {
  const [isShow, setIsShow] = React.useState(false);
  const [getUser, setUser] = useState(null);
  const [loginError, setLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      const base64Credentials = btoa(`${values.username}:${values.password}`);

      // Perform the login request to the server
      const response = await fetch(`${dogAPI.url}/api/v1/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${base64Credentials}`
        }
      });

      if (response.ok) {
        // Login successful
        const data = await response.json();
        const { user } = data;

        // Update the state and store the authentication tokens
        setIsLoggedIn(true);
        setUser(user);
        setIsStaff(user.isstaff);
        setCredentials(`Basic ${base64Credentials}`);
      } else {
        // Login failed
        console.log('Login failed');
        setLoginError(true);
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      // Reset the form and loading state
      // form.resetFields();
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsShow(false);
    try {
      setIsLoggedIn(false);
      setUser(null);
      setIsStaff(false);
      setCredentials('');
      if (getUser?.accesstoken) {
        await axios.post(`${dogAPI.url}/api/v1/login/auth/google/logout`, { logout: true });
      }
    } catch (error) {
      console.log('Logout error:', error);
    }
  };


  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a onClick={logout}>Logout</a>
      )
    }
  ];

  return (
    <>
      {isLoading ? (<Spin spinning={isLoading} fullscreen />) : (isLoggedIn ? (
        <div>
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Button icon={<UserOutlined />}> {getUser?.username}</Button>

              </Space>
            </a>
          </Dropdown>
        </div>
      ) : (
        <>
          <Button icon={<UserOutlined />} onClick={() => { setIsShow(true) }} >Login
          </Button>
          <Modal open={isShow} onCancel={() => { setIsShow(false) }} title="Welcome" footer={[]}>
            <Form onFinish={handleSubmit}>
              <Form.Item label="Username" name="username"
                rules={[{ required: true, message: 'Missing username' }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Password" name="password"
                rules={[{ required: true, message: 'Missing password' }]}>
                <Input.Password />
              </Form.Item>
              {loginError && (
                <Text type="danger">Incorrect username or password</Text>
              )}
              <Row justify="space-between" align="middle">
                <Col>
                  <Space>
                    <Button type="primary" htmlType="submit">Login</Button>
                    Or <a href="/createuser">Register now!</a>
                  </Space>
                </Col>
                <Col>
                  <GoogleAuth
                    setCredentials={setCredentials}
                    setIsLoggedIn={setIsLoggedIn}
                    isLoggedIn={isLoggedIn}
                    setIsStaff={setIsStaff}
                    setUser={setUser}
                    setIsShow={setIsShow}
                    setIsLoading={setIsLoading} />
                </Col>
              </Row>
            </Form>
          </Modal>
        </>
      ))}
    </>
  )
}
export default LoginForm;