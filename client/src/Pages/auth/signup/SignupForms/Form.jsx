import { useState } from 'react';
import LogoWithName from '../../../../assets/images/LogoWithName';
import SignUpInfo from './SignupInfo';
import ProfileInfo from './ProfileInfo';
import useAuth from './../../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import axios from '../../../../api/axios';

function Form() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [profile_image, setProfileImage] = useState('');
  const [notValid, setNotValid] = useState(Boolean);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('name', name);
    formData.append('username', username);
    formData.append('image', profile_image);
    try {
      const response = await axios.post('/auth/signup/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      setAuth(response.data);
      navigate('/');
    } catch (error) {
      console.log(
        '🚀 ~ file: Form.jsx ~ line 36 ~ handleSubmit ~ error',
        error
      );
      setError(error.message);
    }
  };

  const [page, setPage] = useState(0);
  const [formTitles] = useState(['Sign up', 'Profile']);
  const PageDisplay = () => {
    switch (page) {
      case 0:
        return (
          <SignUpInfo
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            notValid={notValid}
            setNotValid={setNotValid}
          />
        );
      default:
      case 1:
        return (
          <ProfileInfo
            name={name}
            setName={setName}
            username={username}
            setUsername={setUsername}
            profile_image={profile_image}
            setProfileImage={setProfileImage}
            error={error}
          />
        );
    }
  };

  return (
    <section className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-screen dark:bg-gray-900 '>
      <div className='max-w-md w-full space-y-8 '>
        <div className='flex items-center justify-center flex-col space-y-8'>
          <LogoWithName className='dark:fill-[#e94425] ' />
          <section className='w-full'>
            <p className='flex items-center flex-col font-medium  dark:text-white ml-2'>
              Already have an account?
              <a
                href='/login'
                className='font-medium text-indigo-600 hover:text-indigo-500 hover:underline hover:underline-offset-2'
              >
                Login
              </a>
            </p>
          </section>
          <p
            className={
              error ? 'w-full text-red border-2 border-red-700' : 'sr-only'
            }
            aria-live='assertive'
          >
            {error}
          </p>
          <section className='flex items-center  flex-col  w-full'>
            <div id='FormBody' className=' max-w-md w-full'>
              {PageDisplay()}
            </div>
          </section>
          <section className='w-full'>
            <div
              id='Form Footer'
              className={page === 0 ? ' ' : 'flex justify-between'}
            >
              <div className=''>
                {page !== 0 ? (
                  <button
                    className='min-w-fit p-2 px-16 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    disabled={page === 0}
                    onClick={() => {
                      setPage((page) => page - 1);
                    }}
                  >
                    Previous Step
                  </button>
                ) : (
                  <></>
                )}
              </div>
              <div>
                {page === formTitles.length - 1 ? (
                  <button
                    disabled={notValid}
                    className='border p-2  px-20 border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                ) : page === 0 ? (
                  <button
                    className='w-full p-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    onClick={() => {
                      setPage((page) => page + 1);
                    }}
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    className='border p-2 border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    onClick={() => {
                      setPage((page) => page + 1);
                    }}
                  >
                    Next Step
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export default Form;
