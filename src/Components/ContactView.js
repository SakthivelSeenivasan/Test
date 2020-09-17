import React from 'react';
import ContactDetail from './ContactDetail';

const ContactView = ({ contact, color, colors }) => {
  if (!contact) return null;
  return (
    <div>
      <div className="view_container">
        <div
          className="contact_avatar"
          style={{ backgroundColor: colors[color] }}
        >
          <h3 className="contact_avatar--letter">{contact.avatarName}</h3>
        </div>
        <h2 className="contact_fullName">{contact.fullName}</h2>
        <h5>{contact.email}</h5>
      </div>
      <div className="view_details">
        <ContactDetail name="Full Name" value={contact.fullName} />
        <ContactDetail name="Email" value={contact.email} />
        <ContactDetail name="Phone" value={contact.phone} />
        <ContactDetail name="Company " value={contact.companyName} />
        <ContactDetail name="Address " value={contact.address} />
      </div>
    </div>
  );
};

export default ContactView;
