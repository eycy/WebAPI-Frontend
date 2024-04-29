import React, { useState } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  Row,
  Col
} from 'antd';

const { Option } = Select;

type SizeType = Parameters<typeof Form>[0]['size'];

const AdvanceSearchPanel = ({ onAdvSearch, isAdvanceSearchOpen }) => {


  const [form] = Form.useForm(); // Create the form instance
  const { TextArea } = Input;
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

  const initialValues = {
    size: componentSize
  };

  const onFinish = (values) => {
    // Format the date of birth
    const dob = values.dob ? values.dob.format('YYYY-MM-DD') : '';

    // Modify the values object to include the formatted date of birth
    const updatedValues = {
      ...values,
      dob
    };

    // Call the onAdvSearch function with the updated values
    onAdvSearch(updatedValues);
  };

  return (
    <>

      {isAdvanceSearchOpen && (
        <>
          <Form

            labelCol={{ span: 6 }}
            labelAlign="right"
            wrapperCol={{ span: 12 }}
            layout="horizontal"
            initialValues={initialValues}
            onValuesChange={() => { }}
            size={componentSize as SizeType}
            style={{ padding: '10px', maxWidth: 1000, marginTop: '20px' }}
            form={form}
            onFinish={onFinish}
          >
            <Row gutter={24}>
              <Col span={9}>
                <Form.Item label="Name" name="name">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Breed" name="breed_id">
                  <Select>
                    <Select.Option value={1}>Akita</Select.Option>
                    <Select.Option value={2}>Bouvier</Select.Option>
                    <Select.Option value={3}>Dachshund</Select.Option>
                    <Select.Option value={4}>German Shepherd</Select.Option>
                    <Select.Option value={5}>Otterhound</Select.Option>
                    <Select.Option value={6}>Terrier</Select.Option>
                  </Select>
                </Form.Item>
              </Col>


              <Col span={7}>
                <Form.Item label="Location" name="location">
                  <Select>
                    <Select.Option value="Aberdeen">Aberdeen</Select.Option>
                    <Select.Option value="Jordan">Jordan</Select.Option>
                    <Select.Option value="Shatin">Shatin</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={9} align="left">
                <Form.Item label="Date of Birth" name="dob">
                  <DatePicker />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Description" name="description">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <div style={{ marginLeft: '20px', align: 'left' }}>
              <Space>
                <Button type="primary" htmlType="submit">Submit</Button>
                <Button htmlType="button" onClick={() => { form.resetFields(); }}>
                  Reset
                </Button>
              </Space>
            </div>
          </Form>
        </>
      )}


    </>
  );
};

export default AdvanceSearchPanel;