import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from './Components/requireAuth/RequireAuth';
import Main from './Pages/main/Main';
import Post from './Components/postPage/Post';
import Login from './Pages/auth/login/Login';
import Signup from './Pages/auth/signup/Signup';
import Profile from './Pages/profile/Profile';
import Settings from './Pages/settings/Settings';
import Layout from './Components/layout/Layout';
import PersistLogin from './Components/persistLogin/PersistLogin';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* Public Routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          {/* Protected Routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path='/' element={<Main />} />
              <Route path='/post/:id' element={<Post />} />
              <Route path='/profile/:id' element={<Profile />} />
              <Route path='/settings/:id' element={<Settings />} />
            </Route>
          </Route>
          {/* Error Page */}
          <Route path='*' element={<h1>404</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
