import { useState, useEffect } from 'react';

function ProfileInfo({ setName, setUsername, profile_image, setProfileImage }) {
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (!profile_image || !profile_image.name) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(profile_image);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [profile_image]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setProfileImage(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setProfileImage(e.target.files[0]);
  };
  const deletePreview = () => {
    setPreview(undefined);
    setProfileImage(undefined);
  };

  return (
    <section>
      <form className='dark:text-white flex flex-col gap-2'>
        <div className='flex justify-center items-center w-full relative'>
          <label className='flex flex-col justify-center items-center '>
            <div className='flex flex-col justify-center items-center pt-5 pb-6 z-0 '>
              <div className='h-32 w-32 rounded-full ring-2 overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:ring-white z-0 '>
                <img
                  src={preview}
                  alt='profileImage'
                  className='h-full object-cover object-center bg-no-repeat text-transparent'
                />
              </div>
              <p className='mt-4'>
                Click here to upload your profile picture
                <span className='text-red-700'>*</span>
              </p>
            </div>
            <input
              required
              id='profile_image'
              type='file'
              className='hidden z-0 '
              onChange={onSelectFile}
            />
          </label>
          {profile_image ? (
            <div
              className='absolute top-0 right-[90px] z-20'
              onClick={deletePreview}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-10 w-10'
                fill='none'
                viewBox='0 0 24 24'
                stroke='red'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
          ) : (
            ''
          )}
        </div>
        <label>
          Name<span className='text-red-700'>*</span>
        </label>
        <input
          type='text'
          id='name'
          placeholder='Name'
          aria-describedby='nameNote'
          aria-label='Name input'
          required
          onChange={(e) => setName(e.target.value)}
          className='rounded-xl text-gray-700'
        />
        <label>
          Username <span className='text-red-700'>*</span>
        </label>
        <input
          type='text'
          id='username'
          placeholder='Username'
          aria-label='Username input'
          aria-describedby='usernameNote'
          required
          onChange={(e) => setUsername(e.target.value)}
          className='rounded-xl text-gray-700'
        />
      </form>
    </section>
  );
}

export default ProfileInfo;
