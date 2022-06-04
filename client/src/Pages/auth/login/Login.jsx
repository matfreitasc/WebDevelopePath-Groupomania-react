import { LockClosedIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../assets/images/icon-left-font-monochrome-black.svg';
import axios from '../../../api/axios';
import useAuth from '../../../hooks/useAuth';

export default function Login() {
  const { auth, setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
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
        console.log('Error: ', error.message);
      } else if (error.response.status === 400) {
        console.log('Missing email or password');
      } else {
        console.log('Error: ', error.response.data);
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
    <>
      <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-screen dark:bg-gray-900 '>
        <div className='max-w-md w-full space-y-8'>
          <div>
            <div className='flex items-center justify-center'>
              <svg
                data-v-5f19e91b=''
                viewBox='0 0 485 78'
                xmlns='http://www.w3.org/2000/svg'
                className='h-13 w-auto fill-black dark:fill-[#e94425]'
              >
                <g
                  transform='matrix(4.5697 0 0 4.5697 96.33 -2.2311)'
                  data-v-5f19e91b=''
                >
                  <path d='m5.41 12.67q-2.18 0-3.65-1.47t-1.47-3.67q0-2.16 1.47-3.64 1.47-1.47 3.65-1.47 2.19 0 3.76 1.37l-1.36 1.49q-1.05-0.82-2.4-0.82-1.38 0.01-2.23 0.87-0.84 0.85-0.84 2.18 0 1.43 0.85 2.27t2.23 0.84q1.11 0 1.7-0.43v-1.76l-1.36 0.01v-1.92h3.41v4.79q-1.56 1.36-3.76 1.36zm7.43-6.84v0.76q0.74-0.75 1.79-0.75 0.33 0 0.63 0.05l-0.3 1.89q-0.33-0.3-0.95-0.32-0.7 0.05-1.17 1.01v4.2h-1.91v-6.63l1.91-0.21zm6.77 6.91q-1.49 0-2.49-1-0.99-1-0.99-2.48 0-1.49 0.99-2.49 1-1 2.49-1t2.49 1 1 2.49-1 2.48q-1 1-2.49 1zm0-1.65q0.77 0 1.26-0.53 0.49-0.52 0.49-1.3t-0.49-1.3q-0.49-0.53-1.27-0.53-0.77 0-1.26 0.53-0.48 0.52-0.48 1.3t0.48 1.3q0.49 0.53 1.27 0.53zm8.91-0.84v-4.42h1.91v6.84h-1.91v-0.62q-0.69 0.62-1.64 0.62-1.3 0-1.98-0.79-0.69-0.79-0.69-1.81v-4.24h1.92v3.76q0 0.68 0.34 1.06t1.03 0.4q0.6-0.04 1.02-0.8zm5.45 5.3l-1.91-0.01v-9.5l1.91-0.21v0.55q0.77-0.55 1.51-0.55 1.57 0 2.49 1.03 0.93 1.02 0.93 2.39t-0.93 2.39q-0.92 1.03-2.49 1.03-1.03-0.07-1.51-0.56v3.44zm0-6.92v1.11q0.14 1.15 1.44 1.35 1.64-0.13 1.85-1.7-0.07-1.92-1.85-1.99-1.3 0.21-1.44 1.23zm9.38 4.11q-1.49 0-2.48-1-1-1-1-2.48 0-1.49 1-2.49 0.99-1 2.48-1t2.49 1 1 2.49-1 2.48q-1 1-2.49 1zm0-1.65q0.78 0 1.26-0.53 0.49-0.52 0.49-1.3t-0.49-1.3q-0.48-0.53-1.27-0.53-0.77 0-1.26 0.53-0.48 0.52-0.48 1.3t0.48 1.3q0.49 0.53 1.27 0.53zm6.68-2.79v4.37h-1.92v-6.63l1.92-0.21v0.61q0.64-0.6 1.64-0.6 1.29 0 1.98 0.78 0.75-0.78 2.25-0.78 1.3 0 1.99 0.78 0.68 0.79 0.68 1.82v4.23h-1.91v-3.76q0-0.68-0.31-1.06-0.31-0.37-1-0.39-0.57 0.04-0.98 0.75-0.04 0.21-0.04 0.43v4.03h-1.91v-3.76q0-0.68-0.31-1.06-0.31-0.37-1-0.39-0.63 0.04-1.08 0.84zm11.11-0.48l-0.75-1.16q1.3-0.82 3.01-0.82 1.23 0 1.94 0.68 0.72 0.69 0.72 2.05v4.1h-1.91v-0.54q-0.84 0.54-1.51 0.54-1.36 0-2.05-0.58-0.68-0.58-0.68-1.6 0-0.96 0.65-1.71 0.64-0.75 2.08-0.75 0.67 0 1.51 0.41v-0.21q-0.02-0.75-1.1-0.82-1.23 0-1.91 0.41zm3.01 2.8v-0.77q-0.27-0.53-1.3-0.53-1.23 0.14-1.3 0.96 0.07 0.81 1.3 0.88 1.03 0 1.3-0.54zm5.54-2.29v4.34h-1.92v-6.63l1.92-0.21v0.62q0.69-0.61 1.64-0.61 1.3 0 1.98 0.78 0.68 0.79 0.68 1.82v4.23h-1.91v-3.76q0-0.68-0.34-1.06-0.35-0.37-1.04-0.39-0.59 0.04-1.01 0.87zm7.82 4.34h-1.91v-6.84h1.91v6.84zm-1.98-8.47q0 0.41 0.27 0.68 0.28 0.27 0.76 0.27 0.47 0 0.75-0.27 0.27-0.27 0.27-0.68t-0.27-0.69q-0.28-0.28-0.77-0.28-0.46 0-0.74 0.28-0.27 0.28-0.27 0.69zm4.53 3.62l-0.75-1.16q1.3-0.82 3.01-0.82 1.23 0 1.95 0.68 0.71 0.69 0.71 2.05v4.1h-1.91v-0.54q-0.83 0.54-1.5 0.54-1.37 0-2.05-0.58-0.69-0.58-0.69-1.6 0-0.96 0.65-1.71 0.64-0.75 2.09-0.75 0.66 0 1.5 0.41v-0.21q-0.01-0.75-1.09-0.82-1.23 0-1.92 0.41zm3.01 2.8v-0.77q-0.27-0.53-1.3-0.53-1.23 0.14-1.3 0.96 0.07 0.81 1.3 0.88 1.03 0 1.3-0.54z' />
                </g>
                <g
                  transform='matrix(.92889 0 0 .92889 183.18 -199.52)'
                  data-v-5f19e91b=''
                >
                  <switch>
                    <g>
                      <path d='M-155 298.8c11.2 0 21.7-4.3 29.6-12.2 7.9-7.9 12.2-18.4 12.2-29.6 0-11.2-4.3-21.7-12.2-29.6-7.9-7.9-18.4-12.2-29.6-12.2s-21.7 4.3-29.6 12.2c-7.9 7.9-12.2 18.4-12.2 29.6 0 11.2 4.3 21.7 12.2 29.6 7.9 7.9 18.4 12.2 29.6 12.2zm2.4-7.1c-.8.1-1.6.1-2.4.1-1.1 0-2.2-.1-3.3-.2-3.6-5.6-6.3-11.6-7.9-17.9h17.7c.6 1.5 1.7 2.9 3 3.8-1.7 5-4.1 9.7-7.1 14.2zm9.5-2c1.9-3.5 3.4-7 4.6-10.7 2.9-.6 5.2-2.6 6.3-5.3h7.7c-4 7.3-10.7 13-18.6 16zm22.8-32.7c0 3.3-.5 6.5-1.3 9.6h-10.8c-.6-1.3-1.6-2.5-2.8-3.4.2-2.2.3-4.4.3-6.6 0-3.1-.2-6.2-.6-9.2h13.8c1 3 1.4 6.3 1.4 9.6zm-4.2-16.7h-12.2c-1.3-5.5-3.2-10.7-5.8-15.7 7.6 2.9 14 8.6 18 15.7zm-17.4 16.3c0 1.7-.1 3.4-.2 5.1-2.8.6-5.1 2.4-6.2 4.9h-19.3c-.4-3-.7-6.1-.7-9.1 0-1.9.1-3.8.3-5.7 2.6-.5 4.7-2.2 6-4.4h19.5c.4 3 .6 6.1.6 9.2zm-15.7-34.2c.9-.1 1.8-.1 2.6-.1 1 0 2 0 3 .1 3.6 5.6 6.3 11.6 7.9 17.9h-17.4c-.6-1.7-1.7-3.2-3.1-4.3 1.8-4.8 4.1-9.3 7-13.6zm-9.5 2c-1.7 3.2-3.2 6.6-4.4 10-3.1.6-5.6 2.9-6.6 5.8h-7.3c3.9-7.1 10.4-12.8 18.3-15.8zm-22.6 32.6c0-3.3.5-6.6 1.4-9.6h10.9c.6 1.1 1.5 2.1 2.5 2.9-.2 2.4-.4 4.8-.4 7.2 0 3.1.2 6.1.6 9.1h-13.6c-1-3.1-1.4-6.3-1.4-9.6zm16.2 16.6c1.3 5.4 3.2 10.7 5.8 15.7-7.6-3-13.9-8.6-17.8-15.7h12z' />
                    </g>
                  </switch>
                </g>
              </svg>
            </div>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
              Sign in to your account
            </h2>
            <p className='mt-2 text-center text-sm text-gray-600 '>
              Or{' '}
              <a
                href='/signup'
                className='font-medium text-indigo-600 hover:text-indigo-500 dark:text-white'
              >
                Sign up
              </a>
            </p>
          </div>
          <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
            <input type='hidden' name='remember' defaultValue='true' />
            <div className='rounded-md shadow-sm -space-y-px'>
              <div>
                <label htmlFor='email-address' className='sr-only'>
                  Email address
                </label>
                <input
                  id='email-address'
                  name='email'
                  type='email'
                  autoComplete='off'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Email address'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor='password' className='sr-only'>
                  Password
                </label>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='off'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
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

              <div className='text-sm'>
                <a
                  href='#'
                  className='font-medium text-indigo-600 hover:text-indigo-500'
                >
                  Forgot your password?
                </a>
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
    </>
  );
}
