import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchNotifications } from '../features/notifications/nofiticationsSlice'


export default function Navbar() {

  const dispatch = useDispatch();

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
              <Link to="/notifications">Notifications</Link>
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
