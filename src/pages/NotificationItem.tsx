import React from 'react';

interface NotificationItemProps {
  notification: {
    id: number;
    type: string;
    message: string;
    time: string;
    status: string;
  };
  onMarkAsRead: (id: number) => void;
  onDismiss: (id: number) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onMarkAsRead, onDismiss }) => {
  return (
    <div className={`notification-item ${notification.status === 'read' ? 'read' : 'new'}`}>
      <div className="notification-content">
        <h4>{notification.type}</h4>
        <p>{notification.message}</p>
        <span>{notification.time}</span>
      </div>
      <div className="notification-actions">
        {notification.status === 'new' && (
          <button onClick={() => onMarkAsRead(notification.id)}>Mark as Read</button>
        )}
        <button onClick={() => onDismiss(notification.id)}>Dismiss</button>
      </div>
    </div>
  );
};

export default NotificationItem;
