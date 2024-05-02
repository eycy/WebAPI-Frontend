
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Space, message } from 'antd';
import { dogAPI } from "../commons/http-commons";
import { Typography } from 'antd';


const LoginForm = () => {

  const navigate = useNavigate();
  const { Title } = Typography;

  const handleSubmit = async (values) => {
    try {
      const { firstname, lastname, username, password, email } = values;

      // Prepare the user data
      const userData = {
        firstname, lastname, username, password, email
      };

      // Perform the user creation request to the server
      const response = await fetch(`${dogAPI.url}/api/v1/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        // User creation successful
        const data = await response.json();
        console.log('User created:', data);
        message.success('User creation successful. Please login.');
        navigate(-1)
      } else {
        // User creation failed
        console.log('User creation failed');
        message.error('Creation failed.');
      }
    } catch (error) {
      console.error('User creation error:', error);
      message.error('Error while creating user.');
    }
  };



  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '50%' }}>
      <Title>Create User</Title>
      
      <Form {...formItemLayout} style={{ padding: '15px', maxWidth: 600 }} onFinish={handleSubmit}>
        <Form.Item label="First Name" name="firstname"
          rules={[{ required: true, message: 'Missing first name' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Last Name" name="lastname"
          rules={[{ required: true, message: 'Missing last name' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Username" name="username"
          rules={[{ required: true, message: 'Missing username' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password"
          rules={[{ required: true, message: 'Missing password' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item label="Email" name="email"
          rules={[{ required: true, message: 'Missing email' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Sign Up Code" name="signupcode">
          <Input />
        </Form.Item>
        <div>
          <Space>
            <Button type="primary" htmlType="submit">Create</Button>
            <Button htmlType="button" onClick={() => navigate(-1)}>Cancel</Button>
          </Space>
        </div>
      </Form>
          </div>
        </div>
    </>
  )
}
export default LoginForm;