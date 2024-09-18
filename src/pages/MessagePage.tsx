import React, { useState } from 'react';
import './MessagePage.css';
import MessageList from './MessageList';
import ChatArea from './ChatArea';
import MessageInput from './MessageInput';
import imag from '../assets/user.png';  // Correct image imports
import img from '../assets/pp.jpg';

// Dummy contacts data with the correct image references
const contacts = [
  { name: 'Pratik Kapasi', message: 'Your unique experience is a fit for Amazon SDE role.', date: 'Sep 14', img: img },  // Use img variable
  { name: 'Hemant Kumar', message: 'Excited to Discuss Lead Front End Developer Role', date: 'Sep 6', img: imag },  // Use imag variable
  { name: 'Shruti Dixit', message: 'Interested in your profile for a new opportunity', date: 'Sep 6', img: imag },  // Use imag variable
  { name: 'Sanya Bansal', message: 'OK, no problem', date: 'Aug 27', img: img },  // Use img variable
];

const MessagePage: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      alert(`Message sent to ${selectedContact.name}: ${newMessage}`);
      setNewMessage('');
    }
  };

  return (
    <div className="messaging-page">
      <aside className="sidebar">
        <MessageList contacts={contacts} onSelectContact={setSelectedContact} selectedContact={selectedContact} />
      </aside>
      <main className="chat-area">
        <ChatArea contact={selectedContact} />
        <MessageInput value={newMessage} onChange={setNewMessage} onSend={handleSendMessage} />
      </main>
    </div>
  );
};

export default MessagePage;
