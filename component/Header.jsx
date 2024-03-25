import React, { useState, useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../images/logo.jpg'
import { MdOutlineMenu } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";

import { UserContext } from '../context/userContext.jsx'

function Header() {
  const [navShow, setNavShow] = useState(window.innerWidth > 800 ? true : false);

  const { currentUser } = useContext(UserContext);
  // console.log(currentUser.id); if a user is logged in we will have a user id in the currentuser object

  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setNavShow(false)
    }
    else setNavShow(true)
  }

  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className="nav__logo" onClick={closeNavHandler}>
          GetImage
        </Link>
        {currentUser?.id && navShow && <ul className='nav__menu'>
          <li><Link to={`/profile/${currentUser.id}`} onClick={closeNavHandler} >{currentUser.name}</Link></li>
          <li><Link to="/create" onClick={closeNavHandler}>Create Post</Link></li>
          <li><Link to="/authors" onClick={closeNavHandler}>Authors</Link></li>
          <li><Link to="/logout" onClick={closeNavHandler}>Logout</Link></li>
        </ul>}

        {!currentUser?.id && navShow && <ul className='nav__menu'>
          <li><Link to="/authors" onClick={closeNavHandler}>Authors</Link></li>
          <li><Link to="/login" onClick={closeNavHandler}>Login</Link></li>
        </ul>}

        <button className='nav__toggle--btn' onClick={() => setNavShow(!navShow)}>

          {
            navShow ? <IoCloseSharp /> : <MdOutlineMenu />
          }
        </button>
      </div>


    </nav>
  )
}

export default Header