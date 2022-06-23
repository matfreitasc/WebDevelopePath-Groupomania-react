import { React, useState } from 'react';
import Navbar from '../../Components/layout/navbar/Navbar';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import DeleteModal from '../../Components/layout/DeleteModal';
import ReponseModal from '../../Components/ResponseModal';

export default function Profile() {
  const axiosPrivate = useAxiosPrivate();
  const { auth, setAuth } = useAuth();
  const [username, setUsername] = useState(auth?.username);
  const [userId] = useState(auth.userId);
  const [userAvatar, setUserAvatar] = useState(auth?.profilePicture);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [userEmail, setUserEmail] = useState(auth?.email);
  const [password, setPassword] = useState(auth?.password);
  const [passwordAgain, setPasswordAgain] = useState(auth?.password);
  const [name, setName] = useState(auth?.name);
  const [openModal, setOpenModal] = useState(false);
  const [resMessage, setResMessage] = useState();
  const [resStatus, setResStatus] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', userEmail);
    formData.append('name', name);
    formData.append('image', userAvatar);
    await axiosPrivate
      .put(
        `/auth/user/${userId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setName(res.data.name);
        setUsername(res.data.username);
        setUserEmail(res.data.email);
        setUserAvatar(res.data.profilePicture);
        setResMessage(res.data.message);
        setResStatus(res.data.resStatus);
        setPassword('');
        setPasswordAgain('');
        setAuth({
          ...auth,
          username: res.data.username,
          email: res.data.email,
          name: res.data.name,
          profilePicture: res.data.profilePicture,
        });
      });
  };

  const onSelectFile = (e) => {
    if (e.target.files[0]) {
      setUserAvatar(e.target.files[0]);
      setAvatarPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <>
      <Navbar />
      <ReponseModal
        resMessage={resMessage}
        open={resStatus}
        setOpen={setResStatus}
      />
      <section className='h-screen bg-opacity-50 w-full mt-8 '>
        <form className='container mx-auto shadow-md md:w-3/4 bg-white dark:bg-gray-900 transition-all'>
          <section className='flex flex-col items-center gap-4 '>
            <label className='space-x-4 h-20 w-24 mt-4 '>
              {!avatarPreview ? (
                <img
                  className=' object-cover rounded-full h-24 w-24'
                  src={userAvatar}
                  alt='avatar'
                />
              ) : (
                <img
                  className=' object-cover rounded-full h-24 w-24'
                  src={avatarPreview}
                  alt='Avatar Preview'
                />
              )}
              <input
                type='file'
                name='image'
                className='dark:text-white sr-only'
                onChange={onSelectFile}
              />
            </label>
            <p className='dark:text-white '>Click on the photo to edit </p>
          </section>

          <section className='space-y-2'>
            <div className='items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0 dark:text-white'>
              <h2 className='max-w-sm mx-auto md:w-1/3'>Personal info</h2>
              <div className='max-w-sm mx-auto space-y-5 md:w-2/3'>
                <div>
                  <div className='relative '>
                    <label
                      className='inline-block text-gray-500 dark:text-white'
                      htmlFor='name'
                    >
                      Name
                    </label>
                    <input
                      type='text'
                      id='user-info-name'
                      className=' rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-lg text-base  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent  dark:focus:ring-logoOrange'
                      placeholder='Name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <div className=' relative '>
                    <label
                      className='inline-block text-gray-500 dark:text-white'
                      htmlFor='username'
                    >
                      Username
                    </label>

                    <input
                      type='text'
                      id='user-info-phone'
                      className=' rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent  dark:focus:ring-logoOrange'
                      placeholder='Username'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <div className=' relative '>
                    <label
                      className='inline-block text-gray-500 dark:text-white'
                      htmlFor='email'
                    >
                      Email
                    </label>

                    <input
                      type='text'
                      id='user-info-email'
                      className=' rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent  dark:focus:ring-logoOrange'
                      placeholder='Email'
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <section className='items-center w-full p-2 space-y-4 text-gray-500 md:inline-flex md:space-y-0 dark:text-white'>
              <h2 className='max-w-sm mx-auto md:w-4/12 '>Change password</h2>
              <div className='max-w-sm mx-auto space-y-5  md:w-5/12 md:pl-5 md:inline-flex'>
                <div className=' relative '>
                  <input
                    type='password'
                    id='user-info-password'
                    className=' rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-6 bg-white text-gray-700 placeholder-gray-400 shadow-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:focus:ring-logoOrange '
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <input
                    type='password'
                    id='user-info-password-confirm'
                    className='mt-2 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-6 bg-white text-gray-700 placeholder-gray-400 shadow-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:focus:ring-logoOrange '
                    placeholder='Confirm password'
                    value={passwordAgain}
                    onChange={(e) => setPasswordAgain(e.target.value)}
                  />
                </div>
              </div>
              <div className='max-w-sm mx-auto space-y-5 md:w-5/12 md:pl-5 md:inline-flex'>
                <button
                  type='button'
                  className='disabled:bg-slate-500 py-2 px-4 bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 focus:text-white text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '
                  disabled={
                    password !== passwordAgain ? true : false || !password
                  }
                  onClick={handleSubmit}
                >
                  Change
                </button>
              </div>
            </section>
            <hr />
            <section className='flex align-middle sm:justify-between items-center w-full p-2  text-gray-500 md:inline-flex md:space-y-0 dark:text-white'>
              <h2
                className='sr-only md:not-sr-only'
                aria-label='Delete Account'
              >
                Delete Account
              </h2>
              <button
                type='button'
                className=' mx-auto md:mx-0 p-2 bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                Delete Account
              </button>
              {openModal && (
                <DeleteModal
                  userId={userId}
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  setAuth={setAuth}
                />
              )}
            </section>

            <hr />
            <div className='w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3'>
              <button
                type='submit'
                className='py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </section>
        </form>
      </section>
    </>
  );
}
