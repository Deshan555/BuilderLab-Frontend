import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import DynamicForm from './DynamicForm';
import React, { useEffect, useRef } from "react";
import { apiExecutions } from './../api/api-call';
import ReactDOM from "react-dom";
import "./../styles.css";
import { Checkbox, InputNumber, Spin, Avatar, Notification, notification, Card, Skeleton, Switch, Table, Select, Input, Button, Row, Upload, Col, Dropdown, Tag, Modal, Steps, message, Form, DatePicker, TimePicker, Descriptions, Image, Tabs, Divider, Breadcrumb } from 'antd';
import { HighlightOutlined, PlusOutlined, DownOutlined, UploadOutlined, CheckOutlined, CloseOutlined, LoadingOutlined, MinusCircleOutlined, PlusCircleOutlined, DeleteOutlined, EditOutlined, SaveOutlined, ExclamationCircleOutlined, EyeOutlined } from '@ant-design/icons';
import "./../formBuilder.css";



const Checklist = () => {
    const [allChecklists, setAllChecklists] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [formVisible, setFormVisible] = React.useState(false);
    const [selectedChecklist, setSelectedChecklist] = React.useState({});
    const [isUpdate, setIsUpdate] = React.useState(false);
    const [noOfSections, setNoOfSections] = React.useState(1);
    const [openInformationModal, setOpenInformationModal] = React.useState(false);

    useEffect(() => {
        getChecklistsFetch();
    }, []);

    const getChecklistsFetch = async () => {
        const checklists = await apiExecutions.getChecklistsFetch();
        if (checklists !== undefined || checklists !== null) {
            setAllChecklists(checklists);
            setLoading(false);
        }
    };

    const Columns = [
        {
            title: (<span className='textStyles-small'>Name</span>),
            dataIndex: 'name',
            key: 'name',
            render: (text) => (<span className='textStyles-small'>{text}</span>),
        },
        {
            title: (<span className='textStyles-small'>Description</span>),
            dataIndex: 'description',
            key: 'description',
            render: (text) => (<span className='textStyles-small'>{text}</span>),
        },
        {
            title: (<span className='textStyles-small'>Created On</span>),
            dataIndex: 'createdOn',
            key: 'createdOn',
            render: (text) => (<span className='textStyles-small'>{text ? new Date(text).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }) : ''}</span>),
        },
        {
            title: (<span className='textStyles-small'>Updated On</span>),
            dataIndex: 'updatedOn',
            key: 'updatedOn',
            render: (text) => (<span className='textStyles-small'>{text ? new Date(text).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }) : ''}</span>),
        },
        {
            title: (<span className='textStyles-small'>Version</span>),
            dataIndex: 'version',
            key: 'version',
            render: (text) => (<span className='textStyles-small'>{text}</span>),
        },
        {
            title: (<span className='textStyles-small'>Active</span>),
            dataIndex: 'isActive',
            key: 'isActive',
            render: (text) => (<span className='textStyles-small'>{text ? 'Yes' : 'No'}</span>),
        },
        {
            title: (<span className='textStyles-small'>Sections</span>),
            dataIndex: 'sectionCount',
            key: 'sectionCount',
            render: (text) => (<span className='textStyles-small'>{text ? text : 0}</span>),
        },
        {
            title: (<span className='textStyles-small'>Checklist ID</span>),
            dataIndex: 'checklistID',
            key: 'checklistID',
            render: (text) => (<span className='textStyles-small'>{text}</span>),
        },
        {
            title: (<span className='textStyles-small'>Action</span>),
            key: 'action',
            render: (text, record) => (
                <span style={{ display: 'flex' }}>
                    <Button
                        size='small'
                        type="primary"
                        shape='circle'
                        icon={<EditOutlined />}
                        style={{ backgroundColor: '#008000', marginRight: '5px' }}
                        onClick={() => {
                            setSelectedChecklist(record);
                            setFormVisible(true);
                            setNoOfSections(record.sectionCount);
                            setIsUpdate(true);
                        }} />

                    <Button
                        size='small'
                        type="primary"
                        shape='circle'
                        icon={<EyeOutlined />}
                        onClick={() => {
                            setSelectedChecklist(record);
                            setOpenInformationModal(true);
                            setNoOfSections(record.sectionCount);
                        }} />
                </span>
            ),
        }
    ];

    const formProcessing = async (values) => {
        const data = {
            name: values.name,
            description: values.description,
            version: values.version,
            isActive: values.isActive,
            checklistID: values.checklistID,
            sectionCount: noOfSections,
            sections: Array.from({ length: noOfSections }, (_, index) => ({
                sectionName: values[`sectionName${index}`],
                sectionDescription: values[`sectionDescription${index}`],
                sectionIndex: values[`sectionIndex${index}`],
                // TODO : want to implement sectionID creation logic here
                sectionID: Math.random().toString(36).substring(7)
            }))
        };

        console.log(data);
        if (isUpdate) {
            const response = await apiExecutions.updateChecklist(selectedChecklist._id, data);
            if (response?.acknowledged === true) {
                notification.success({
                    message: 'Checklist Updated',
                    description: 'Checklist has been updated successfully',
                });
                getChecklistsFetch();
                setFormVisible(false);
            } else {
                notification.error({
                    message: 'Checklist Update Failed',
                    description: 'Checklist has not been updated successfully' + response?.error,
                });
            }
        } else {
            const response = await apiExecutions.craeteChecklists(data);
            setLoading(true);
            if (response?.acknowledged === true) {
                notification.success({
                    message: 'Checklist Created',
                    description: 'Checklist has been created successfully',
                });
                getChecklistsFetch();
                setFormVisible(false);
                setLoading(false);
            } else {
                notification.error({
                    message: 'Checklist Creation Failed',
                    description: 'Checklist has not been created successfully' + response?.error,
                });
                setLoading(false);
            }
        }
    };

    return <div>

        <div style={{ padding: '20px', marginTop: '10px', borderRadius: '10px' }}>
            <Row justify="space-between" style={{ marginBottom: '30px' }}>
                <div>
                    <span className='textStyles-small' style={{ fontSize: '17px', fontWeight: 'bold' }}>
                        Checklist Management
                    </span>
                    <Breadcrumb
                        style={{ marginTop: '10px', marginLeft: '10px' }}>
                        <Breadcrumb.Item>
                            <span className='textStyles-small'>Home</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <span className='textStyles-small'>Checklist</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Button
                    type={formVisible ? 'danger' : 'primary'}
                    style={{
                        backgroundColor: formVisible ? 'red' : 'green',
                        borderColor: formVisible ? 'red' : 'green',
                        color: 'white',
                        width: '150px'
                    }}
                    icon={formVisible ? <CloseOutlined /> : <PlusOutlined />}
                    onClick={() => {
                        setFormVisible(prevFormVisible => !prevFormVisible);
                        setSelectedChecklist({});
                        setIsUpdate(false);
                        setNoOfSections(1);
                    }}
                >
                    <span className='textStyles-small'>
                        {formVisible ? 'Back' : 'New Checklist'}
                    </span>
                </Button>
            </Row>
            {
                formVisible ? (
                    <div style={{ backgroundColor: 'white', padding: '20px', marginTop: '10px', borderRadius: '10px' }}>
                        <span className='textStyles-small' style={{ fontSize: '16px' }}>
                            {isUpdate === true ? 'Update Checklist Configurations' : 'New Checklist Configurations'}
                        </span>
                        <Form
                            style={{ marginTop: '20px' }}
                            layout='vertical'
                            onFinish={(values) => {
                                formProcessing(values);
                            }}
                        >
                            <Row>
                                <Col span={12}>
                                    <Form.Item
                                        label={<span className='textStyles-small'>Checklist Name</span>}
                                        name={'name'}
                                        initialValue={selectedChecklist.name}
                                    >
                                        <Input style={{ width: '98%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label={<span className='textStyles-small'>Description</span>}
                                        name={'description'}
                                        initialValue={selectedChecklist.description}
                                    >
                                        <Input style={{ width: '98%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={12}>
                                    <Form.Item
                                        label={<span className='textStyles-small'>Version</span>}
                                        name={'version'}
                                        initialValue={selectedChecklist.version}
                                    >
                                        <Input style={{ width: '98%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label={<span className='textStyles-small'>Checklist ID</span>}
                                        name={'checklistID'}
                                        initialValue={selectedChecklist.checklistID}
                                    >
                                        <Input style={{ width: '98%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={12}>
                                    <Form.Item
                                        label={<span className='textStyles-small'>Is Active</span>}
                                        name={'isActive'}
                                        initialValue={selectedChecklist.isActive}
                                    >
                                        <Switch />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <div style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '10px' }}>
                                <Row justify="space-between">
                                    <span className='textStyles-small' style={{ fontSize: '14px', marginTop: '10px' }}>
                                        Config Your Sections
                                    </span>
                                    <Button type="primary"
                                        size='medium'
                                        onClick={() => setNoOfSections(noOfSections + 1)}>
                                        <span className='textStyles-small'>
                                            <PlusCircleOutlined /> Add Section</span>
                                    </Button>
                                </Row>
                            </div>

                            <div style={{ marginTop: '10px' }}>
                                {Array.from({ length: noOfSections }, (_, index) => (
                                    <div style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '10px', marginTop: '10px' }}>
                                        <Row key={index}>
                                            <Col span={12}>
                                                <Form.Item
                                                    label={<span className='textStyles-small'>Section {index + 1} Name</span>}
                                                    name={`sectionName${index}`}
                                                    initialValue={selectedChecklist?.sections && isUpdate ? selectedChecklist?.sections[index]?.sectionName : ''}
                                                >
                                                    <Input
                                                        disabled={isUpdate && selectedChecklist?.sections[index]?.sectionName ? true : false}
                                                        style={{
                                                            width: '98%',
                                                            color: isUpdate ? 'black' : 'black'
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    label={<span className='textStyles-small'>Section Index</span>}
                                                    name={`sectionIndex${index}`}
                                                    initialValue={index + 1}
                                                >
                                                    <Input disabled={isUpdate ? true : false} style={{ width: '98%' }} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item
                                                    label={<span className='textStyles-small'>Section {index + 1} Description</span>}
                                                    name={`sectionDescription${index}`}
                                                    initialValue={selectedChecklist.sections && isUpdate ? selectedChecklist?.sections[index]?.sectionDescription : ''}
                                                >
                                                    <Input style={{ width: '100%' }} />
                                                </Form.Item>
                                            </Col>
                                            <Button type="primary" danger
                                                size='medium'
                                                icon={<DeleteOutlined />}
                                                onClick={() => setNoOfSections(noOfSections - 1)}>
                                                <span className='textStyles-small'> Drop Section </span>
                                            </Button>
                                        </Row>
                                    </div>
                                ))}
                            </div>

                            <Row style={{ marginTop: '10px' }}>
                                <Col span={24}>
                                    {
                                        isUpdate ? (
                                            <Button type="primary" htmlType="submit" style={{ width: '150px', marginLeft: '10px' }}><span className='textStyles-small'>
                                                Update Data</span> </Button>) :
                                            (
                                                <Button type="primary" htmlType="submit"><span className='textStyles-small'>
                                                    Save Data</span>
                                                </Button>
                                            )
                                    }

                                    <Button type="default" htmlType="reset" style={{ width: '100px', marginLeft: '10px', marginRight: '10px' }}><span className='textStyles-small'>
                                        Reset</span>
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                ) : (
                    <div style={{ backgroundColor: 'white', padding: '20px', marginTop: '10px', borderRadius: '10px' }}>
                        <Table
                            columns={Columns}
                            dataSource={allChecklists}
                            loading={loading}
                            size="small"
                        />
                    </div>
                )
            }
        </div>

        <Modal
            title={<span className='textStyles-small' style={{ fontSize: '16px' }}>
                <span className='textStyles-small' style={{ fontSize: '16px' }}>
                    {selectedChecklist.name}
                </span>
            </span>}
            visible={openInformationModal}
            onCancel={() => setOpenInformationModal(false)}
            footer={null}
            width={850}
        >
            <Descriptions
                layout="horizontal"
                bordered
                size='small'
                column={2}
            >
                <Descriptions.Item label={<span className='textStyles-small'>Checklist Name</span>}>
                    <span className='textStyles-small'>{selectedChecklist.name}</span>
                </Descriptions.Item>
                <Descriptions.Item label={<span className='textStyles-small'>Description</span>}>
                    <span className='textStyles-small'>{selectedChecklist.description}</span>
                </Descriptions.Item>
                <Descriptions.Item label={<span className='textStyles-small'>Created On</span>}>
                    <span className='textStyles-small'>{selectedChecklist.createdOn ? new Date(selectedChecklist.createdOn).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }) : ''}</span>
                </Descriptions.Item>
                <Descriptions.Item label={<span className='textStyles-small'>Updated On</span>}>
                    <span className='textStyles-small'>{selectedChecklist.updatedOn ? new Date(selectedChecklist.updatedOn).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }) : ''}</span>
                </Descriptions.Item>
                <Descriptions.Item label={<span className='textStyles-small'>Version</span>}>
                    <span className='textStyles-small'>{selectedChecklist.version}</span>
                </Descriptions.Item>
                <Descriptions.Item label={<span className='textStyles-small'>Active</span>}>
                    <span className='textStyles-small'>{selectedChecklist.isActive === true ? 'Yes' : 'No'}</span>
                </Descriptions.Item>
                <Descriptions.Item label={<span className='textStyles-small'>Sections Count</span>}>
                    <span className='textStyles-small'>{selectedChecklist.sectionCount}</span>
                </Descriptions.Item>
                <Descriptions.Item label={<span className='textStyles-small'>Checklist ID</span>}>
                    <span className='textStyles-small'>{selectedChecklist.checklistID}</span>
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
        </Modal>
    </div>;
};

export default Checklist;


