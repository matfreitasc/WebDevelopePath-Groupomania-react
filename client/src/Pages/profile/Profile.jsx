import { React, useEffect, useState, Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Navbar from '../../Components/navbar/Navbar';
import useAuth from '../../hooks/useAuth';
import UserPost from '../../Components/layout/userposts/Post'; // The layout element for the user's posts

export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const [posts, setPosts] = useState([]);
  const [userBio, setUserBio] = useState('');
  const [userId, setUserId] = useState('');

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
          if (err.response.status === 401) {
            navigate('/login', { state: { from: location }, replace: true });
          }
        });
    }
  }, [userId]);

  return (
    <Fragment>
      <Navbar />
      <main className='mx-auto flex-col max-w-xl mt-5'>
        <div className='rounded-lg shadow-md h-60'>
          <div className='h-full px-auto'>
            <img
              src='https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg'
              alt='background'
              className='w-full object-cover object-center rounded-md shadow-md'
            />
          </div>
          <div className='rounded-b-md relative top-[-95px] bg-white pb-2'>
            <div className='rounded-b-md px-5 pb-2 bg-transparent space-y-3  '>
              <div className=' w-16 mr-auto bg-white border-logoOrange border-2 rounded-full p-1 bottom-[2rem] relative'>
                <img
                  className=''
                  src='https://www.svgrepo.com/show/30963/cookie.svg'
                  alt='Cookie Icon SVG'
                />
              </div>

              <div className='grid col-1 bg-white h-16 '>
                <p className='max-h-10 max-w-md leading-normal text-gray-800 text-md mb-2'>
                  lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit, quisquam.
                </p>
                <p className='static right-0 text-md text-grey-800  mb-2 ml-auto'>
                  {auth?.username}
                </p>
              </div>
            </div>
          </div>
        </div>
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
                postTitle={post.postTitle}
              />
            ))}
        </div>
      </main>
    </Fragment>
  );
}
