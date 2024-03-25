import React, { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
function Logout() {
  //when a user logs out, the user saved in localstorage must be set to null too
  const { setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();

  setCurrentUser(null)
  navigate('/login')
  
  return (
    <></>
  )
}

export default Logout