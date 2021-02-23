import React, { useState } from 'react'
import { addNewUser } from './../../store/slices/usersSlice';
import { useDispatch } from 'react-redux';

export default function AddUser() {

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');

  const dispatch = useDispatch();
  const canSave = Boolean(name) && Boolean(lastName);

  const onNameChanged = e => setName(e.target.value);
  const onLastNameChanged = e => setLastName(e.target.value);

  const onSubmit = async () => {
    if (canSave) {
      try {
        dispatch(addNewUser({name, lastName}));
      } catch(err) {
        console.log(err);
      }
    }
    setName('');
    setLastName('');
  };

  return (
    <section>
      <h2>Add a new User</h2>

      <form>
        <label htmlFor="userName">User Name:</label>
        <input 
          type="text"
          id="userName"
          name="userName"
          value={name}
          onChange={onNameChanged}
        />

        <label htmlFor="userLastName">User Last Name:</label>
        <input 
          type="text"
          it="userLastName"
          name="userLastName"
          value={lastName}
          onChange={onLastNameChanged}
        />

        <button
          type="button"
          className="button"
          onClick={onSubmit}
          disabled={!canSave}
        >
          Add User
        </button>
      </form>
    </section>
  )
}
