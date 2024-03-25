import React from 'react'
import LoaderGif from '../images/loader.gif'
function Loader() {
  return (
    <div className="loader">
      <div className="loader__image">
        <img src={LoaderGif} alt="" />
      </div>
    </div>
  )
}

export default Loader