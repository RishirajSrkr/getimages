import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loader from '../component/Loader'
function Authors() {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchAuthors = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/users")

        setAuthors(response.data);
      }
      catch (err) {
        console.log(err);
      }

      setIsLoading(false)

    }

    fetchAuthors();
  }, [])

  if (isLoading) {
    return <Loader />
  }
  return (
    <section className='authors'>
      {authors.length > 0 ?
        <div className='container authors__container'>
          {authors.map(({ _id: id, avatar, name, posts }) => {
            return <Link className='author' key={id} to={`/posts/users/${id}`} >
              <div className='author__avatar'>
                <img src={`http://localhost:5000/uploads/${avatar}`} alt={`Image of ${name}`} />
              </div>
              <div className='author__info'>
                <h4>{name}</h4>
                <p>{posts}</p> 
              </div>
            </Link>
          })}
        </div>
        :
        <h2 className='center'>No Authors Found!</h2>
      }
    </section>
  )
}

export default Authors