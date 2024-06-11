// src/App.js
import React from 'react';
import { Layout, Menu } from 'antd';
import Logo from './assets/logo.png';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  HomeOutlined,
  SettingOutlined,
  ExperimentOutlined
} from '@ant-design/icons';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './components/Home';
import Section1 from './components/Section1';
import './formBuilder.css';
import ViewForm from './components/ViewForm';
import Checklist from './components/Checklist';
import EditTemplates from './components/EditTemplates';
import TopLvl from './components/TopLvl';
import Example from './components/Three';
// import Section2 from './components/Section2';
// import Section3 from './components/Section3';
// import Section4 from './components/Section4';
// import Section5 from './components/Section5';

const { Header, Content, Sider } = Layout;

const App = () => (
  <Router>
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header sticky-header" style={{ position: 'fixed', zIndex: 1, width: '100%', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#2b2b2b', boxShadow: '0 2px 8px #f0f1f2' }}>
        <img src={Logo} alt="Logo" width={100} height={40} />
      </Header>
      <Layout style={{ marginTop: 62 }}>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            size="small"
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="1" icon={<ExperimentOutlined />}>
              <Link to="/">
                <span className='textStyles-small'>
                  Builder Lab
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<NotificationOutlined />}>
              <Link to="/checklist"><span className='textStyles-small'>Checklists</span></Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<LaptopOutlined />}>
              <Link to="/viewform"><span className='textStyles-small'>Inspections</span></Link>
            </Menu.Item>
            {/* <Menu.Item key="2" icon={<UserOutlined />}>
              <Link to="/section1"><span className='textStyles-small'>Wizard</span></Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<SettingOutlined />}>
              <Link to="/groups"><span className='textStyles-small'>Edit Templates</span></Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<SettingOutlined />}>
              <Link to="/example"><span className='textStyles-small'>Example</span></Link>
            </Menu.Item> */}
            {/* <Menu.Item key="2" icon={<UserOutlined />}>
              <Link to="/section1">Section 1</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<LaptopOutlined />}>
              <Link to="/section2">Section 2</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<NotificationOutlined />}>
              <Link to="/section3">Section 3</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<SettingOutlined />}>
              <Link to="/section4">Section 4</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<SettingOutlined />}>
              <Link to="/section5">Section 5</Link>
            </Menu.Item> */}
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 5px 5px' }}>
          {/* <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          > */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/section1" element={<Section1 />} />
            <Route path="/viewform" element={<ViewForm />} />
            <Route path="/checklist" element={<Checklist />} />
            {/* <Route path="/edittemplates/:id" element={<EditTemplates />} /> */}
            {/* <Route path="/groups" element={<TopLvl />} />
            <Route path="/example" element={<Example />} /> */}
            {/* <Route path="/section1" element={<Section1 />} />
              <Route path="/section2" element={<Section2 />} />
              <Route path="/section3" element={<Section3 />} />
              <Route path="/section4" element={<Section4 />} />
              <Route path="/section5" element={<Section5 />} /> */}
          </Routes>
          {/* </Content> */}
        </Layout>
      </Layout>
    </Layout>
  </Router>
);

export default App;
