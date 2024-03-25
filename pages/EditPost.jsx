import React, { useState, useContext, useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { UserContext } from '../context/userContext'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function EditPost() {

  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.jwtToken;

  //redirect to login page for any user who isn't logged in.
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])


  const POST_CATEGORIES = ["Agriculture", "Business", "Education", "Entertainment", "Art", "Investment"]

  const [title, settitle] = useState('');
  const [description, setdescription] = useState('');
  const [category, setcategory] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const [error, setError] = useState('');

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image"],
      ["clean"],
    ],
  }

  const formats = ["header", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image", "color", "clean",
  ];



  //getting the id of the post to edit
  const { id } = useParams();

  useEffect(() => {
    const getPostToEdit = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`);

        settitle(response.data.title)
        setdescription(response.data.description)
        setcategory(response.data.category)
      }
      catch (err) {
        console.log(err);
      }
    }
    getPostToEdit();
  }, [])

  const editPost = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.set('title', title);
    postData.set('description', description);
    postData.set('category', category);
    postData.set('thumbnail', thumbnail);

    try {
      const response = await axios.patch(`http://localhost:5000/api/posts/${id}`, postData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })

      if (response.status == 200) {
        return navigate('/');
      }
    }

    catch (err) {
      setError(err.response.data.message)
    }

  }

  return (
    <section className="createPost">
      <div className="container">
        <h2>Edit Post</h2>
        {error && <p className='form__error-message'>{error}</p>}

        <form className="form create-post__form" onSubmit={editPost}>
          <input type="text"
            placeholder='Title'
            name='title'
            value={title}
            onChange={(e) => settitle(e.target.value)}
            autoFocus
          />
          <select
            name='category'
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          >

            {POST_CATEGORIES.map((category) => {
              return <option key={category}>{category}</option>
            })}
          </select>

          <ReactQuill
            modules={modules}
            formats={formats}
            value={description}
            onChange={setdescription}
          />

          <input type="file"
            name='thumbnail'
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept='png, jpg, jpeg' />

          <button type='submit' className='btn primary'>Update</button>
        </form>
      </div>
    </section>
  )
}

export default EditPost