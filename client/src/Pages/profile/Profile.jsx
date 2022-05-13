import { React, useEffect, useState, Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Navbar from '../../Components/navbar/Navbar';
import useAuth from '../../hooks/useAuth';
import UserPost from '../../Components/layout/userposts/Post'; // The layout element for the user's posts

export default function Profile() {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState('');
  const [user] = useState('');

  useEffect(() => {
    if (auth) {
      setUserId(auth?.userId);
    }
  }, [auth]);

  useEffect(() => {
    if (userId) {
      axiosPrivate
        .get(`/posts/user/${userId}`)
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId]);

  return (
    <>
      <Navbar />
      <div className='flex justify-center mx-auto mt-2 h-10  '>
        <div className='absolute z-[-10]  max-w-xl  '>
          <img
            src='https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg'
            alt='Profile banner'
            className='object-cover w-full h-full rounded-lg'
          />
        </div>
      </div>
      <div className='max-w-xl px-8 py-4 mx-auto mt-[10rem] bg-white rounded-lg shadow-lg dark:bg-gray-100 '>
        <div className='flex justify-center -mt-16 md:justify-start'></div>
        <div className=''>
          <img
            className='object-cover w-20 h-20 border-2 border-logoOrange rounded-full  z-10dark:logoOrange'
            alt='Testimonial avatar'
            src='https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80'
          />
          <h2 className='mt-2 text-2xl font-semibold text-gray-800 dark:text-gray-600 md:mt-0 md:text-3xl z-10'>
            {auth?.username}
          </h2>

          <p className='mt-2 text-gray-600 dark:text-gray-200 z'>{user.bio}</p>

          <div className='flex justify-end mt-4'>
            <p className='text-xl font-medium text-blue-500 dark:text-blue-300'>
              {auth?.name}
            </p>
          </div>
        </div>
      </div>
      <div className='max-w-lg pt-1 mx-auto mt-2 bg-white rounded-lg shadow-lg dark:bg-gray-600 '>
        {/* Not a function? */}
        {console.log(posts)}
        {posts.length !== 0 &&
          posts.map((post) => (
            <UserPost
              key={post.id}
              userId={post.userId}
              postId={post.postId}
              username={post.username}
              imageUrl={post.imageUrl}
              content={post.content}
              postTitle={post.postTitle}
            />
          ))}
      </div>
    </>
  );
}
