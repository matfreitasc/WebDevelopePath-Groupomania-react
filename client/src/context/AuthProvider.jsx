import { createContext, useState } from 'react';

const authContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isAuth, setAuth] = useState({});

  return (
    <authContext.Provider value={{ isAuth, setAuth }}>
      {children}
    </authContext.Provider>
  );
};

export default authContext;
