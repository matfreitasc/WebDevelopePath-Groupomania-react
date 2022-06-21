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
  setNotValid,
  error,
}) {
  const userRef = useRef();
  const errRef = useRef();

  const [validEmail, setValidEmail] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [confirmPwd, setConfirmPwd] = useState('');
  const [validMatch, setvalidmatch] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPwd(result);
    const match = password === confirmPwd;
    setvalidmatch(match);
    setNotValid(false);
  }, [password, confirmPwd, setNotValid]);
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
        <label htmlFor='email-address' className={'dark:text-white'}>
          Email<span className='text-red-700'>*</span>
        </label>
        <input
          id='email-address'
          name='email'
          type='email'
          ref={userRef}
          autoComplete='off'
          required
          className=' mb-4 appearance-none  relative block w-full px-3 py-2 border rounded-xl border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
          placeholder='Email address'
          aria-invalid={validEmail ? 'false' : 'true'}
          aria-describedby='unidnote'
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <p
          id='uidnote'
          className={
            userFocus && email && !validEmail
              ? 'dark:text-white text-center p-2 border-2 border-red rounded-md'
              : 'sr-only'
          }
        >
          Please enter a valid email address.
          <br />
        </p>

        <label htmlFor='password' className=' dark:text-white'>
          Password <span className='text-red-700'>*</span>
        </label>
        <input
          id='password'
          name='password'
          type='password'
          required
          className='mb-4 appearance-none   relative block w-full px-3 py-2 border rounded-xl border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
          placeholder='Password'
          aria-invalid={validPwd ? 'false' : 'true'}
          aria-describedby='pwdnote'
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <p
          id='pwdnote'
          className={
            pwdFocus && !validPwd
              ? 'dark:text-white text-center p-2 border-2 border-red rounded-md my-2 '
              : 'sr-only'
          }
        >
          Please enter a valid password address.
          <br />
          Passwords must be at least 8 characters long, contain at least one
          number, one uppercase letter, and one special character.
          <br />
          Allowed special characters: <span aria-label='at symbol'>@</span>
          <span aria-label='hashtag'>#</span>{' '}
          <span aria-label='exclamation point'>!</span>
          <span aria-label='dollar sign'>$</span>{' '}
          <span aria-label='percent sign'>%</span>
        </p>
        <label htmlFor='confirm-password' className=' dark:text-white'>
          Confirm Password
        </label>
        <input
          id='confirm-password'
          name='confirm-password'
          type='password'
          required
          className='appearance-none  relative block w-full px-3 py-2 border rounded-xl  border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
          placeholder='Password'
          aria-invalid={validMatch ? 'false' : 'true'}
          aria-describedby='confirmnote'
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
          onChange={(e) => {
            setConfirmPwd(e.target.value);
          }}
        />
        {!validMatch ? (
          <p
            id='pwdconfirmnotenote'
            className={
              confirmPwd && !validMatch
                ? 'dark:text-white text-center p-2 border-2 border-red rounded-md my-2 border-red-700'
                : 'sr-only'
            }
            aria-live='assertive'
          >
            Passwords do not match.
          </p>
        ) : (
          <p
            id='confirmnote'
            className={
              pwdFocus && password && validMatch
                ? 'dark:text-white text-center p-2 border-2 border-red rounded-md my-2 border-green-700'
                : 'sr-only'
            }
            aria-live='assertive'
          >
            Passwords match.
          </p>
        )}
      </form>
    </section>
  );
}

export default SignUpInfo;
