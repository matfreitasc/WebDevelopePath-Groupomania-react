import { React, useState, useEffect } from 'react';
import Navbar from '../../Components/navbar/Navbar';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import DeleteModal from '../../Components/layout/DeleteModal';
import ReponseModal from '../../Components/ResponseModal';

export default function Profile() {
  const axiosPrivate = useAxiosPrivate();
  const { auth, setAuth } = useAuth();
  const [username, setUsername] = useState(auth.username);
  const [userId] = useState(auth.userId);
  const [userAvatar, setUserAvatar] = useState(auth.profilePicture);
  const [preview, setPreview] = useState();
  const [userEmail, setUserEmail] = useState(auth.email);
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

  useEffect(() => {
    if (!userAvatar || !userAvatar.name || !auth.profilePicture === null) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(userAvatar);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [userAvatar, auth.profilePicture]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setUserAvatar(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setUserAvatar(e.target.files[0]);
  };

  return (
    <>
      <Navbar />
      <ReponseModal
        resMessage={resMessage}
        open={resStatus}
        setOpen={setResStatus}
      />
      <section className='h-screen bg-opacity-50 w-full mt-8'>
        <form className='container mx-auto shadow-md md:w-3/4 bg-white dark:bg-gray-900'>
          <div className='max-w-sm mx-auto md:w-full md:mx-0'>
            <div className='inline-flex items-center space-x-4'>
              <p className='block relative'>
                {preview ? (
                  <img
                    className='mx-auto mt-10 object-cover rounded-full h-20 w-24'
                    src={preview}
                    alt='avatar'
                  />
                ) : (
                  <img
                    className='mx-auto mt-10 object-cover rounded-full h-20 w-24 '
                    src={userAvatar}
                    alt='avatar'
                  />
                )}
              </p>
              <input
                type='file'
                className='dark:text-white'
                onChange={onSelectFile}
              />
            </div>
          </div>

          <div className='space-y-2'>
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
            <div className='items-center w-full p-8 space-y-4 text-gray-500 md:inline-flex md:space-y-0 dark:text-white'>
              <h2 className='max-w-sm mx-auto md:w-4/12'>Change password</h2>
              <div className='max-w-sm mx-auto space-y-5 md:w-5/12 md:pl-5 md:inline-flex'>
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
            </div>
            <hr />
            <div className='flex items-center justify-between w-full p-8 space-y-4 text-gray-500 md:inline-flex md:space-y-0 dark:text-white'>
              <h2 className='w-fit'>Delete Account</h2>
              <div className='text-center w-4/12  max-w-sm'>
                <button
                  type='button'
                  className=' py-2 bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '
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
              </div>
            </div>

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
          </div>
        </form>
      </section>
    </>
  );
}
