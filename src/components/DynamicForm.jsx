// src/DynamicForm.js
import React, { useEffect } from 'react';
import { Form, Input, Checkbox, DatePicker, Upload, InputNumber, Select, Button, Row, Col, Divider, Radio, Typography } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import './../formBuilder.css';
const { TextArea } = Input;
const { Option } = Select;
const { Dragger } = Upload;


const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const tailFormItemLayout = {
  wrapperCol: {
    span: 14,
    offset: 4,
  },
};

const DynamicForm = ({ json }) => {
  const [form] = Form.useForm();

  const renderFormItem = (item) => {
    switch (item.type) {
      case 'header':
        return (
          <Col span={24}>
            <Form.Item key={item.name}>
              <h1>{item.label ? item.label?.replace(/<br\s*\/?>/gi, '') : ''}</h1>
            </Form.Item>
            <Divider />
          </Col>
        );

      case 'paragraph':
        return (
          <Col span={24}>
            <Form.Item 
            key={item.name}>
              <span className='textStyles-small' style={{ display: 'block' }}>
                {item.label ? item.label?.replace(/<br\s*\/?>/gi, '') : ''}
              </span>
            </Form.Item>
          </Col>
        );
      case 'date':
        return (
          <Col span={12}>
            <Form.Item 
            required={item.required}
            key={item.name} label={<span className='textStyles-smallx'>{item.label?.replace(/<br\s*\/?>/gi, '')}</span>}>
              <DatePicker style={{ width: '99%' }} />
            </Form.Item>
          </Col>

        );
      case 'file':
        return (
          <Col span={24}>
            <Form.Item key={item.name}
              required={item.required}
              label={<span className='textStyles-smallx'>{item.label?.replace(/<br\s*\/?>/gi, '')}</span>}>
              <Dragger size='small' name="file" multiple={true} style={{ width: '100%' }}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text textStyles-smallx">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint textStyles-smallx">
                  Support for a single or bulk upload.
                </p>
              </Dragger>
            </Form.Item>
          </Col>
        );
      case 'number':
        return (
          <Col span={12}>
            <Form.Item key={item.name} 
            required={item.required}
            label={<span className='textStyles-smallx'>{item.label?.replace(/<br\s*\/?>/gi, '')}</span>}>
              <InputNumber style={{ width: '99%' }} />
            </Form.Item>
          </Col>
        );

      case 'select':
        return (
          <Col span={12}>
            <Form.Item key={item.name} required={item.required} label={<span className='textStyles-smallx'>{item.label?.replace(/<br\s*\/?>/gi, '')}</span>} >
              <Select defaultValue={item.values.find(v => v.selected).value} style={{ width: '99%' }}>
                {item.values.map(v => (
                  <Option key={v.value} value={v.value}>
                    {v.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        );

      case 'text':
        return (
          <Col span={12}>
            <Form.Item key={item.name} required={item.required} label={<span className='textStyles-smallx'>{item.label?.replace(/<br\s*\/?>/gi, '')}</span>}>
              <Input style={{ width: '99%' }} />
            </Form.Item>
          </Col>
        );

      case 'textarea':
        return (
          <Col span={24}>
            <Form.Item required={item.required} key={item.name} label={<span className='textStyles-smallx'>{item.label?.replace(/<br\s*\/?>/gi, '')}</span>}>
              <TextArea style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        );

      case 'checkbox-group':
        return (
          <Col span={12}>
            <Form.Item key={item.name} required={item.required} label={<span className='textStyles-smallx'>{item.label?.replace(/<br\s*\/?>/gi, '')}</span>} >
              <Checkbox.Group
                options={item.values.map(v => ({ label: v.label, value: v.value }))}
                // className="horizontal-checkbox-group"
              />
            </Form.Item>
          </Col>
        );

      case 'radio-group':
        return (
          <Col span={12}>
            <Form.Item key={item.name} required={item.required} label={<span className='textStyles-smallx'>{item.label?.replace(/<br\s*\/?>/gi, '')}</span>} >
              <Radio.Group
                options={item.values.map(v => ({ label: v.label, value: v.value }))}
                className="horizontal-radio-group"
              />
            </Form.Item>
          </Col>
        );
        case 'button':
          return (
            <Col span={12}>
              <Form.Item key={item.name} >
                <Button type={item.style} className={item.className} htmlType={item.subtype}>
                  <span className='textStyles-smallx'>{item.label?.replace(/<br\s*\/?>/gi, '')}</span>
                </Button>
              </Form.Item>
            </Col>
          );
      default:
        return null;

    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>

      <Form
        size='medium'
        layout="vertical"
        form={form} {...formItemLayout}>
        <Row span={24}>
          {json?.map(item => renderFormItem(item))}
          {/* <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item> */}
        </Row>
      </Form>
    </div>
  );
};

export default DynamicForm;
