import { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './Pages/Login';
import Signup from './Pages/Signup';
import Main from './Pages/Main';
import ErrorPage from './Pages/ErrorPage';
import ProtectedRoutes from './scripts/ProtectedRoutes';

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({ loggedIn: false });
  return (
    <UserContext.Provider value={{ user: { loggedIn: false } }}>
      <Router>
        <Routes>
          <Route exact path='/' element={<SignIn />} />
          <Route path='/signup' element={<Signup />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/index' element={<Main />} />
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
