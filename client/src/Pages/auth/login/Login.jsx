import { LockClosedIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import LogoWithName from '../../../assets/images/LogoWithName';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../../api/axios';
import useAuth from '../../../hooks/useAuth';
import Toggle from '../../../Components/ThemeToggle';

export default function Login() {
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        '/auth/login',
        {
          email,
          password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      setAuth({
        res,
      });
      setEmail('');
      setPassword('');
      navigate(from, { replace: true });
    } catch (error) {
      if (!error || !error.response) {
        setError(error.response.data.message);
      } else if (error.response.status === 400) {
        setError(error.response.data.message);
      } else {
        setError(error.response.data.message);
      }
    }
  };
  const togglePersist = () => {
    setPersist((prev) => !prev);
  };
  useEffect(() => {
    localStorage.setItem('persist', persist);
  }, [persist]);

  return (
    <section>
      <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-screen  '>
        <div className='max-w-md w-full space-y-8'>
          <div className=' max-w-fit absolute top-0 right-0 p-2'>
            <Toggle className='text-gray-700 dark:text-white' />
          </div>
          <div>
            <div className='flex items-center justify-center'>
              <LogoWithName className='dark:fill-[#e94425] ' />
            </div>
            <section className='w-full flex items-center flex-col'>
              <div className='inline-block right-0  text-center'>
                <p className='block font-medium  dark:text-white ml-2'>
                  Don't have an account?
                </p>
                <a
                  href='/signup'
                  className='font-medium text-indigo-600 hover:text-indigo-500 underline  dark:text-white ml-2 dark:hover:text-indigo-500 cursor-pointer'
                >
                  Signup today
                </a>
              </div>
              <br />
              <p
                className={
                  error
                    ? 'rounded-xl p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-center text-sm'
                    : 'sr-only'
                }
                aria-live='assertive'
              >
                {error}
              </p>
            </section>
          </div>
          <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
            <input type='hidden' name='remember' defaultValue='true' />
            <div className='rounded-md shadow-sm space-y-4'>
              <div>
                <label htmlFor='email-address' className='dark:text-white'>
                  Email address
                </label>
                <input
                  id='email-address'
                  name='email'
                  type='email'
                  autoComplete='off'
                  required
                  className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Email address'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor='password' className='dark:text-white'>
                  Password
                </label>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='off'
                  required
                  className='appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Password'
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  id='remember-me'
                  name='remember-me'
                  type='checkbox'
                  onChange={togglePersist}
                  checked={persist}
                  className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                />
                <label
                  htmlFor='remember-me'
                  className='ml-2 block text-sm text-gray-900 dark:text-stone-200'
                >
                  Remember me
                </label>
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                  <LockClosedIcon
                    className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                    aria-hidden='true'
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
