import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Checkbox, Space, Typography } from 'antd';

import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';

import { dogAPI } from "../commons/http-commons";

interface loginFields {
  username?: string;
  password?: string;
};

const { Text } = Typography;

const LoginForm = ({ setCredentials, setIsLoggedIn, isLoggedIn }) => {
  const [isShow, setIsShow] = React.useState(false);
  const [getUser, setUser] = useState(null);
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = async (values) => {
    try {

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
        setCredentials(base64Credentials);
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
      // setLoading(false);
    }
  };


  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to="/listingForm">Add New Listing</Link>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          Logout
        </a>
      )
    }
  ];

  return (
    <>
      {isLoggedIn ? (
        <div>
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Hello, {getUser.username}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      ) : (
        <>
          <Button icon={<UserOutlined />} onClick={() => { setIsShow(true) }} />
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
              <div>
                <Space>
                <Button type="primary" htmlType="submit">Login</Button>
                Or <a href="/createuser">Register now!</a>
                  </Space>
                </div>
            </Form>
          </Modal>
        </>
      )}
    </>
  )
}
export default LoginForm;