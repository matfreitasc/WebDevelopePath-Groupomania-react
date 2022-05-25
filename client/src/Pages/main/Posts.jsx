import React, { useEffect, useState, Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { axiosPrivate } from '../../api/axios';
import Like from '../../Components/layout/likeSystem/Like';
import useAuth from '../../hooks/useAuth';
import Modal from '../../Components/modal/CreatePost';
import Viewed from '../../Components/layout/viewedSystem/Viewed';

function Posts() {
  const { auth } = useAuth();
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (auth) {
      setUserId(auth.userId);
    }
  }, [auth]);

  const deletePost = async (postId) => {
    await axiosPrivate.delete(`/posts/${postId}`);
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const MarkAsViewed = (postId) => {
    axiosPrivate.post(`/posts/${postId}/viewes`, {
      userId: userId,
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchPost = async () => {
      try {
        const response = await axiosPrivate.get(`/posts/`, {
          signal: controller.signal,
        });
        setPosts(response.data);
      } catch (err) {
        navigate('/login', { state: { from: location }, replace: true });
      }
    };
    fetchPost();
    return () => {
      controller.abort();
    };
  }, [navigate, location]);

  return (
    <main>
      <Modal />
      <div className='min-w-[350px] overflow-x-hidden '>
        {posts.map((post) => (
          <div key={post.id}>
            <div className='container mx-auto flex justify-center mt-5 '>
              <div className='w-4/6 relative mb-2'>
                <div className='shadow sm:rounded-md sm:overflow-hidden'>
                  <div className='px-5 py-2 bg-white dark:bg-gray-900 space-y-3  '>
                    <div className='flex justify-between'>
                      <div>
                        <div
                          className='text-xs mb-2 dark:text-gray-400 block'
                          onClick={() => {
                            navigate(`/profile/${post.userId}`);
                            MarkAsViewed(post.id);
                          }}
                        >
                          Posted by:{' '}
                          <p className='inline-block hover:underline '>
                            {post.username}
                          </p>
                        </div>
                        <Viewed
                          postId={post.id}
                          postViewes={post.Viewes}
                          userId={userId}
                          postUserId={post.userId}
                        />
                      </div>

                      <Menu>
                        {userId === post.userId ? (
                          <Menu.Button className='origin-top-right '>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-4 w-4 fill-black dark:fill-white'
                              fill='none'
                              viewBox='0 0 24 24'
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
                          <Menu.Items className='absolute right-0 mr-2 top-8 w-fit rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none '>
                            <Menu.Item>
                              <button
                                onClick={() => {
                                  deletePost(post.id);
                                }}
                                className='block px-4 py-2'
                              >
                                Delete
                              </button>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                    <div>
                      <h1
                        className='text-2xl font-bold text-gray-900 dark:text-gray-100'
                        onClick={() => {
                          navigate(`/post/${post.id}`);
                          MarkAsViewed(post.id);
                        }}
                      >
                        {post.title}
                      </h1>

                      <p
                        className=' dark:text-gray-300 pb-4'
                        onClick={() => {
                          navigate(`/post/${post.id}`);
                          MarkAsViewed(post.id);
                        }}
                      >
                        {post.content}
                      </p>
                      {post.imageUrl ? (
                        <img
                          src={post.imageUrl}
                          alt='post'
                          className='w-full h-auto object-cover object-center rounded-md shadow-md pb-4'
                          onClick={() => {
                            navigate(`/post/${post.id}`);
                            MarkAsViewed(post.id);
                          }}
                        />
                      ) : null}
                    </div>
                    <div className='flex row justify-between'>
                      <Like userId={post.userId} postId={post.id} />
                      <p className='dark:text-white'>
                        {post.Viewes.length === 1
                          ? post.Viewes.length + ' View'
                          : post.Viewes.length + ' Viewes'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
} //end of function

export default Posts;
