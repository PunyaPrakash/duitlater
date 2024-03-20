import InputBox from './InputBox';
import { useEffect, useState } from 'react';
import axios from 'axios';

function SignUpForm() {
  const [userNameValue, setUserNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (
      passwordValue !== confirmPasswordValue &&
      passwordValue !== '' &&
      confirmPasswordValue !== ''
    ) {
      setErrorMessage("Passwords don't match");
    } else {
      setErrorMessage('');
    }
  }, [passwordValue, confirmPasswordValue]);

  const handleSignUp = async () => {
    console.log('running handleSignIn');
    axios
      .post('https://reqres.in/api/register', {
        username: userNameValue,
        email: emailValue,
        password: passwordValue
      })
      .then(() => {
        console.log('SUCCESS');
      })
      .catch((e) => {
        setErrorMessage(e.message);
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  };

  return (
    <>
      <form
        className="caret-slate-600 flex flex-col items-center"
        onSubmit={(e) => e.preventDefault()}>
        <InputBox
          type="text"
          name="username"
          placeholder="Username"
          value={userNameValue}
          onChange={(e) => setUserNameValue(e.target.value)}
        />
        <InputBox
          type="email"
          name="email"
          placeholder="Email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
        />
        <InputBox
          type="password"
          name="password"
          placeholder="Password"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
        />
        <InputBox
          type="password"
          name="confirmPassword"
          placeholder="Re-enter Password"
          value={confirmPasswordValue}
          onChange={(e) => setConfirmPasswordValue(e.target.value)}
        />
        <button
          className="p-2 px-5 mt-4 m-2 rounded-full text-base font-semibold border border-gray-600 text-center bg-gray-100-300 text-white hover:bg-gray-200 hover:text-black transition-all"
          type="submit"
          onClick={handleSignUp}>
          Sign Up
        </button>
      </form>
      <div
        className="text-red-700"
        style={{
          opacity: errorMessage ? 1 : 0,
          transition: errorMessage ? 'opacity 0.3s ease' : 'none', // Apply transition only when errorMessage is present
          height: '1.5rem'
        }}>
        {errorMessage}
      </div>
    </>
  );
}

export default SignUpForm;
