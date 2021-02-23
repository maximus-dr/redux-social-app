import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchNotifications, selectAllNotifications } from '../store/slices/nofiticationsSlice'


export default function Navbar() {

  const dispatch = useDispatch();
  const notifications = useSelector(selectAllNotifications);
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  let unreadNotificationsBadge = unreadNotificationsCount > 0 
    ? <span className="badge">
        {unreadNotificationsCount}
      </span>
    : null;

  const refreshNotifications = () => {
    dispatch(fetchNotifications());
  }

  
  return (
    <nav>
      <section>
        <h1>Redux social app example</h1>

        <div className="nav">
          <div className="navContent">
            <div className="navLinks">
              <Link to="/">Posts</Link>
              <Link to="/users">Users</Link>
              <Link to="/notifications">
                Notifications {unreadNotificationsBadge}
              </Link>
            </div>
          </div>

          <button className="button refresh" onClick={refreshNotifications}>
            Refresh Notifications
          </button>
        </div>

      </section>
    </nav>
  )
}
