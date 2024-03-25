import React, { useContext, useEffect } from 'react'

import { UserContext } from '../context/userContext'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import axios from 'axios'

function DeletePost({ postId: id }) {

  const navigate = useNavigate();
  const location = useLocation();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.jwtToken;


  //redirect to login page for any user who isn't logged in.
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])

  async function removePost() {
    try {
      const response = await axios.delete(`http://localhost:5000/api/posts/${id}`, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })
      if (response.status == 200) {
        if (location.pathname == `/myposts/${currentUser.id}`) {
          navigate(0);
        }
        else {
          navigate('/')
        }
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <Link className='btn sm danger' onClick={() => removePost(id)}>Delete</Link>
  )
}

export default DeletePost