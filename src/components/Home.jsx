import $ from "jquery";
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import DynamicForm from './DynamicForm';
import React, { useEffect, useRef } from "react";
import { apiExecutions } from './../api/api-call';
import ReactDOM from "react-dom";
import "./../styles.css";
import { Checkbox, InputNumber, Spin, Avatar, Notification, notification, Card, Skeleton, Switch, Table, Select, Input, Button, Row, Upload, Col, Dropdown, Tag, Modal, Steps, message, Form, DatePicker, TimePicker, Descriptions, Image, Tabs } from 'antd';
import { HighlightOutlined, PlusOutlined, DownOutlined, UploadOutlined, CheckOutlined, CloseOutlined, LoadingOutlined, MinusCircleOutlined, PlusCircleOutlined, DeleteOutlined, EditOutlined, SaveOutlined, ExclamationCircleOutlined, EyeOutlined } from '@ant-design/icons';
import "./../formBuilder.css";


window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

const formData = []

function Home() {
  const fb = useRef();
  const [formDataJson, setFormDataJson] = React.useState([]);
  const [checkList, setCheckList] = React.useState([]);
  const [selectedChecklist, setSelectedChecklist] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);


  useEffect(() => {
    fetchAllChecklists();
  }, []); 

  useEffect(() => {
    let intervalId = null;
    const fbInstance = $(fb.current).formBuilder({ formData });
    fbInstance.promise.then(function (formBuilder) {
      formBuilder.actions.setData(formData);

      if (intervalId !== null) {
        clearInterval(intervalId);
      }

      intervalId = setInterval(() => {
        const newFormData = formBuilder.actions.getData('json', true);
        if (JSON.stringify(newFormData) !== JSON.stringify(formDataJson)) {
          setFormDataJson(JSON.parse(newFormData));
          formData.push(newFormData);
          console.log(newFormData);
        }
      }, 1000);
    });
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, []);

  const initializeFormBuilder = (fb, formData) => {
    const fbInstance = $(fb.current).formBuilder({ formData });
    fbInstance.promise.then(function (formBuilder) {
      formBuilder.actions.setData(formData);
      return formBuilder;
    });
  };


  const fetchAllChecklists = async () => {
    try {
      const response = await apiExecutions.getChecklistsFetch();
      if (response?.data !== null) {
        setCheckList(response);
      }
    } catch (error) {
      console.error('An error occurred while fetching the checklists:', error);
    }
  }

  const onChange = (key) => {
    console.log(key);
  };

  const [form] = Form.useForm();


  const [key, setKey] = React.useState(1);
  const items = [
    {
      key: '1',
      label: (<span className="textStyles-small"><HighlightOutlined /> Form Builder</span>),
      children: (
        <div style={{ padding: "10px" }}>
          <body
            id="fb-editor"
            ref={fb}
          />
        </div>
      )
    },


    {
      key: '2',
      label: (
        <span
          className="textStyles-small"
          onClick={() => setKey(prevKey => prevKey + 1)} // increment key to force re-render
        >
          <EyeOutlined /> Form Preview
        </span>
      ),
      children: (
        <div className="App" key={key}>
          <DynamicForm json={formDataJson} />
        </div>
      )
    },
    {
      key: '3',
      label: (<span className="textStyles-small"><EditOutlined /> JSON View</span>),
      children: (
        <JSONInput
          style={{ border: "1px solid #ccc", borderRadius: "5px" }}
          id='a_unique_id'
          placeholder={formDataJson}
          locale={locale}
          height='100vh'
          width='100%'
          readOnly={true}
        />
      )
    },
  ];

  const onFinish = (values) => {
    const { checklistName, sessionName, sessionIndex, isActive, isDraft, version, sessionDescription } = values;
    const sessionJson = {
      checklistName,
      sessionName,
      sessionIndex,
      isActive,
      isDraft,
      version,
      sessionDescription,
      template: formDataJson
    };
    createNewChecklist(sessionJson);
  };

  const draftSave = async () => {
    localStorage.removeItem('draft');
    try {
      const data = {
        template: formDataJson,
        createdAt: new Date(),
      }
      localStorage.setItem('draft', JSON.stringify(data));
      notification.open({
        message: 'Checklist',
        description:
          'Checklist saved as draft',
        icon: <CheckOutlined style={{ color: '#108ee9' }} />,
      });
    } catch (error) {
      console.error('An error occurred while saving the draft:', error);
      notification.open({
        message: 'Checklist',
        description:
          'Checklist save as draft failed',
        icon: <CloseOutlined style={{ color: '#108ee9' }} />,
      });
    }
  }

  const createNewChecklist = async (data) => {
    try {
      const response = await apiExecutions.postChecklistsFetch(data);
      if (response.acknowledged === true) {
        notification.open({
          message: 'Checklist',
          description:
            'Checklist created successfully',
          icon: <CheckOutlined style={{ color: '#108ee9' }} />,
        });
        setOpenModal(false);
      }
    } catch (error) {
      console.error('An error occurred while creating the checklist:', error);
      notification.open({
        message: 'Checklist',
        description:
          'Checklist creation failed',
        icon: <CloseOutlined style={{ color: '#108ee9' }} />,
      });
    }
  }

  return (
    <div className="bg-gray-100 p-4">
      <div className="bg-white p-4 rounded-md shadow-md">

        <span style={{ fontSize: "20px", fontWeight: "bold" }}>Checklist Builder</span>
        "Save your work as draft before you exit the page.
        <span style={{ float: "right" }} className="textStyles-small">
          {/* <Avatar size="small" icon={<LoadingOutlined />} />
          <Avatar size="small" icon={<LoadingOutlined />} /> */}
          Load Last Draft <Switch size="small" style={{ marginLeft: "10px" }} onChange={(checked) => {
            if (checked) {
              const draft = JSON.parse(localStorage.getItem('draft'));
              if (draft) {
                initializeFormBuilder(fb, draft.template);
              }
            }
          } } />
        </span>        

        <div style={{ marginTop: "10px", backgroundColor: "white", padding: "20px" }}>
          <div style={{ marginTop: "10px", backgroundColor: "#f5f5f5", padding: "10px", borderRadius: "10px" }}>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ marginLeft: "10px" }}
              onClick={() => {
                draftSave();
              }}
            > <span className="textStyles-small">Save as Draft</span>
            </Button>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ marginLeft: "10px", backgroundColor: "#52c41a", borderColor: "#52c41a" }}
              onClick={() => {
                setOpenModal(true);
              }}
            > <span className="textStyles-small">Save And Publish</span>
            </Button>
          </div>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </div>

      <Modal
        title="Create Session"
        visible={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          form={form}
          layout="vertical"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Row>
            <Col span={12}>
              <Form.Item
                label={<span className="textStyles-small">Checklist Name</span>}
                name="checklistName"
                rules={[{ required: true, message: 'Please input the checklist name!' }]}
              >
                <Select
                  placeholder="Choose a checklist"
                  optionFilterProp="children"
                  className="my-select-container"
                  style={{ width: "99%" }}
                  bordered={true}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {checkList?.map((item, index) => (
                    <Select.Option key={index} value={item.checklistID} className="textStyles-small">
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<span className="textStyles-small">Session Name</span>}
                name="sessionName"
                rules={[{ required: true, message: 'Please input the session name!' }]}
              >
                <Input style={{ width: '99%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                label={<span className="textStyles-small">Session Index</span>}
                name="sessionIndex"
                rules={[{ required: true, message: 'Please input the session index!' }]}
              >
                <InputNumber style={{ width: '99%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<span className="textStyles-small">Is Active</span>}
                name="isActive"
                rules={[{ required: true, message: 'Please select if active!' }]}
              >
                <Select style={{ width: '99%' }}>
                  <Select.Option value="true">True</Select.Option>
                  <Select.Option value="false">False</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                label={<span className="textStyles-small">Is Draft</span>}
                name="isDraft"
                rules={[{ required: true, message: 'Please select if draft!' }]}
              >
                <Select style={{ width: '99%' }}>
                  <Select.Option value="true">True</Select.Option>
                  <Select.Option value="false">False</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<span className="textStyles-small">Version</span>}
                name="version"
                rules={[{ required: true, message: 'Please input the version!' }]}
              >
                <Input style={{ width: '99%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label={<span className="textStyles-small">Session Description</span>}
                name="sessionDescription"
                rules={[{ required: true, message: 'Please input the session description!' }]}
              >
                <Input.TextArea rows={4} style={{ width: '99%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Button type="primary" htmlType="submit">
              <span className="textStyles-small">Save Session</span>
            </Button>
            <Button type="primary" danger style={{ marginLeft: "10px" }} onClick={() => { setOpenModal(false) }}>
              <span className="textStyles-small">Cancel and Exit</span>
            </Button>
          </Row>

        </Form>
      </Modal>
    </div>
  );
}

export default Home;