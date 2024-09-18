import React, { useState } from 'react';
import './NotificationPage.css';
import NotificationList from './NotificationList';

const NotificationPage: React.FC = () => {
  // Sample notifications data
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'Connection Request', message: 'Pratik Kapasi wants to connect with you', time: '2 hours ago', status: 'new' },
    { id: 2, type: 'Job Alert', message: 'Amazon SDE role is a fit for your profile', time: '1 day ago', status: 'read' },
    { id: 3, type: 'Message', message: 'Hemant Kumar sent you a message', time: '3 days ago', status: 'new' },
    { id: 4, type: 'Profile View', message: 'Shruti Dixit viewed your profile', time: '1 week ago', status: 'read' },
  ]);

  // Mark a notification as read
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, status: 'read' } : notification
    ));
  };

  // Remove a notification
  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return (
    <div className="notification-page">
      <h2>Notifications</h2>
      <NotificationList
        notifications={notifications}
        onMarkAsRead={markAsRead}
        onDismiss={dismissNotification}
      />
    </div>
  );
};

export default NotificationPage;
