import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreatePost from './Pages/CreatePosts';
import Main from './Pages/Main';
import Post from './Components/Post';
import Login from './Pages/auth/login/Login';
import Signup from './Pages/auth/signup/Signup';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Main />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/post/:id' element={<Post />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
