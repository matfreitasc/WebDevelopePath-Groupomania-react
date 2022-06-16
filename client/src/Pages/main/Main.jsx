import React from 'react';
import Posts from './Posts';
import Navbar from '../../Components/navbar/Navbar';

function Main() {
  return (
    <div className=' overflow-x-hidden'>
      <Navbar />
      <div className='flex flex-col m-auto max-w-4xl  mt-2 transition-all md:mt-10 '>
        <Posts />
      </div>
    </div>
  );
}

export default Main;
