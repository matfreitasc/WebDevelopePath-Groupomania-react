import React from 'react';
import { useEffect, Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Navbar from '../../Components/navbar/Navbar';
import useAuth from '../../hooks/useAuth';

function Post() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [userId] = useState(auth?.userId);
  const [showEdit, setShowEdit] = useState(false);

  const deleteComment = async (commentId) => {
    await axiosPrivate.delete(`/comments/${commentId}`).then((res) => {
      setComments(comments.filter((comment) => comment.id !== commentId));
    });
  };
  const deletePost = async (postId) => {
    await axiosPrivate.delete(`/posts/${postId}`).then((res) => {
      navigate('/');
    });
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchPost = async () => {
      try {
        const response = await axiosPrivate.get(`/posts/${id}`, {
          signal: controller.signal,
        });
        isMounted && setPost(response.data);
      } catch (err) {
        navigate('/login', { state: { from: location }, replace: true });
      }
    };
    const fetchComments = async () => {
      try {
        const response = await axiosPrivate.get(`/comments/${id}`, {
          signal: controller.signal,
        });
        isMounted && setComments(response.data);
      } catch (err) {
        navigate('/login', { state: { from: location }, replace: true });
      }
    };
    fetchComments();
    fetchPost();
    return () => {
      controller.abort();
      isMounted = false;
    };
  }, []);
  const addComment = () => {
    axiosPrivate
      .post(
        `/comments`,
        {
          commentBody: comment,
          PostId: id,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (userId === '' || userId == null) {
        } else {
          setComments([...comments, res.data]);
          setComment('');
        }
      });
  };

  return (
    <div>
      <Navbar />
      <div className='container mx-auto flex justify-center mt-5'>
        <div className='w-4/6 relative mb-10'>
          <div className='shadow sm:rounded-md sm:overflow-hidden'>
            <div className='px-5 py-2 bg-white dark:bg-gray-900 space-y-3 '>
              <div className='flex justify-between'>
                <div>
                  <div
                    className='text-xs mb-2 dark:text-gray-400 block'
                    onClick={() => {
                      navigate(`/profile/${post.userId}`);
                    }}
                  >
                    Posted by: ‎
                    <p className='inline-block hover:underline '>
                      {post.username}
                    </p>
                  </div>
                  {userId === post.userId ? (
                    <input
                      type='text'
                      value={post.title}
                      className='text-black font-bold text-xl dark:text-white bg-transparent'
                      onChange={(e) =>
                        setPost({ ...post, title: e.target.value })
                      }
                      onBlur={() => {
                        axiosPrivate
                          .put(`/posts/${id}`, {
                            title: post.title,
                            body: post.body,
                            userId: post.userId,
                          })
                          .then((res) => {
                            setPost(res.data);
                            window.location.reload();
                          });
                      }}
                    />
                  ) : (
                    <p className='text-black font-semibold text-xl dark:text-white'>
                      {post.title}
                    </p>
                  )}
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
                            setShowEdit(true);
                          }}
                          className='block px-4 py-2'
                        >
                          Edit
                        </button>
                      </Menu.Item>
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
              <p className=' dark:text-gray-300'>{post.content}</p>
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
            </div>

            <div className='px-3 py-2 bg-white space-y-3 dark:bg-gray-900'>
              <p className='text-black font-semibold mb-1 dark:text-white'>
                Comments
              </p>
              <div>
                <form>
                  <div className='flex'>
                    <input
                      className='w-full p-2 bg-transparent dark:text-white dark:placeholder-white'
                      type='text'
                      placeholder='Comment'
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                    />
                    <button
                      className='ml-2 dark:text-white'
                      onClick={addComment}
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
              {comments.map((comments, key) => (
                <div
                  key={key}
                  className='bg-gray-50 rounded-md p-2 relative dark:bg-gray-900 dark:text-white '
                >
                  <p>
                    <span className='text-blue-500 dark:text-gray-500'>
                      {comments.username}
                    </span>
                  </p>
                  <Menu>
                    {userId === comments.userId ? (
                      <Menu.Button className='absolute top-2 right-3'>
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
                      <Menu.Items className='origin-top-right absolute right-0 w-fit rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none dark:ring-white dark:bg-gray-700'>
                        <Menu.Item>
                          <a
                            onClick={() => {
                              deleteComment(comments.id);
                            }}
                            className='blck px-4 py-72 dark:text-white'
                          >
                            Delete
                          </a>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  <p>{comments.commentBody}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
