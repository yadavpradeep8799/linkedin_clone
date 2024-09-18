// src/components/ChatArea.tsx
import React from 'react';

interface Contact {
  name: string;
  message: string;
  date: string;
  img: string;
}

interface ChatAreaProps {
  contact: Contact;
}

const ChatArea: React.FC<ChatAreaProps> = ({ contact }) => {
  return (
    <div className="chat-area-content">
      <div className="chat-header">
        <img src={contact.img} alt={contact.name} className="profile-pic" />
        <h2>{contact.name}</h2>
      </div>
      <div className="chat-messages">
        <p>Start your conversation with {contact.name}...</p>
      </div>
    </div>
  );
};

export default ChatArea;
