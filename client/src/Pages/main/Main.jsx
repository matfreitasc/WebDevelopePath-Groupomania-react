import React from 'react';
import Posts from './Posts';
import Navbar from '../../Components/layout/navbar/Navbar';

function Main() {
  return (
    <div className='overflow-x-hidden'>
      <Navbar />
      <section className='w-full flex justify-evenly mt-2 transition-all px-2 '>
        <Posts />
      </section>
    </div>
  );
}

export default Main;
