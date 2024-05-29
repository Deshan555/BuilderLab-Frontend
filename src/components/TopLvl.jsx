import React, { useEffect, useRef, useState } from "react";
import { apiExecutions } from './../api/api-call';
import ReactDOM from "react-dom";
import "./../styles.css";
import { Checkbox, InputNumber, Spin, Avatar, Notification, notification, Card, Skeleton, Switch, Table, Select, Input, Button, Row, Upload, Col, Dropdown, Tag, Modal, Steps, message, Form, DatePicker, TimePicker, Descriptions, Image, Tabs, Divider, Breadcrumb } from 'antd';
import { HighlightOutlined, PlusOutlined, DownOutlined, UploadOutlined, CheckOutlined, CloseOutlined, LoadingOutlined, MinusCircleOutlined, PlusCircleOutlined, DeleteOutlined, EditOutlined, SaveOutlined, ExclamationCircleOutlined, EyeOutlined } from '@ant-design/icons';
import "./../formBuilder.css";

const TopLvl = () => {
    const [allGroups, setAllGroups] = useState([]);
    const [allSections, setAllSections] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchAllGroupsList();
     //   fetchAllSectionsList();
    }, []);

    const fetchAllGroupsList = async () => {
        const response = await apiExecutions.fetchAllGroups();
        if (response) {
            setAllGroups(response);
            setIsLoading(false);
        }
    }

    return (
        <div>
        <h1>Top Level Component</h1>
        </div>
    );
    }

export default TopLvl;