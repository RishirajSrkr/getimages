import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../context/userContext.jsx'

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState('');
  const navigate = useNavigate();

  //getting the shared values from the usercontext.
  const { currentUser, setCurrentUser } = useContext(UserContext);

  function changeInputHandler(e) {
    setUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }



  async function loginUser(e) {
    e.preventDefault();
    setError('')

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", userData)

      const user = await response.data;
      // in server side, we are returning this on successfull login ->
      // res.status(200).json({ jwtToken, id, name })
      //this jwt token 
      //we will save this info in the localstorage
      setCurrentUser(user)

      navigate('/')
    }
    catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <section className='login'>
      <div className="container">
        <h2>Log in</h2>
        <form className='form login__form' onSubmit={loginUser}>
          {error && <p className='form__error-message'>{error}</p>}

          <input type="email" placeholder='Email' name='email' value={userData.email} onChange={changeInputHandler} autoFocus />

          <input type="password" placeholder='Password' name='password' value={userData.password} onChange={changeInputHandler} />

          <button className='btn primary'>Login</button>
        </form>
        <small>Don't have an account? <Link to="/register">Sign up</Link> </small>
      </div>
    </section>
  )
}

export default Login