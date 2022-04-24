import Axios from 'axios';

export const axios = Axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
