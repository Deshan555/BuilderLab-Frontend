import $ from "jquery";
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import DynamicForm from './DynamicForm';
import React, { useEffect, useRef } from "react";
import { apiExecutions } from './../api/api-call';
import ReactDOM from "react-dom";
import "./../styles.css";
import { Badge, Breadcrumb, Checkbox, InputNumber, Spin, Avatar, Notification, notification, Card, Skeleton, Switch, Table, Select, Input, Button, Row, Upload, Col, Dropdown, Tag, Modal, Steps, message, Form, DatePicker, TimePicker, Descriptions, Image, Tabs, Collapse } from 'antd';
import { ClockCircleOutlined ,HighlightOutlined, PlusOutlined, DownOutlined, UploadOutlined, CheckOutlined, CloseOutlined, LoadingOutlined, MinusCircleOutlined, PlusCircleOutlined, DeleteOutlined, EditOutlined, SaveOutlined, ExclamationCircleOutlined, EyeOutlined } from '@ant-design/icons';
import "./../formBuilder.css";

const { Panel } = Collapse;

const ViewForm = () => {
  const [checklists, setChecklists] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [sections, setSections] = React.useState([]);
  const [section, setSection] = React.useState({});
  const [selectedChecklist, setSelectedChecklist] = React.useState(null);
  const [selectedSection, setSelectedSection] = React.useState(null);
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const [checklistModal, setChecklistModal] = React.useState(false);

  useEffect(() => {
    getChecklists();
  }, []);

  const getChecklists = async () => {
    setLoading(true);
    const response = await apiExecutions.getChecklistsFetch();
    if (response != null) {
      setChecklists(response);
      setLoading(false);
    } else {
      setLoading(false);
      notification.error({
        message: 'Error',
        description: 'Error fetching checklists',
        duration: 2,
      });
    }
  };

  const checklistModalClose = () => {
    setChecklistModal(false);
  }

  const getSections = async (id) => {
    setLoading(true);
    const response = await apiExecutions.fetchSectionsByChklName(id);
    if (response != null) {
      setSections(response);
      setLoading(false);
    } else {
      setLoading(false);
      notification.error({
        message: 'Error',
        description: 'Error fetching sections',
        duration: 2,
      });
    }
  };

  const sectionsFetchingSupport = (data) => {
    getSections(data);
  }

  const columns = [
    {
      title: <span className='textStyles-small'>Section Name</span>,
      dataIndex: 'sessionName',
      key: 'sessionName',
      render: (text) => (
        <span className='textStyles-small'>{text}</span>
      ),
    },
    {
      title: <span className='textStyles-small'>Version</span>,
      dataIndex: 'version',
      key: 'version',
      render: (text) => (
        <span className='textStyles-small'>{text}</span>
      ),
    },
    {
      title: <span className='textStyles-small'>Is Active</span>,
      dataIndex: 'isActive',
      key: 'isActive',
      render: (text) => (
        <span className='textStyles-small'>{text === "true" ? <Tag color='green' text='Active'>Active</Tag>
          : <Tag color='red' text='Inactive'>Inactive</Tag>}</span>
      ),
    },
    {
      title: <span className='textStyles-small'>Is Draft</span>,
      dataIndex: 'isDraft',
      key: 'isDraft',
      render: (text) => (
        <span className='textStyles-small'>{text === "true" ? <Tag color='red' text='Draft'>Draft</Tag>
          : <Tag color='green' text='Final'>Final</Tag>}</span>
      ),
    },
    {
      title: <span className='textStyles-small'>Created On</span>,
      dataIndex: 'createdOn',
      key: 'createdOn',
      render: (text) => (
        <span className='textStyles-small'>
          {new Date(text).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}
        </span>
      ),
    },
    {
      title: <span className='textStyles-small'>Updated On</span>,
      dataIndex: 'updatedOn',
      key: 'updatedOn',
      render: (text) => (
        <span className='textStyles-small'>
          {new Date(text).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}
        </span>
      ),
    },
    {
      title: <span className='textStyles-small'>Service Type</span>,
      dataIndex: 'serviceType',
      key: 'serviceType',
      render: (text) => (
        <div>
          {text.map((item, index) => (
            <span className='textStyles-small' key={index}>{item.replace(/_/g, ' ')} ,</span>
          ))}
        </div>
      ),
    },
    {
      title: <span className='textStyles-small'>Actions</span>,
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => (
        <div>
          <Button
            type='primary'
            size="small"
            shape="circle"
            icon={<EyeOutlined />}
            style={{ marginRight: '10px' }}
            onClick={() => {
              setSection(record);
              getSections(record.checklistName);
              setSelectedSection(record?.sessionName);
              setOpenViewModal(true);
            }}
          />
        </div>
      ),
    }
  ];

  const viewModalClose = () => {
    setOpenViewModal(false);
  }

  const onChange = (key) => {
    console.log(key);
  };

  function parseChangelog(changelog) {
    const changes = changelog.split('- **');
    return changes.slice(1).map(change => {
      const [type, description] = change.split('**');
      const formattedDescription = description
        .trim()
        .replace(/:/g, ':\n')
        .replace(/\`([^`]*)\`/g, '<code>$1</code>');
      return {
        type: type.trim(),
        description: formattedDescription
      };
    });
  }

  const items = [
    {
      key: '1',
      label: <span className='textStyles-small'>{selectedChecklist?.name} Checklist Preview</span>,
      children: (
        <Descriptions
          layout="horizontal"
          bordered
          size='small'
          column={2}
        >
          <Descriptions.Item label={<span className='textStyles-small'>Checklist Name</span>}>
            <span className='textStyles-small'>{selectedChecklist?.name}</span>
          </Descriptions.Item>
          <Descriptions.Item label={<span className='textStyles-small'>Description</span>}>
            <span className='textStyles-small'>{selectedChecklist?.description}</span>
          </Descriptions.Item>
          <Descriptions.Item label={<span className='textStyles-small'>Created On</span>}>
            <span className='textStyles-small'>{selectedChecklist?.createdOn}</span>
          </Descriptions.Item>
          <Descriptions.Item label={<span className='textStyles-small'>Updated On</span>}>
            <span className='textStyles-small'>{selectedChecklist?.updatedOn}</span>
          </Descriptions.Item>
          <Descriptions.Item label={<span className='textStyles-small'>Version</span>}>
            <span className='textStyles-small'>{selectedChecklist?.version}</span>
          </Descriptions.Item>
          <Descriptions.Item label={<span className='textStyles-small'>Active</span>}>
            <span className='textStyles-small'>{selectedChecklist?.isActive}</span>
          </Descriptions.Item>
          <Descriptions.Item label={<span className='textStyles-small'>Sections Count</span>}>
            <span className='textStyles-small'>{selectedChecklist?.sectionCount}</span>
          </Descriptions.Item>
          <Descriptions.Item label={<span className='textStyles-small'>Checklist ID</span>}>
            <span className='textStyles-small'>{selectedChecklist?.checklistID}</span>
          </Descriptions.Item>
          <Descriptions.Item label={<span className='textStyles-small'>Sections</span>}>
            <Descriptions size='small' column={1} bordered>
              {
                selectedChecklist?.sections?.map((section, index) => (
                  <Descriptions.Item
                    label={<span className='textStyles-small'>{section?.sectionName}</span>}
                  >
                    <span className='textStyles-small'>Section Description: {section?.sectionDescription}</span>
                  </Descriptions.Item>
                ))
              }
            </Descriptions>
          </Descriptions.Item>
        </Descriptions>
      ),
    },
    {
      key: '2',
      label: <span className='textStyles-small'>Sections Preview</span>,
      children: (
        <Table
          columns={columns}
          dataSource={sections}
          pagination={false}
          size='small'
        />
      ),
    },
  ];

  const slider = [
    {
      key: '1',
      label: <span className='textStyles-small'>Section Preview</span>,
      children: (
        <Descriptions
          layout="horizontal"
          bordered
          size='small'
          column={2}
        >
          <Descriptions.Item label={<span className='textStyles-small'>Section Name</span>}>
            <span className='textStyles-small'>{section?.sessionName}</span>
          </Descriptions.Item>
          <Descriptions.Item label={<span className='textStyles-small'>Description</span>}>
            <span className='textStyles-small'>{section?.sessionDescription}</span>
          </Descriptions.Item>
          <Descriptions.Item label={<span className='textStyles-small'>Created On</span>}>
            <span className='textStyles-small'>{section?.createdOn}</span>
          </Descriptions.Item>
          <Descriptions.Item label={<span className='textStyles-small'>Updated On</span>}>
            <span className='textStyles-small'>{section?.updatedOn}</span>
          </Descriptions.Item>
          <Descriptions.Item label={<span className='textStyles-small'>Version</span>}>
            <span className='textStyles-small'>{section?.version}</span>
          </Descriptions.Item>
          <Descriptions.Item label={<span className='textStyles-small'>Active</span>}>
            <span className='textStyles-small'>{section?.isActive}</span>
          </Descriptions.Item>
          <Descriptions.Item label={<span className='textStyles-small'>Draft</span>}>
            <span className='textStyles-small'>{section?.isDraft}</span>
          </Descriptions.Item>
          <Descriptions.Item label={<span className='textStyles-small'>Service Type</span>}>
            <span className='textStyles-small'>{section?.serviceType?.map((item, index) => (
              <span className='textStyles-small' key={index}>{item.replace(/_/g, ' ')} ,</span>
            ))}</span>
          </Descriptions.Item>
        </Descriptions>)
    },
    {
      key: '2',
      label: <span className='textStyles-small'>Template Preview</span>,
      children: (
        <div style={{ padding: '20px', marginTop: '10px', borderRadius: '10px', backgroundColor: '#fafafa' }}>
          <DynamicForm
            json={section?.template}
          /> </div>
      ),
    },
    {
      key: '3',
      label: <span className='textStyles-small'>Versions</span>,
      children: (
        <Steps
          current={sections.findIndex(section => section.sessionName === selectedSection)}
          size="small"
          direction="vertical"
          items={sections.filter(section => section.sessionName === selectedSection)
            .map((section, index) => (
              {
                title: <span className='textStyles-small' style={{ fontSize: '14px'}}>{section?.version}</span>,
                subTitle: <span className='textStyles-small' style={{ fontSize: '11px' }}>{section?.sessionName} <Badge style={{marginLeft: '10px'}}
                status={section?.isActive === "true" ? 'success' : 'error'} text={section?.isActive === "true" ? 'Active' : 'Inactive'} /></span>,
                icon: <ClockCircleOutlined />,
                description: (
                  <div>
                    <span className='textStyles-small'>Change Log: {section?.changeLog}</span><br />
                    <span style={{ fontSize: '11px', color: 'gray', cursor: 'pointer' }} className='textStyles-small'>Created On: {new Date(section?.createdOn).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}</span>
                    <span style={{ marginLeft: '10px', fontSize: '11px', color: 'gray', cursor: 'pointer' }} className='textStyles-small'>Updated On: {new Date(section?.updatedOn).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}</span>
                  </div>
                )
              }
            ))}
        />
      )
    }
  ]

  const checklistBuild = selectedChecklist?.sections?.map((main_section) => (
    {
      key: main_section?.sectionName,
      label: <span className='textStyles-small'>{main_section?.sectionName}</span>,
      children: sections?.filter(section => main_section.sectionName === section?.sessionName && section.isActive === 'true').map((section, index) => {
        console.log("sectionLkr:", section);
        return <DynamicForm json={section?.template} />;
      }),
    }));

  return (
    <div>
      <Spin spinning={loading} tip="Loading..." size="large">
        <div style={{ padding: '20px', marginTop: '10px', borderRadius: '10px' }}>
          <Row justify="space-between" style={{ marginBottom: '30px' }}>
            <div>
              <span className='textStyles-small' style={{ fontSize: '17px', fontWeight: 'bold' }}>
                Inspections
              </span>
              <Breadcrumb style={{ marginTop: '10px', marginLeft: '10px' }}>
                <Breadcrumb.Item>
                  <span className='textStyles-small'>Home</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <span className='textStyles-small'>Inspections</span>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </Row>

          <span className='textStyles-small' style={{ fontSize: '11px' }}> select a checklist for inspection</span>

          <div style={{ backgroundColor: 'white', padding: '20px', marginTop: '10px', borderRadius: '10px' }}>
            <Select
              showSearch
              style={{ width: '300px' }}
              placeholder="Select a checklist"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(value) => {
                const selectedChecklist = checklists.find((checklist) => checklist.checklistID === value);
                setSelectedChecklist(selectedChecklist);
                sectionsFetchingSupport(value);
              }}
            >
              {checklists.map((checklist, index) => (
                <Select.Option key={index} value={checklist?.checklistID}>{checklist?.name}</Select.Option>
              ))}
            </Select>
            {
              selectedChecklist !== null ? (
                <Button type='primary' style={{ marginLeft: '10px' }}
                  icon={<EyeOutlined />}
                  onClick={() => { setChecklistModal(true) }}>
                  <span className='textStyles-small'>Preview</span>
                </Button>
              ) : null
            }
          </div>
          {
            selectedChecklist !== null ? (
              <Collapse items={items} style={{ marginTop: '20px' }} />
            ) : null
          }
        </div>
      </Spin>

      <Modal
        title={<span style={{ fontSize: '16px', fontWeight: 'bold' }} className='textStyles-small'>Section Preview</span>}
        visible={openViewModal}
        width={800}
        onOk={() => { viewModalClose() }}
        onCancel={() => { viewModalClose() }}
        footer={null}
      >
        <Tabs defaultActiveKey="1" items={slider} onChange={onChange} />
      </Modal>

      <Modal
        title={<span style={{ fontSize: '16px', fontWeight: 'bold' }} className='textStyles-small'>Checklist Preview</span>}
        visible={checklistModal}
        width={800}
        onOk={() => { checklistModalClose() }}
        onCancel={() => { checklistModalClose() }}
        footer={null}
      >
        <Collapse items={checklistBuild} style={{ marginTop: '20px' }} />
      </Modal>

    </div>
  );
};

export default ViewForm;

