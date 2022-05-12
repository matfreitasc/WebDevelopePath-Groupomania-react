import React from 'react';
import Posts from './Posts';
import Navbar from '../../Components/navbar/Navbar';
import Footer from '../../Components/footer/Footer';
function Main() {
  return (
    <div>
      <Navbar />
      <Posts />
      <Footer />
    </div>
  );
}

export default Main;
