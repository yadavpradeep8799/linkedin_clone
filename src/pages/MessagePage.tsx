import React, { useState } from 'react';
import './MessagePage.css';
import MessageList from './MessageList';
import ChatArea from './ChatArea';
import MessageInput from './MessageInput';
import imag from '../assets/user.png'; 
import img from '../assets/pp.jpg';

// Dummy contacts data with the correct image references
const contacts = [
  { name: 'Pradeep Yadav', message: 'Your unique experience is a fit for Amazon SDE role.', date: 'Sep 14', img: img },
  { name: 'Jatin Dev Rajora', message: 'Interested in your profile for a new opportunity', date: 'Sep 6', img: imag },  
  { name: 'Mukul Dev Rajora', message: 'OK, no problem', date: 'Aug 27', img: imag }, 
  { name: 'Akshit Uppal', message: 'Excited to Discuss Lead Front End Developer Role', date: 'Sep 6', img: imag }, 
  { name: 'Arul Kumar ', message: 'Excited to Discuss Lead Front End Developer Role', date: 'Sep 6', img: imag },  
  { name: 'Aman', message: 'Interested in your profile for a new opportunity', date: 'Sep 6', img: imag },   
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
