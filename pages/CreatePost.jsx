import React, { useState, useContext, useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'

import axios from 'axios';

function CreatePost() {

  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.jwtToken;

  const [error, setError] = useState('')

  //redirect to login page for any user who isn't logged in.
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])


  const POST_CATEGORIES = ["Agriculture", "Business", "Education", "Entertainment", "Art", "Investment"]

  const [formData, setFormData] = useState({
    title: "",
    category: "Uncategorized",
    thumbnail: "",
  })
  const [description, setDescription] = useState("");

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


  function handleForm(e) {

    if (e.target.name === "thumbnail") {
      const selectedFile = e.target.files[0];
      if (!selectedFile || !selectedFile.type.match('image/.*')) {
        setError("Please select a valid image file.");
        return;
      }
      setFormData(prev => (
        { ...prev, [e.target.name]: selectedFile }
      ))
    }

    else {
      setFormData(prev => (
        { ...prev, [e.target.name]: e.target.value }
      ))
    }
  }

  async function createPost(e) {
    e.preventDefault();

    const postData = new FormData();
    postData.set('title', formData.title);
    postData.set('category', formData.category);
    postData.set('thumbnail', formData.thumbnail);
    postData.set('description', description);

    try {
      const response = await axios.post("http://localhost:5000/api/posts", postData,

        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` }

        }

      );

      if (response.status == 201) {
        return navigate('/')
      }
    }

    catch (error) {
      console.log("err");
      setError(error.response.data.message);
    }
  }

  return (
    <section className="create-post">
      <div className="container">
        <h2>Create Post</h2>
        {error && <p className='form__error-message'>{error}</p>}

        <form className="form create-post__form" onSubmit={createPost}>

          <input type="text"
            placeholder='Title'
            name='title'
            value={formData.title}
            onChange={(e) => handleForm(e)}
            autoFocus
          />
          <select
            name='category'
            value={formData.category}
            onChange={(e) => handleForm(e)}
          >

            {POST_CATEGORIES.map((category) => {
              return <option key={category}>{category}</option>
            })}
          </select>

          <ReactQuill
            modules={modules}
            formats={formats}
            value={description}
            onChange={setDescription}
          />

          <input type="file" name='thumbnail' onChange={(e) => handleForm(e)} accept='png, jpg, jpeg' />

          <button type='submit' className='btn primary'>Create Post</button>
        </form>
      </div>
    </section>
  )
}

export default CreatePost