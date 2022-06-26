import { React, useEffect, useState, Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import Navbar from '../../Components/layout/navbar/Navbar';
import useAuth from '../../hooks/useAuth';
import UserPost from '../../Components/layout/userposts/Post';

export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const [posts, setPosts] = useState([]);
  const [userBio, setUserBio] = useState();
  const [name, setName] = useState();
  const [showEdit, setShowEdit] = useState(false);
  const [username, setUsername] = useState();
  const [userImage, setUserImage] = useState();
  const [userBanner, setUserBanner] = useState();
  const [userId, setUserId] = useState();
  const userIdfromURL = location.pathname.split('/')[2];

  useEffect(() => {
    axiosPrivate
      .get(`/posts/user/${userIdfromURL}`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate('/login', { state: { from: location }, replace: true });
        }
      });
  }, [userIdfromURL, axiosPrivate, navigate, location]);
  useEffect(() => {
    axiosPrivate
      .get(`/auth/user/${userIdfromURL}`, {
        withCredentials: true,
      })

      .then((res) => {
        setUserId(res.data.userId);
        setUsername(res.data.username);
        setUserBio(res.data.bio);
        setUserImage(res.data.profilePicture);
        setUserBanner(res.data.profileBanner);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate('/login', { state: { from: location }, replace: true });
        }
      });
  }, [userIdfromURL, axiosPrivate, navigate, location]);

  return (
    <Fragment>
      <Navbar />
      <main className='mx-auto flex-col max-w-xl mt-5'>
        <section className='rounded-lg shadow-md h-60'>
          <div className='h-full px-auto'>
            <img
              alt='background'
              className='w-full object-cover object-center rounded-md shadow-md'
              src={userBanner}
            />
          </div>

          <div className='rounded-b-md relative top-[-95px] bg-white pb-2'>
            <div className='rounded-b-md px-5 pb-2 bg-transparent relative '>
              <div className=' h-10'>
                <div className=' w-16 h-16 mr-auto bg-white border-logoOrange border-2 rounded-full bottom-[2rem] relative'>
                  <img
                    className='w-full h-full object-cover object-center rounded-full'
                    src={userImage}
                    alt='Default user is a cat'
                  />
                </div>
                <div>
                  <Menu>
                    {userId === auth.userId ? (
                      <Menu.Button className='origin-top-right '>
                        <DotsVerticalIcon className='text-gray-600 absolute top-2 right-2 w-5 h-5' />
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
                      <Menu.Items className='absolute right-0 mr-2 top-8 w-fit rounded-md shadow-lg py-1 bg-gray-400 ring-1 ring-black ring-opacity-5 focus:outline-none '>
                        <Menu.Item>
                          <button
                            onClick={() => {
                              if (
                                userId === auth.userId &&
                                showEdit === false
                              ) {
                                console.log('clicked');
                                setShowEdit(true);
                              } else {
                                setShowEdit(false);
                              }
                            }}
                            className='block px-4 py-2'
                          >
                            Edit
                          </button>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>

              <p className='w-full leading-normal p-2 font-serif text-gray-800 text-md mb-2'>
                {userBio}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Eveniet voluptatem facilis animi unde odit sapiente
                reprehenderit cum earum quam, quo natus voluptatibus magnam et
                molestiae quidem quaerat modi vitae eaque.
              </p>

              <div className='flex flex-row items-center align-middle justify-end'>
                <p className='ml-auto right-10 text-md text-grey-800 font-medium font-serif mb-2'>
                  {username}
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className='mt-[5rem]'>
          {posts.length !== 0 &&
            posts.map((post) => (
              <UserPost
                key={post.id}
                userId={post.userId}
                postId={post.id}
                username={post.username}
                imageUrl={post.imageUrl}
                content={post.content}
                postTitle={post.title}
                date={post.createdAt}
                postViewes={post.Viewes}
              />
            ))}
        </div>
      </main>
    </Fragment>
  );
}
