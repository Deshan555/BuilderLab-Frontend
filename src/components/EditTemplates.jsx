import $ from "jquery";
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import DynamicForm from './DynamicForm';
import { useParams } from 'react-router-dom';
import React, { useEffect, useRef, useState } from "react";
import { apiExecutions } from './../api/api-call';
import ReactDOM from "react-dom";
import "./../styles.css";
import { Breadcrumb, Checkbox, InputNumber, Spin, Avatar, Notification, notification, Card, Skeleton, Switch, Table, Select, Input, Button, Row, Upload, Col, Dropdown, Tag, Modal, Steps, message, Form, DatePicker, TimePicker, Descriptions, Image, Tabs } from 'antd';
import { HighlightOutlined, PlusOutlined, DownOutlined, UploadOutlined, CheckOutlined, CloseOutlined, LoadingOutlined, MinusCircleOutlined, PlusCircleOutlined, DeleteOutlined, EditOutlined, SaveOutlined, ExclamationCircleOutlined, EyeOutlined } from '@ant-design/icons';
import "./../formBuilder.css";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

function EditTemplates({ json, sectionID }) {
    const { id } = useParams();
    const fb = useRef();
    const [formDataJson, setFormDataJson] = useState([]);
    const [checkList, setCheckList] = useState([]);
    const [selectedChecklist, setSelectedChecklist] = useState("telecom-maintenance-001");
    const [openModal, setOpenModal] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const formData = [json]; // Initialize formData with the passed JSON prop

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
                }
            }, 1000);
        });
        return () => {
            if (intervalId !== null) {
                clearInterval(intervalId);
            }
        };
    }, [formDataJson]);

    const preventive_maintenance_tasks = {
        gen_service: "Gen service",
        rectifier_service: "Rectifier service",
        battery_bank_service: "Battery bank service",
        inspection_and_testing: "Inspection and testing",
        cleaning_and_environmental_maintenance: "Cleaning and environmental maintenance",
        power_system_maintenance: "Power system maintenance",
        software_and_firmware_updates: "Software and firmware updates",
        cable_and_connector_maintenance: "Cable and connector maintenance",
        site_infrastructure_maintenance: "Site infrastructure maintenance",
        documentation_and_reporting: "Documentation and reporting"
    };

    const fetchAllChecklists = async () => {
        setIsLoading(true);
        try {
            const response = await apiExecutions.getChecklistsFetch();
            if (response?.data !== null) {
                setCheckList(response.data);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.error('An error occurred while fetching the checklists:', error);
        }
    }

    const onChange = (key) => {
        console.log(key);
    };

    const [form] = Form.useForm();

    const [key, setKey] = useState(1);
    const items = [
        {
            key: '1',
            label: (<span className="textStyles-small"><HighlightOutlined /> Form Builder</span>),
            children: (
                <div style={{ padding: "10px" }}>
                    <div id="fb-editor" ref={fb} />
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
        const { checklistName, sessionName, isActive, isDraft, version, sessionDescription, serviceType, changeLog } = values;
        if (formDataJson.length === 0) {
            notification.open({
                message: 'Checklist',
                description: 'Please create a form to save the checklist',
                icon: <CloseOutlined style={{ color: '#108ee9' }} />,
            });
            return;
        } else {
            const sessionJson = {
                checklistName,
                sessionName,
                isActive,
                isDraft,
                version,
                sessionDescription,
                serviceType,
                changeLog,
                template: formDataJson
            };
            createNewChecklist(sessionJson);
        }
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
                description: 'Checklist saved as draft',
                icon: <CheckOutlined style={{ color: '#108ee9' }} />,
            });
        } catch (error) {
            console.error('An error occurred while saving the draft:', error);
            notification.open({
                message: 'Checklist',
                description: 'Checklist save as draft failed',
                icon: <CloseOutlined style={{ color: '#108ee9' }} />,
            });
        }
    }

    const createNewChecklist = async (data) => {
        setIsLoading(true);
        try {
            const response = await apiExecutions.postChecklistsFetch(data);
            if (response.acknowledged === true) {
                notification.open({
                    message: 'Checklist',
                    description: 'Checklist created successfully',
                    icon: <CheckOutlined style={{ color: '#108ee9' }} />,
                });
                setIsLoading(false);
                setOpenModal(false);
            }
        } catch (error) {
            console.error('An error occurred while creating the checklist:', error);
            notification.open({
                message: 'Checklist',
                description: 'Checklist creation failed',
                icon: <CloseOutlined style={{ color: '#108ee9' }} />,
            });
            setIsLoading(false);
        }
    }

    return (
        <div className="bg-gray-100 p-4">
            <div style={{ padding: '5px', borderRadius: '10px' }}>
                <Spin spinning={isLoading} tip="Loading checklists...">
                    <div style={{ marginTop: "10px", backgroundColor: "white", padding: "10px", borderRadius: "10px" }}>
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
                </Spin>
            </div>
            <Modal
                title={<span className="textStyles-small" style={{ fontSize: "16px" }}>
                    Create New Section
                </span>}
                visible={openModal}
                onCancel={() => {
                    setOpenModal(false)
                }}
                footer={[
                    <Button key="back" onClick={() => setOpenModal(false)}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={isLoading} onClick={() => form.submit()}>
                        Save
                    </Button>,
                ]}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label={<span className="textStyles-small">Checklist Name</span>}
                        name="checklistName"
                        rules={[{ required: true, message: 'Please input your checklist name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={<span className="textStyles-small">Session Name</span>}
                        name="sessionName"
                        rules={[{ required: true, message: 'Please input your session name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="isActive"
                        label={<span className="textStyles-small">Is Active</span>}
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>

                    <Form.Item
                        name="isDraft"
                        label={<span className="textStyles-small">Save as Draft</span>}
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>

                    <Form.Item
                        name="version"
                        label={<span className="textStyles-small">Version</span>}
                        rules={[{ required: true, message: 'Please input the version!' }]}
                    >
                        <InputNumber />
                    </Form.Item>

                    <Form.Item
                        name="sessionDescription"
                        label={<span className="textStyles-small">Description</span>}
                        rules={[{ required: true, message: 'Please input the description!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="serviceType"
                        label={<span className="textStyles-small">Service Type</span>}
                        rules={[{ required: true, message: 'Please select the service type!' }]}
                    >
                        <Select>
                            {Object.entries(preventive_maintenance_tasks).map(([key, value]) => (
                                <Select.Option key={key} value={key}>{value}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="changeLog"
                        label={<span className="textStyles-small">Change Log</span>}
                        rules={[{ required: true, message: 'Please input the change log!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default EditTemplates;
