import React, { useEffect, useRef } from "react";
import { apiExecutions } from './../api/api-call';
import ReactDOM from "react-dom";
import "./../styles.css";
import { Popconfirm, Empty, Checkbox, InputNumber, Spin, Avatar, Notification, notification, Card, Skeleton, Switch, Table, Select, Input, Button, Row, Upload, Col, Dropdown, Tag, Modal, Steps, message, Form, DatePicker, TimePicker, Descriptions, Image, Tabs, Divider, Breadcrumb } from 'antd';
import { HighlightOutlined, PlusOutlined, DownOutlined, UploadOutlined, CheckOutlined, CloseOutlined, LoadingOutlined, MinusCircleOutlined, PlusCircleOutlined, DeleteOutlined, EditOutlined, SaveOutlined, ExclamationCircleOutlined, EyeOutlined } from '@ant-design/icons';
import "./../formBuilder.css";
import Example from './Three';


const Checklist = () => {
    const [allChecklists, setAllChecklists] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [formVisible, setFormVisible] = React.useState(false);
    const [selectedChecklist, setSelectedChecklist] = React.useState({});
    const [isUpdate, setIsUpdate] = React.useState(false);
    const [noOfSections, setNoOfSections] = React.useState(0);
    const [openInformationModal, setOpenInformationModal] = React.useState(false);
    const [next, sextNext] = React.useState(0);
    const [tempGroupName, setTempGroupName] = React.useState('');
    const [sectionData, setSectionData] = React.useState([]);
    const [groupData, setGroupData] = React.useState([]);
    const [inputType, setInputType] = React.useState(0);
    const [dataInputModal, setDataInputModal] = React.useState(false);

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
                            setGroupData(record.groups);
                            setSectionData(record.sections);
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
            checklistID: isUpdate ? selectedChecklist?.checklistID : 'Checklist-' + Math.random().toString(36).substring(7),
            sectionCount: sectionData?.length,
            groupCount: groupData?.length,
            createdBy: values.createdBy,
            createdByMail: values.createdByMail,
            groups: groupData,
            sections: sectionData
        };
        if (isUpdate) {
            const response = await apiExecutions.updateChecklist(selectedChecklist._id, data);
            if (response?.acknowledged === true) {
                notification.success({
                    message: 'Checklist Updated',
                    description: 'Checklist has been updated successfully',
                });
                getChecklistsFetch();
                setFormVisible(false);
                sextNext(0);
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

    const slider = [
        {
            key: '1',
            label: <span className='textStyles-small'>Checklist Preview</span>,
            children: (
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
                    <Descriptions.Item label={<span className='textStyles-small'>Created By</span>}>
                        <span className='textStyles-small'>{selectedChecklist.createdBy}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label={<span className='textStyles-small'>Created By Mail</span>}>
                        <span className='textStyles-small'>{selectedChecklist.createdByMail}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label={<span className='textStyles-small'>Groups</span>} column={1} span={24}>
                        <Descriptions size='small' column={1} bordered>
                            {
                                selectedChecklist?.groups?.map((group, index) => (
                                    <Descriptions.Item
                                        label={<span className='textStyles-small'>{group?.groupName}</span>}
                                    >
                                        <span className='textStyles-small'>{group?.groupDescription}</span>
                                    </Descriptions.Item>
                                ))
                            }
                        </Descriptions>
                    </Descriptions.Item>
                    <Descriptions.Item label={<span className='textStyles-small'>Sections</span>}>
                        <Descriptions size='small' column={1} bordered>
                            {
                                selectedChecklist?.sections?.map((section, index) => (
                                    <Descriptions.Item
                                        label={<span className='textStyles-small'>{section?.sectionName}</span>}
                                    >
                                        <span className='textStyles-small'>{section?.sectionDescription}
                                            <Tag color="blue" style={{ marginLeft: '10px' }}>
                                                {
                                                    selectedChecklist?.groups?.filter(group => group.groupID === section.groupID)
                                                        .map((group, index) => (
                                                            <span className='textStyles-small'>{group?.groupName}</span>
                                                        ))
                                                }
                                            </Tag>
                                        </span>
                                    </Descriptions.Item>
                                ))
                            }
                        </Descriptions>
                    </Descriptions.Item>
                </Descriptions>
            )
        },
        {
            key: '2',
            label: <span className='textStyles-small'>Checklist Overview</span>,
            children: (
                <Example apiResponse={selectedChecklist} />
            )
        }
    ]

    const groupDataManagement = (values) => {
        const data = {
            groupName: values.groupName,
            groupDescription: values.groupDescription,
            groupID: Math.random().toString(36).substring(7)
        };
        setGroupData([...groupData, data]);
        message.success('Group Added Successfully');
    }

    const sectionDataManagement = (values) => {
        const data = {
            sectionName: values.sectionName,
            sectionDescription: values.sectionDescription,
            sectionID: Math.random().toString(36).substring(7),
            groupID: values.groupID
        };
        setSectionData([...sectionData, data]);
        message.success('Section Added Successfully');
    }

    const closeDataInputModal = () => {
        setDataInputModal(false);
    }

    const handleDeleteSections = (sectionID) => {
        const newSections = sectionData.filter(section => section.sectionID !== sectionID);
        setSectionData(newSections);
    };

    const handleDeleteGroups = (groupID) => {
        const newGroups = groupData.filter(group => group.groupID !== groupID);
        setGroupData(newGroups);
    }

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
                            {
                                next === 0 | next === 3 ? (
                                    <>
                                        <Row>
                                            <Col span={12}>
                                                <Form.Item
                                                    label={<span className='textStyles-small'>Checklist Name</span>}
                                                    name={'name'}
                                                    initialValue={selectedChecklist.name}
                                                    rules={[{ required: true, message: 'Please input your checklist name!' }]}
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
                                                    initialValue={selectedChecklist?.version}
                                                    rules={[{ required: true, message: 'Please input your version!' }]}
                                                >
                                                    <Input style={{ width: '98%' }} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    label={<span className='textStyles-small'>Created By (Name)</span>}
                                                    name={'createdBy'}
                                                    initialValue={selectedChecklist?.createdBy}
                                                    rules={[{ required: true, message: 'Please input creator name!' }]}
                                                >
                                                    <Input style={{ width: '98%' }} />
                                                </Form.Item>
                                            </Col>

                                            <Col span={12}>
                                                <Form.Item
                                                    label={<span className='textStyles-small'>Creator Email</span>}
                                                    name={'createdByMail'}
                                                    initialValue={selectedChecklist?.createdByMail}
                                                    rules={[{ required: true, message: 'Please input creator email!' }]}
                                                >
                                                    <Input
                                                        type="email"
                                                        style={{ width: '98%' }} />
                                                </Form.Item>
                                            </Col>

                                            <Col span={12}>
                                                <Form.Item
                                                    label={<span className='textStyles-small'>Is Active</span>}
                                                    name={'isActive'}
                                                    initialValue={selectedChecklist?.isActive}
                                                >
                                                    <Switch />
                                                </Form.Item>
                                            </Col>
                                        </Row> </>
                                ) : null
                            }
                            {
                                next === 1 || next === 3 ? (
                                    <>
                                        <div style={{ backgroundColor: '#faf9f9', padding: '10px', borderRadius: '10px' }}>
                                            <Row justify="space-between">
                                                <span className='textStyles-small' style={{ fontSize: '14px', marginTop: '10px', fontWeight: 'bold' }}>
                                                    Config Your Groups
                                                </span>
                                                <Button type="primary"
                                                    size='medium'
                                                    onClick={() => { setDataInputModal(true); setInputType(1); }}>
                                                    <span className='textStyles-small'>
                                                        <PlusCircleOutlined /> Add Group
                                                    </span>
                                                </Button>
                                            </Row>
                                        </div>
                                        <div style={{ backgroundColor: '#faf9f9', padding: '10px', borderRadius: '10px', marginTop: '10px' }}>
                                            <Row>
                                                {
                                                    groupData ? groupData.map((data, index) => (
                                                        <Card style={{ width: 320, marginTop: 10, marginLeft: 10 }} loading={false}>
                                                            <div>
                                                                <Row>
                                                                    <Col span={20}>
                                                                        <span className="textStyles-small" style={{ fontSize: '14px' }}>
                                                                            {data?.groupName}</span>
                                                                        <br />
                                                                        <span className="textStyles-small">{data?.groupDescription}</span>
                                                                    </Col>
                                                                    <Col span={4}>
                                                                        <Popconfirm
                                                                            title="Are you sure to delete this item?"
                                                                            onConfirm={() => handleDeleteGroups(data.groupID)}
                                                                            okText="Yes"
                                                                            cancelText="No"
                                                                            style={{ marginTop: 10 }}
                                                                        >
                                                                            <Button type="primary" danger icon={<DeleteOutlined />} shape="circle" size="medium" />
                                                                        </Popconfirm>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </Card>
                                                    )) : null
                                                }
                                            </Row>
                                        </div>

                                        {
                                            groupData.length === 0 ? (
                                                <Empty
                                                    style={{ marginTop: '30px' }}
                                                    description={<span className='textStyles-small'>No Group Created Yet</span>} />
                                            ) : null
                                        }
                                    </>
                                ) : null
                            }
                            {
                                next === 2 || next === 3 ? (
                                    <>
                                        <div style={{ backgroundColor: '#faf9f9', padding: '10px', borderRadius: '10px', marginTop: '10px' }}>
                                            <Row justify="space-between">
                                                <span className='textStyles-small' style={{ fontSize: '14px', marginTop: '10px', fontWeight: 'bold' }}>
                                                    Config Your Sections
                                                </span>
                                                <Button type="primary"
                                                    size='medium'
                                                    onClick={() => { setDataInputModal(true); setInputType(0); }}>
                                                    <span className='textStyles-small'>
                                                        <PlusCircleOutlined /> Add Section</span>
                                                </Button>
                                            </Row>
                                        </div>

                                        <div style={{ marginTop: '10px', backgroundColor: '#faf9f9', padding: '10px', borderRadius: '10px' }}>
                                            <Row>
                                                {
                                                    sectionData ? sectionData.map((data, index) => (
                                                        <Card style={{ width: 320, marginTop: 10, marginLeft: 10 }} loading={false}>
                                                            <div>
                                                                <Row>
                                                                    <Col span={20}>
                                                                        <span className="textStyles-small" style={{ fontSize: '14px' }}>
                                                                            {data?.sectionName}
                                                                        </span>
                                                                        <Tag color="blue" style={{ marginLeft: '10px' }}>
                                                                            <span className="textStyles-small">{data?.groupID}</span>
                                                                        </Tag>
                                                                        <br />
                                                                        <span className='textStyles-small'>{data?.sectionDescription}</span>
                                                                    </Col>
                                                                    <Col span={4}>
                                                                        <Popconfirm
                                                                            title="Are you sure to delete this item?"
                                                                            onConfirm={() => handleDeleteSections(data.sectionID)}
                                                                            okText="Yes"
                                                                            cancelText="No"
                                                                            style={{ marginTop: 10 }}
                                                                        >
                                                                            <Button type="primary" danger icon={<DeleteOutlined />} shape="circle" size="medium" />
                                                                        </Popconfirm>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </Card>
                                                    )) : null
                                                }
                                            </Row>
                                        </div>
                                        {
                                            sectionData.length === 0 ? (
                                                <Col span={24}>
                                                    <Empty
                                                        style={{ marginTop: '30px' }}
                                                        description={<span className='textStyles-small'>No Section Created Yet</span>} />
                                                </Col>
                                            ) : null
                                        }
                                    </>
                                ) : null
                            }
                            {
                                next === 3 ? (
                                    <Row style={{ marginTop: '30px' }}>
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
                                ) : null
                            }
                        </Form>
                        <Divider />
                        <Row justify={'end'}>
                            <Col span={24} style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                                {
                                    next > 0 ? (
                                        <Button type="primary" size='medium' style={{ width: '80px', marginRight: '10px' }} danger
                                            onClick={() => sextNext(next - 1)}>
                                            <span className='textStyles-small'>Back</span>
                                        </Button>
                                    ) : null
                                }
                                {
                                    next !== 3 ? (
                                        <Button type="primary" size='medium' style={{ width: '80px' }}
                                            onClick={() => sextNext(next + 1)}>
                                            <span className='textStyles-small'>Next</span>
                                        </Button>
                                    ) : null
                                }
                            </Col>
                        </Row>
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
            <Tabs
                defaultActiveKey="1"
                items={slider}
            />
        </Modal>

        {/* <Modal
            title={<span className='textStyles-small' style={{ fontSize: '16px' }}>
                <span className='textStyles-small' style={{ fontSize: '16px' }}>
                    {selectedChecklist.name}
                </span>
            </span>}
            visible={true}
            onCancel={() => setOpenInformationModal(false)}
            footer={null}
            width={850}
        >
            <Example 
            apiResponse={{
                "12": {
                    "_id": "6656ec8c067bfe75cf1316e3",
                    "name": "deshan jayashanka's checklist",
                    "description": "deshan jayashanka's checklist for testing",
                    "version": "V1.0.0",
                    "isActive": true,
                    "checklistID": "Checklist-xwns7",
                    "sectionCount": 3,
                    "groups": [
                        {
                            "groupName": "Fire Fighting",
                            "groupDescription": "Fire Fighting Description",
                            "groupID": "kazxbb"
                        },
                        {
                            "groupName": "Gen-V01",
                            "groupDescription": "Gen-V01 Description",
                            "groupID": "puyro"
                        }
                    ],
                    "sections": [
                        {
                            "sectionName": "Baic Informations",
                            "sectionDescription": "Baic Informations Des",
                            "sectionIndex": 1,
                            "sectionID": "9ot7x",
                            "groupName": "Fire Fighting"
                        },
                        {
                            "sectionName": "Baic Informations",
                            "sectionDescription": "Baic Informations Des",
                            "sectionIndex": 2,
                            "sectionID": "8qiw4h",
                            "groupName": "Gen-V01"
                        },
                        {
                            "sectionName": "Site Condition",
                            "sectionDescription": "Site Condition Des",
                            "sectionIndex": 3,
                            "sectionID": "c7co0x",
                            "groupName": "Gen-V01"
                        }
                    ],
                    "createdOn": "2024-05-29T08:51:24.592Z",
                    "updatedOn": "2024-05-29T09:41:36.244Z"
                }
            }}
            />
        </Modal> */}
        <Modal
            title={<span className='textStyles-small' style={{ fontSize: '14px' }}>
                {inputType === 0 ? 'Section Management' : 'Groups Management'}
            </span>}
            visible={dataInputModal}
            onCancel={() => closeDataInputModal()}
            width={500}
            footer={null}
            destroyOnClose={true}
        >
            <div style={{ marginTop: '20px' }}>
                {
                    inputType === 0 ? (
                        <Form
                            onFinish={(values) => sectionDataManagement(values)}
                            onFinishFailed={(errorInfo) => {
                                message.error(`Failed: ${errorInfo.errorFields[0].errors[0]}`);
                            }}
                            layout="vertical">
                            <Form.Item
                                label={<span className='textStyles-small'>Section Name</span>}
                                name='sectionName'
                                rules={[{ required: true, message: 'Please input your section name!' }]}
                            >
                                <Input
                                    style={{
                                        width: '98%',
                                        color: isUpdate ? 'black' : 'black'
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                label={<span className='textStyles-small'>Section Description</span>}
                                name='sectionDescription'
                            >
                                <Input style={{ width: '98%' }} />
                            </Form.Item>
                            <Form.Item
                                label={<span className='textStyles-small'>Group Name</span>}
                                name='groupID'
                                rules={[{ required: true, message: 'Please select your group name!' }]}
                            >
                                <Select style={{ width: '98%' }}>
                                    {
                                        groupData?.map((group, index) => (
                                            <Select.Option key={index} value={group.groupID}>
                                                {group.groupName}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                            <Col span={24} justify="end">
                                <Button type="default" danger htmlType="reset" style={{ width: '120px' }}>
                                    <span className='textStyles-small'>Reset</span>
                                </Button>

                                <Button type="primary" htmlType="submit" style={{ width: '120px', marginLeft: '10px' }}>
                                    <span className='textStyles-small'>Save Session</span>
                                </Button>
                            </Col>
                        </Form>
                    ) : null
                }

                {
                    inputType === 1 ? (
                        <Form
                            onFinish={(values) => groupDataManagement(values)}
                            onFinishFailed={(errorInfo) => {
                                message.error(`Failed: ${errorInfo.errorFields[0].errors[0]}`);
                            }}
                            layout="vertical">
                            <Form.Item
                                label={<span className='textStyles-small'>Group Name</span>}
                                name='groupName'
                                rules={[{ required: true, message: 'Please input your group name!' }]}
                                onChange={(e) => {
                                    setTempGroupName(e.target.value);
                                }}
                            >
                                <Input
                                    style={{
                                        width: '98%',
                                        color: isUpdate ? 'black' : 'black'
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                label={<span className='textStyles-small'>Group Description</span>}
                                name='groupDescription'
                            >
                                <Input style={{ width: '98%' }} />
                            </Form.Item>
                            <Col span={24} justify="end">
                                <Button type="default" danger htmlType="reset" style={{ width: '120px' }}>
                                    <span className='textStyles-small'>Reset</span>
                                </Button>

                                <Button type="primary" htmlType="submit" style={{ width: '120px', marginLeft: '10px' }}>
                                    <span className='textStyles-small'>Save Group</span>
                                </Button>
                            </Col>
                        </Form>
                    ) : null
                }
            </div>
        </Modal>
    </div>;
};

export default Checklist;


