import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get('/auth/refresh', {
      withCredentials: true,
    });
    console.log('Refresh response: ', response);
    setAuth((prev) => {
      return {
        ...prev,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
        userId: response.data.userId,
        username: response.data.username,
        userRole: response.data.role,
        name: response.data.name,
        bio: response.data.bio,
        darkMode: response.data.darkMode,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
