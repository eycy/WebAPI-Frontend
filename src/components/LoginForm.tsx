import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Checkbox, Space } from 'antd';


interface loginFields {
  username?: string;
  password?: string;
};

// interface LoginFormProps {
//   isShow: boolean;
//   setIsShow: (value: boolean) => void;
// }

//{ isShow, setIsShow }: LoginFormProps
const LoginForm = ({ isShow, setIsShow }) => {
  // const [isShow, setIsShow] = useState(false);

  return (
    <>
      {/* <Button icon={<UserOutlined />} onClick={() => { setIsShow(true) }} /> */}
      <Modal open={isShow} onCancel={() => { setIsShow(false) }} title="Welcome Blogger" footer={[]}>
        <Form>
          <Form.Item label="Username" rules={[{ required: true, message: 'Missing username!' }]}>
            <input />
          </Form.Item>
          <Form.Item label="Password" rules={[{ required: true, message: 'Missing password!' }]}>
            <input />
          </Form.Item>
          <Form.Item>
            <Space>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Space>
          </Form.Item>

          <Form.Item>

            <Space>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or <a href="">register now!</a>
            </Space>

          </Form.Item>
        </Form>

      </Modal>
    </>

  )
}

export default LoginForm;