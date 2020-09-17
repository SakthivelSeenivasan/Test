import React, { useState, useRef } from 'react';

import ContactView from './ContactView';
import { v4 } from 'uuid';
import AddUser from './AddUser';
import Button from 'antd/es/button';
import Select from 'antd/es/select';
import Drawer from 'antd/es/drawer';
import { useEffect } from 'react';
import ContactBody from './ContactBody';
import { Col, Menu, Row } from 'antd';
import {
  BellOutlined,
  MailOutlined,
  ContactsOutlined,
} from '@ant-design/icons';

const colors = [
  '#d4380d',
  '#120338',
  '#10239e',
  '#780650',
  '#874d00',
  '#ad8b00',
  '#3f6600',
  '#871400',
  '#873800',
  '#a8071a',
];

const { Option } = Select;
const randomNumber = () => {
  return Math.ceil(Math.random() * colors.length);
};

const ContactList = () => {
  const [viewUser, setviewUser] = useState(0);
  const [addUser, setAddUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentUserMsg, setCurrentUserMsg] = useState([]);
  const [otherUser, setOtherUser] = useState(null);
  const mainRef = useRef(null);
  const [list, setList] = useState([
    {
      key: v4(),
      email: 'vel@gmail.com',
      fullName: 'Dinesh KB',
      phone: 8940651334,
      companyName: 'Veltech',
      address: 'Cross Road2',
      avatarName: 'KB',
      color: colors[randomNumber()],
    },
    {
      key: v4(),
      email: 'sak@gmail.com',
      fullName: 'Deveraj Kangeyan',
      phone: 8940651334,
      companyName: 'SakthiTech',
      avatarName: 'DK',
      address: 'Cross Road2',
      color: colors[randomNumber()],
    },
  ]);

  const [curentUser, setCurrentUser] = useState(list[0]);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const mms = currentUserMsg?.messages;

  useEffect(() => {
    if (mainRef && mainRef.current) {
      mainRef.current.scrollIntoView();
    }
  }, [mms]);

  const addEditUser = (type, data, key) => {
    if (type === 'add') {
      setList([...list, data]);
    } else {
      const newList = list.map((li) => {
        if (li.key === key) {
          return data;
        }
        return li;
      });
      setList(newList);
    }
  };
  const sendMessage = () => {
    if (messages === '') {
      return;
    }
    let newMessages = messages;
    let index = newMessages.findIndex(
      (val) =>
        (val.key1 === curentUser.key || val.key2 === curentUser.key) &&
        (val.key1 === otherUser.key || val.key2 === otherUser.key)
    );

    if (index >= 0) {
      let newMessageData = { ...newMessages[index] };
      let messageQueue = [...newMessageData.messages];
      messageQueue.push({ key: curentUser.key, message: message, id: v4() });
      newMessageData.messages = messageQueue;
      newMessages[index] = newMessageData;
      setCurrentUserMsg(newMessageData);
      setMessages(newMessages);
    } else {
      let newMessageData = {
        key1: curentUser.key,
        key2: otherUser.key,
        messages: [{ key: curentUser.key, message: message, id: v4() }],
      };
      newMessages.push(newMessageData);
      setCurrentUserMsg(newMessageData);
      setMessages(newMessages);
    }
    setMessage('');
  };

  const setMessageData = (otherUsr) => {
    let newMessages = messages.filter(
      (val) =>
        (val.key1 === curentUser.key || val.key2 === curentUser.key) &&
        (val.key1 === otherUsr.key || val.key2 === otherUsr.key)
    );

    if (newMessages.length) {
      setCurrentUserMsg(newMessages[0]);
    } else {
      setCurrentUserMsg([]);
    }
  };

  return (
    <>
      <div>
        <Row>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ float: 'right' }}
          >
            <Menu.Item key="1">
              {<span style={{ color: '#000' }}>+Add</span>}
            </Menu.Item>
            <Menu.Item key="2">
              <MailOutlined style={{ color: '#000' }} />
            </Menu.Item>
            <Menu.Item key="3">
              <Select
                value={curentUser.key}
                className="select-after"
                onChange={(e) => {
                  const user = list.find((val) => val.key === e);
                  setCurrentUser(user);
                }}
              >
                {list.map((usVal) => (
                  <Option key={usVal.key} value={usVal.key}>
                    {usVal.fullName}
                  </Option>
                ))}
              </Select>
            </Menu.Item>
            <Menu.Item key="4">
              <BellOutlined style={{ color: '#000' }} />
            </Menu.Item>
          </Menu>
        </Row>
      </div>
      <hr style={{ color: '#f6f6f6' }} />
      <div className="container">
        <Col lg={16} md={16} sm={24} xs={24} style={{ padding: '16px' }}>
          <ContactsOutlined
            style={{
              fontSize: '40px',
              background: 'linear-gradient(90deg, #ff8075, #fe6c99)',
              float: 'left',
            }}
          />
          <h1
            style={{
              float: 'left',
              fontSize: '25px',
              margin: '-10px 10px',
              fontWeight: 'bold',
            }}
          >
            Contacts
          </h1>
          <br />
          <span
            style={{
              fontSize: '12px',
              color: '#d5d0d0',
              margin: '-10px 10px',
              fontWeight: 'bold',
            }}
          >
            Welcome to FlatCRM Contact Page
          </span>
        </Col>
        <div
          className="container"
          style={{ width: '100%', marginTop: '-30px' }}
        >
          <Col lg={16} md={16} sm={24} xs={24} style={{ padding: '16px' }}>
            <AddUser
              randomNumber={randomNumber}
              colors={colors}
              addEditUser={addEditUser}
              addUser={addUser}
              setAddUser={setAddUser}
            />
          </Col>
          <Col lg={16} md={16} sm={24} xs={24} style={{ padding: '16px' }}>
            <table>
              <thead>
                <tr>
                  <th>
                    <button style={{ padding: '0px 5px' }}>+</button>
                  </th>
                  <th>
                    <h3>Full Name</h3>
                  </th>
                  <th>
                    <h3>Company Name</h3>
                  </th>
                  <th>
                    <h3>Chat</h3>
                  </th>
                </tr>
              </thead>
              <tbody>
                <ContactBody
                  list={list}
                  curentUser={curentUser}
                  setviewUser={setviewUser}
                  setOtherUser={setOtherUser}
                  setVisible={setVisible}
                  setMessageData={setMessageData}
                />
              </tbody>
            </table>
          </Col>

          <Col lg={8} mg={8} sm={12} xs={24}>
            <Drawer
              title={otherUser?.fullName}
              placement="right"
              closable={false}
              onClose={() => setVisible(false)}
              visible={visible}
              width={'90%'}
            >
              <div className="message_container">
                <div className="messages">
                  {currentUserMsg?.messages?.map((msg, index) => {
                    let alignMsg =
                      msg.key === curentUser.key ? 'flex-end' : 'flex-start';
                    if (currentUserMsg?.messages.length === index + 1) {
                      return (
                        <div
                          key={msg.id}
                          className="message_bg"
                          style={{ alignSelf: alignMsg }}
                          ref={mainRef}
                        >
                          {msg.message}
                        </div>
                      );
                    }
                    return (
                      <div
                        key={msg.id}
                        className="message_bg"
                        style={{ alignSelf: alignMsg }}
                      >
                        {msg.message}
                      </div>
                    );
                  })}
                </div>
                <div className="send_massage--cotainer">
                  <form
                    className="message_input"
                    onSubmit={(e) => {
                      e.preventDefault();
                      sendMessage();
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="message"
                    />

                    <Button type="primary" onClick={sendMessage}>
                      Send
                    </Button>
                  </form>
                </div>
              </div>
            </Drawer>

            <div className="contact_view">
              <ContactView
                contact={list[viewUser] || null}
                color={randomNumber()}
                colors={colors}
              />
            </div>
          </Col>
        </div>
      </div>
    </>
  );
};

export default ContactList;
