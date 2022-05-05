import React from 'react';
import { useEffect, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Navbar from '../../Layouts/navbar/Navbar';
import useAuth from '../../hooks/useAuth';

function Post() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  const { id } = useParams();
  const [post, setPost] = React.useState({});
  const [comments, setComments] = React.useState([]);
  const [comment, setComment] = React.useState('');
  const [userId, setUserId] = React.useState('');

  const deleteComment = async (commentId) => {
    await axiosPrivate.delete(`/comments/${commentId}`).then((res) => {
      setComments(comments.filter((comment) => comment.id !== commentId));
    });
  };

  useEffect(() => {
    if (auth) {
      setUserId(auth.userId);
    }
  }, [auth]);

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
    fetchPost();
    return () => {
      controller.abort();
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

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
        <div className='w-4/6'>
          <div className='shadow sm:rounded-md sm:overflow-hidden'>
            <div className='px-3 py-2 bg-white space-y-3 '>
              <p className='text-black font-semibold'>{post.title}</p>
              <p>{post.content}</p>
              <p className='text-right'>
                Created by: <a href='#'>{post.username}</a>
              </p>
            </div>

            <div className='px-3 py-2 bg-white space-y-3 '>
              <p className='text-black font-semibold mb-1'>Comments</p>
              <div>
                <form>
                  <div className='flex'>
                    <input
                      className='w-full p-2'
                      type='text'
                      placeholder='Comment'
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                    />
                    <button className='ml-2' onClick={addComment}>
                      Add
                    </button>
                  </div>
                </form>
              </div>
              {comments.map((comments, key) => (
                <div key={key} className='bg-gray-50 rounded-md p-2 relative'>
                  <a href='#'>
                    <span className='text-blue-500'>{comments.username}</span>
                  </a>
                  <Menu>
                    {userId === comments.userId ? (
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
                          <a
                            onClick={() => {
                              deleteComment(comments.id);
                            }}
                            className='blck px-4 py-72'
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
