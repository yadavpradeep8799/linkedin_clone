import React from 'react';
import NotificationItem from './NotificationItem';

interface Notification {
  id: number;
  type: string;
  message: string;
  time: string;
  status: string;
}

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
  onDismiss: (id: number) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications, onMarkAsRead, onDismiss }) => {
  return (
    <div className="notification-list">
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        notifications.map(notification => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onMarkAsRead={onMarkAsRead}
            onDismiss={onDismiss}
          />
        ))
      )}
    </div>
  );
};

export default NotificationList;
