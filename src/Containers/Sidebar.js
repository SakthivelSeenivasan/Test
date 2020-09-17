import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  CalculatorOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons';
import ContactList from '../Components/ContactList';

const { Sider, Content } = Layout;

const SiderDemo = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggle = () => {
    console.log('asdfasd');
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      {collapsed}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {collapsed ? (
          <MenuUnfoldOutlined
            style={{ fontSize: '20px', color: '#fff', padding: '10px' }}
            onClick={toggle}
          />
        ) : (
          <MenuFoldOutlined
            style={{ fontSize: '20px', color: '#fff', padding: '10px' }}
            onClick={toggle}
          />
        )}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ marginTop: '50px' }}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            Contacts
          </Menu.Item>
          <Menu.Item key="2" icon={<CalculatorOutlined />}>
            Calc
          </Menu.Item>
          <Menu.Item key="3" icon={<FieldTimeOutlined />}>
            Timer
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <ContactList />
        </Content>
      </Layout>
    </Layout>
  );
};

export default SiderDemo;
