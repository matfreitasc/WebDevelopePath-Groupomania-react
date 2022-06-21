import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';

const Toggle = (props) => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <div className='transition duration-500 ease-in-out rounded-full w-full '>
      {theme === 'dark' ? (
        <div
          className='flex flex-row justify-between gap-2 items-center'
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <p className={props.className}>Light Theme</p>
          <FaSun className='text-gray-700 dark:text-yellow-400   cursor-pointer text-xl' />
        </div>
      ) : (
        <div
          className='flex flex-row justify-between gap-2 items-center'
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <p className={props.className}>Dark Theme</p>
          <FaMoon className='text-gray-700 dark:text-gray-900  cursor-pointer text-sm' />
        </div>
      )}
    </div>
  );
};

export default Toggle;
