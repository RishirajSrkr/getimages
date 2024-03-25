import React from 'react'
import PostAuthor from '../component/PostAuthor.jsx'
import { Link, useParams } from 'react-router-dom'

function PostItem({ postId, category, thumbnail, title, body, authorId, createdAt }) {

  const shortBody = body.length > 145 ? body.substr(0, 145) + '...' : body;
  const shortTitle = title.length > 30 ? title.substr(0, 30) + '...' : title;

  const { category: categoryId } = useParams();

  return (
    <article className='post'>
      <div className='post__thumbnail'>
        <img src={`http://localhost:5000/uploads/${thumbnail}`} alt={shortTitle} />
      </div>
      <div className='post__content'>
        <Link to={`/posts/${postId}`} >
          <h3>{shortTitle}</h3>
        </Link>
        <p dangerouslySetInnerHTML={{__html: shortBody}}/>
        <div className="post__footer">
          <PostAuthor authorId={authorId} createdAt={createdAt} />



          {!categoryId && <Link className='btn category' to={`posts/categories/${category}`}>{category}</Link>}

        </div>
      </div>
    </article>
  )
}

export default PostItem
