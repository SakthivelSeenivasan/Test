import React from 'react';
import Button from 'antd/es/button';

const ContactBody = ({
  list,
  curentUser,
  setviewUser,
  setOtherUser,
  setVisible,
  setMessageData,
}) => {
  return list.map((contact, index) => {
    if (contact.key === curentUser.key) {
      return null;
    }
    return (
      <tr key={contact.key} className="user" onClick={() => setviewUser(index)}>
        <td>
          <input type="checkbox" />
        </td>
        <td>
          <div className="contact_name">
            <div
              className="contact_avatar"
              style={{ backgroundColor: contact.color }}
            >
              <h3 className="contact_avatar--letter">{contact.avatarName}</h3>
            </div>
            <div>
              <h2 className="fullName">{contact.fullName}</h2>
              <h5 className="email">{contact.email}</h5>
            </div>
          </div>
        </td>
        <td>{contact.companyName}</td>

        <td>
          <Button
            type="primary"
            onClick={() => {
              setOtherUser(contact);
              setVisible(true);
              setMessageData(contact);
            }}
          >
            Message
          </Button>
        </td>
      </tr>
    );
  });
};

export default ContactBody;
