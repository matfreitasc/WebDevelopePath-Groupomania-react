import React from 'react';

function ErrorPage() {
  return (
    <>
      <div
        className='
    flex
    items-center
    justify-center
    w-screen
    h-screen
    bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500
  '
      >
        <div className='px-40 py-20 bg-white rounded-md shadow-xl'>
          <div className='flex flex-col items-center'>
            <h1 className='font-bold text-9xl bg-clip-text text-transparent bg-gradient-to-tr  from-indigo-500 via-purple-500 to-pink-500'>
              404
            </h1>

            <h6 className='mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl'>
              <span className='text-red-500'>Oops!</span> Page not found
            </h6>

            <p className='mb-8 text-center text-gray-500 md:text-lg'>
              The page you’re looking for doesn’t exist.
            </p>
            <div className='px-2 py-2 bg-white rounded-md shadow-lg shadow-indigo-500/50'>
              <a
                href='/index'
                className='px-6 py-2 text-lg font-semibold bg-clip-text text-transparent
                bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 hover:text-gray-900 hover:bg-gray-200'
              >
                Go home
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
