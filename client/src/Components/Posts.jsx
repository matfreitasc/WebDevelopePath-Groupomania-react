import React, { useEffect, useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import Navbar from '../Layouts/navbar/Navbar';
import { axios } from '../helpers/axios';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState('');
  let navigate = useNavigate();

  const deletePost = async (postId) => {
    await axios.delete(`/posts/${postId}`);
    setPosts(posts.filter((post) => post.id !== postId));
  };

  useEffect(() => {
    axios.get('/posts').then((res) => {
      setPosts(res.data);
    });
    axios.get('/auth').then((res) => {
      setUserId(res.data.id);
    });
  }, []);

  return (
    <div>
      <Navbar />
      {posts.reverse().map((post) => (
        <div
          key={post.id}
          className='container mx-auto flex justify-center mt-5 '
        >
          <div className='w-4/6'>
            <div className='shadow sm:rounded-md sm:overflow-hidden'>
              <div className='px-3 py-2 bg-white space-y-3 relative'>
                <p
                  className='text-black font-semibold'
                  onClick={() => {
                    navigate(`/post/${post.id}`);
                  }}
                >
                  {post.title}
                </p>
                <Menu>
                  {userId === post.userId ? (
                    <Menu.Button className='absolute top-2 right-3'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
                        />
                      </svg>
                    </Menu.Button>
                  ) : null}
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='origin-top-right absolute right-0 w-fit rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <Menu.Item>
                        <button
                          onClick={() => {
                            deletePost(post.id);
                          }}
                          className='blck px-4 py-2'
                        >
                          Delete
                        </button>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <p
                  onClick={() => {
                    navigate(`/post/${post.id}`);
                  }}
                >
                  {post.content}
                </p>

                {post.imageUrl ? (
                  <img
                    src={post.imageUrl}
                    alt='post'
                    className='w-full h-auto object-cover object-center rounded-md shadow-md'
                    onClick={() => {
                      navigate(`/post/${post.id}`);
                    }}
                  />
                ) : null}

                <div className='flex flex-row'>
                  <div className='ml-2 mr-2'>0 {post.likes}</div>
                  <div onClick={() => {}}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5'
                      />
                    </svg>
                  </div>
                  <div className='ml-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5'
                      />
                    </svg>
                  </div>
                  <div className='ml-2 mr-2'>0 {post.dislike}</div>
                  <p className='ml-auto'>
                    Created by: <a href='#'>{post.username}</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;
