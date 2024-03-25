import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  //the errors from the server will go in here.
  const [error, setError] = useState('')
  const navigate = useNavigate();

  function changeInputHandler(e) {
    setUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const registerUser = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post("http://localhost:5000/api/users/register", userData);

      const newUser = response.data;

      if (!newUser) {
        setError("Couldn't register user.")
      }

      navigate('/')

    }
    //if there is any error in the API
    //in axios we have this => err.response.data.message, so we are able to use it, in the try block we are using axios.
    catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <section className='register'>
      <div className="container">
        <h2>Sign Up</h2>
        <form className='form register__form' onSubmit={registerUser}>
          {error && <p className='form__error-message'>{error}</p>}

          <input type="text" placeholder='Full Name' name='name' value={userData.name} onChange={changeInputHandler} />

          <input type="email" placeholder='Email' name='email' value={userData.email} onChange={changeInputHandler} />

          <input type="password" placeholder='Password' name='password' value={userData.password} onChange={changeInputHandler} />

          <input type="password" placeholder='Confirm Password' name='confirmPassword' value={userData.confirmPassword} onChange={changeInputHandler} />

          <button className='btn primary'>Register</button>
        </form>
        <small>Already have an account? <Link to="/login">Sign in</Link> </small>
      </div>

    </section>
  )
}

export default Register