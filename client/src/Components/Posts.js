import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Posts() {
  const [posts, setPosts] = React.useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    Axios.get('http://localhost:3001/api/posts').then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div>
      <Navbar />
      {posts.reverse().map((post) => (
        <div
          key={post.id}
          className='container mx-auto flex justify-center mt-5'
        >
          <div
            className='w-4/6'
            onClick={() => {
              navigate(`/post/${post.id}`);
            }}
          >
            <div className='shadow sm:rounded-md sm:overflow-hidden'>
              <div className='px-3 py-2 bg-white space-y-3'>
                <p className='text-black font-semibold'>{post.title}</p>
                <p>{post.content}</p>
                <p className='text-right'>
                  Created by: <a href='#'>{post.username}</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;
