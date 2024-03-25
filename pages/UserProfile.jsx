import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaCheck } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { UserContext } from '../context/userContext';
import axios from 'axios'

function UserProfile() {

  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const token = currentUser?.jwtToken;
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])

  const [error, seterror] = useState('')
  const [avatar, setAvatar] = useState('')
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');


  //fetch details from db and show them in the user detail page
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(`http://localhost:5000/api/users/${currentUser.id}`, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });

      const { name, email, avatar } = response.data;
      setname(name)
      setemail(email)
      setAvatar(avatar)
    }
    getUser();
  }, [])


  //to determine whether to show the avatar edit icon or not
  const [isAvatarTouched, setIsAvatarTouched] = useState(false)

  async function changeAvatarHandler() {
    setIsAvatarTouched(false)
    try {
      const postData = new FormData();
      postData.set('avatar', avatar);
      const response = await axios.post(`http://localhost:5000/api/users/change-avatar`, postData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })

      setAvatar(response?.data.avatar)
    }
    catch (err) {
      console.log(err);
    }
  }

  const updateUserDetail = async (e) => {
    e.preventDefault();
    try {

      const userData = new FormData();
      userData.set('name', name);
      userData.set('email', email)
      userData.set('currentPassword', currentPassword)
      userData.set('newPassword', newPassword)
      userData.set('confirmNewPassword', confirmNewPassword)

      const response = await axios.patch(`http://localhost:5000/api/users/edit-user`, userData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })

      if (response.status == 200) {
        //log the user out and ask the user to log in again
        navigate('/logout')
      }
    }
    catch (err) {
      seterror(err.response.data.message)
    }

  }


  return (
    <section className='profile'>
      <div className="container profile__container">
        <Link className="btn" to={`/myposts/${currentUser.id}`}>My Posts</Link>
        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img src={`http://localhost:5000/uploads/${avatar}`} alt={`profile image of ${currentUser.name}`} />
            </div>

            <form className="avatar__form">
              <input type="file" name="avatar" id='avatar' accept='png, jpg, jpeg' onChange={e => setAvatar(e.target.files[0])} />

              <label htmlFor="avatar" onClick={() => setTimeout(() => {
                setIsAvatarTouched(true)
              }, 400)}><FaEdit /></label>
            </form>

            {isAvatarTouched && <button className='profile__avatar-btn' onClick={changeAvatarHandler}>
              <FaCheck />
            </button>}

          </div>
          <h1>{currentUser.name}</h1>


          <form className="form profile__form" onSubmit={updateUserDetail}>
            {error && <p className='form__error-message'>{error}</p>}
            <input
              type="text"
              placeholder='Full name'
              value={name}
              onChange={(e) => setname(e.target.value)}
              name='name'
            />

            <input
              type="email"
              placeholder='Email'
              value={email}
              onChange={(e) => setemail(e.target.value)}
              name='email'
            />

            <input
              type="password"
              placeholder='current password'
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              name='currentPassword'
            />

            <input
              type="password"
              placeholder='New Pasword'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              name='newPassword'
            />

            <input
              type="password"
              placeholder='Confirm New Pasword'
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              name='confirmNewPassword'
            />

            <button type="submit" className='btn primary'>Update Details</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default UserProfile