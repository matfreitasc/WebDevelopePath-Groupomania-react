import { useRef, useState, useEffect } from 'react';

const USER_REGEX =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/;

function SignUpInfo({
  email,
  setEmail,
  password,
  setPassword,
  notValid,
  setNotValid,
}) {
  const useRef = useRef();
  const errRef = useRef();

  const [validEmail, setValidEmail] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [confirmPwd, setConfirmPwd] = useState('');
  const [validMatch, setvalidmatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    useRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    console.log(
      '🚀 ~ file: SignupInfo.jsx ~ line 45 ~ useEffect ~ result',
      result
    );
    setValidPwd(result);
    const match = password === confirmPwd;
    console.log(
      '🚀 ~ file: SignupInfo.jsx ~ line 48 ~ useEffect ~ match',
      match
    );
    setvalidmatch(match);
    setNotValid(false);
  }, [password, confirmPwd]);

  useEffect(() => {
    setError('');
  }, [email, password, confirmPwd]);

  return (
    <section className='rounded-md shadow-sm  relative  max-w-md w-full '>
      <p
        ref={errRef}
        className={
          error ? 'w-full text-red border-2 border-red-700' : 'sr-only'
        }
        aria-live='assertive'
      >
        {error}
      </p>
      <form>
        <label
          htmlFor='email-address'
          className={
            'dark:text-white' + !email || !validEmail
              ? 'text-red-700'
              : 'text-gray-700'
          }
        >
          Email
        </label>
        <input
          id='email-address'
          name='email'
          type='email'
          ref={useRef}
          autoComplete='off'
          required
          className='mb-4 appearance-none  relative block w-full px-3 py-2 border rounded-l border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
          placeholder='Email address'
          aria-invalid={validEmail ? 'false' : 'true'}
          aria-describedby='unidnote'
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor='password' className=' dark:text-white'>
          Password
        </label>
        <input
          id='password'
          name='password'
          type='password'
          ref={useRef}
          autoComplete='off'
          required
          className='appearance-none  relative block w-full px-3 py-2 border rounded-l  border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
          placeholder='Password'
          aria-invalid={validPwd ? 'false' : 'true'}
          aria-describedby='unidnote'
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <p
          id='uidnote'
          className={
            userFocus && email && !validEmail ? 'dark:text-white' : 'sr-only'
          }
        >
          4 to 24 Characters <br />
          it must begin with a letter
          <br />
          At least one uppercase letter, one lowercase letter, one number, one
          special character
        </p>
      </form>
    </section>
  );
}

export default SignUpInfo;
