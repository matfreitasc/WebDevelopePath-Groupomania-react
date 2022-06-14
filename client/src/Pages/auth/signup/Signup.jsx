import { LockClosedIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../api/axios';
import LogoWithName from '../../../assets/images/LogoWithName';
import Form from './SignupForms/Form';

function Signup() {
  const { setAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        '/auth/signup/',
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      .then((res) => {
        setAuth(res);
        navigate('/');
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return <Form />;
}

export default Signup;
