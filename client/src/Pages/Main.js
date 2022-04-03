import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreatePost from '../Components/CreatePosts';
import Navbar from '../Components/Navbar';
import Posts from '../Components/Posts';
import Post from '../Components/Post';
import Login from './Login';
import Signup from './Signup';

function Main() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Posts />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/post/:id' element={<Post />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Main;
