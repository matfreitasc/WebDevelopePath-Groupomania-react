import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Pages/main/Main';
import Post from './Components/postPage/Post';
import Login from './Pages/auth/login/Login';
import Signup from './Pages/auth/signup/Signup';
import Profile from './Pages/profile/Profile';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Main />} />
          <Route path='/post/:id' element={<Post />} />
          <Route path='profile/:id' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='profile/:id' element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
