import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get('/auth/refresh', {
      withCredentials: true,
    });

    setAuth((prev) => {
      return {
        ...prev,
        accessToken: response.data.accessToken,
        userId: response.data.userId,
        username: response.data.username,
        userRole: response.data.role,
        name: response.data.name,
        bio: response.data.bio,
        email: response.data.email,
        profilePicture: response.data.profilePicture,
        profileBanner: response.data.profileBanner,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
