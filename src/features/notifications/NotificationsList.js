import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectAllNotifications, fetchNotifications } from './nofiticationsSlice';
import { selectAllUsers } from './../users/usersSlice';
import { parseISO } from 'date-fns';
import { formatDistanceToNow } from 'date-fns/esm';

export default function NotificationsList() {

  const notifications = useSelector(selectAllNotifications);
  const users = useSelector(selectAllUsers);
  const loadingStatus = useSelector(state => state.notifications.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loadingStatus === 'idle') {
      dispatch(fetchNotifications());
    }
  }, [dispatch, loadingStatus]);

  const renderedNotifications = notifications.map(notification => {
    const date = parseISO(notification.date);
    const timeAgo = formatDistanceToNow(date);
    const user = users.find(user => user.id === notification.user) || {
      name: 'Unknown User'
    }

    return (
      <div key={notification.id} className="notification">
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    );
  });

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}
