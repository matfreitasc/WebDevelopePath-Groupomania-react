import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';

const Toggle = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <div className='transition duration-500 ease-in-out rounded-full p-2'>
      {theme === 'dark' ? (
        <FaSun
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className='text-gray-500 dark:text-yellow-400  cursor-pointer text-sm'
        />
      ) : (
        <FaMoon
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className='text-gray-500 dark:text-gray-900  cursor-pointer text-sm'
        />
      )}
    </div>
  );
};

export default Toggle;
