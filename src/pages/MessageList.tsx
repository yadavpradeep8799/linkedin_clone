// src/components/MessageList.tsx
import React from 'react';

interface Contact {
  name: string;
  message: string;
  date: string;
  img: string;
}

interface MessageListProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
  selectedContact: Contact;
}

const MessageList: React.FC<MessageListProps> = ({ contacts, onSelectContact, selectedContact }) => {
  return (
    <div className="message-list">
      {contacts.map((contact, index) => (
        <div
          key={index}
          className={`message-item ${selectedContact.name === contact.name ? 'selected' : ''}`}
          onClick={() => onSelectContact(contact)}
        >
          <img src={contact.img} alt={contact.name} className="profile-pic" />
          <div className="message-info">
            <h4>{contact.name}</h4>
            <p>{contact.message}</p>
            <span>{contact.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
