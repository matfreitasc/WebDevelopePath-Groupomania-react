import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';

const Toggle = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <div className='transition duration-500 ease-in-out rounded-full w-full '>
      {theme === 'dark' ? (
        <div
          className='flex flex-row justify-between '
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <p className='text-gray-700'>Light Mode</p>
          <FaSun className='text-gray-700 dark:text-yellow-400   cursor-pointer text-xl' />
        </div>
      ) : (
        <div
          className='flex flex-row justify-between '
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <p className='text-gray-700'>Light Mode</p>
          <FaMoon className='text-gray-700 dark:text-gray-900  cursor-pointer text-sm' />
        </div>
      )}
    </div>
  );
};

export default Toggle;
