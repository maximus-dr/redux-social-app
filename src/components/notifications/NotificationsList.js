import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectAllNotifications, fetchNotifications } from '../../store/slices/nofiticationsSlice';
import { selectAllUsers } from '../../store/slices/usersSlice';
import { parseISO } from 'date-fns';
import { formatDistanceToNow } from 'date-fns/esm';
import classnames from 'classnames';


export default function NotificationsList() {

  const dispatch = useDispatch();
  const notifications = useSelector(selectAllNotifications);
  const users = useSelector(selectAllUsers);
  const loadingStatus = useSelector(state => state.notifications.status);
  

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

    const notificationsClassname = classnames('notification', {
      new: notification.isNew
    })

    return (
      <div key={notification.id} className={notificationsClassname}>
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    );
  });


  let content;

  if (loadingStatus === 'loading') {
    content = <div className="loader">Loading...</div>
  } else if (loadingStatus === 'succeeded') {
    content = renderedNotifications;
  } else if (loadingStatus === 'failed') {
    content = <div>Error</div>
  }

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {content}
    </section>
  )
}
