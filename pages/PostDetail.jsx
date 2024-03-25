import React, { useContext, useEffect, useState } from 'react'
import PostAuthor from '../component/PostAuthor'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import DeletePost from './DeletePost'
import Loader from '../component/Loader'
import axios from 'axios'


function PostDetail() {

  const { id } = useParams();

  const [post, setPost] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsloding] = useState(false)


  const { currentUser } = useContext(UserContext);
  useEffect(() => {
    const getPost = async () => {
      setIsloding(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`)

        setPost(response.data);

      }
      catch (err) {
        setError(err)
      }
      
      setIsloding(false);

    }
    getPost();
  }, [])


  if (isLoading) {
    return <Loader />
  }

  return (
    <section className='post-detail'>
      {error && <p className='error'>{error}</p>}

      {post && <div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor authorId={post.creator} createdAt={post.createdAt} />

          {currentUser?.id == post?.creator && <div className="post-detail__buttons">
            <Link to={`/posts/${id}/edit`} className="btn sm primary" >Edit</Link>
            <DeletePost postId={id} />
          </div>}
        </div>
        <h1>{post.title}</h1>
        <div className='post-detail__thumbnail'>
          <img src={`http://localhost:5000/uploads/${post.thumbnail}`} alt="" />
        </div>
        <p dangerouslySetInnerHTML={{__html: post.description}}/>
      </div>}
    </section>
  )
}

export default PostDetail