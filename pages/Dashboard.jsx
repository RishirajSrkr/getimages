import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate, Link, useParams } from 'react-router-dom'
import axios from 'axios';
import Loader from '../component/Loader'

function Dashboard() {

  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);

  const token = currentUser?.jwtToken;

  //redirect to login page for any user who isn't logged in.
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])

  const [posts, setPosts] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/users/${id}`, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
        setPosts(response.data)
      }
      catch (err) {
        console.log(err);
      }
      finally {
        setIsLoading(false)
      }
    }

    fetchPosts();
  }, [id])

  console.log(posts);

  return (
    <section className='dashboard'>
      {
        posts?.length ?
          <div className="container dashboard__container">
            {
              posts.map((post) => {
                return <article key={post._id} className='dashboard__post'>
                  <div className="dashboard__post-info">
                    <div className="dashboard__post-thumbnail">
                      <img src={`http://localhost:5000/uploads/${post.thumbnail}`} alt="" />
                    </div>
                    <h5>{post.title}</h5>
                  </div>
                  <div className="dashboard__post-action">
                    <Link to={`/posts/${post.id}`} className="btn sm">View</Link>
                    <Link to={`/posts/${post._id}/edit`} className="btn sm primary">Edit</Link>
                    <Link to={`/posts/${post.id}/delete`} className="btn sm danger">Delete</Link>
                  </div>
                </article>
              })
            }
          </div>
          :
          <h2 className='center'>You have no posts yet.</h2>
      }
    </section>
  )
}

export default Dashboard;