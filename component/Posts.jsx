import React, { useEffect, useState } from 'react'
import PostItem from '../component/PostItem.jsx'
import Loader from '../component/Loader.jsx'
import axios from 'axios'

function Posts() {

    const [posts, setPosts] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get("http://localhost:5000/api/posts");
                setPosts(response?.data);
            }
            catch (err) {
                console.log(err);
            }

            setIsLoading(false)
        }

        fetchPosts();

    }, [])

    if (isLoading) {
        return <Loader />
    }

    return (
        <section className='posts'>
            {posts?.length > 0 ?
                <div className="container posts__container">
                    {posts.map(({ _id: id, thumbnail, category, description, title, creator, createdAt }) => (<PostItem key={id} postId={id} thumbnail={thumbnail} category={category} body={description} title={title} authorId={creator} createdAt={createdAt} />))}
                </div>
                :
                <h2 className='center'>No Posts Found!</h2>
            }
        </section>
    )
}

export default Posts