/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import InputBox from './InputBox';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function SignUpForm(props) {
  const [userNameValue, setUserNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const toggleToSignIn = props.toggle;

  useEffect(() => {
    if (
      passwordValue !== confirmPasswordValue &&
      passwordValue !== '' &&
      confirmPasswordValue !== ''
    ) {
      setErrorMessage("Passwords don't match");
      setPasswordMatch(false);
    } else {
      setErrorMessage('');
      setPasswordMatch(true);
    }
  }, [passwordValue, confirmPasswordValue]);

  useEffect(() => {
    setIsValid(
      userNameValue.trim() !== '' &&
        emailValue.trim() !== '' &&
        passwordValue.trim() !== '' &&
        passwordMatch
    );
  }, [userNameValue, emailValue, passwordValue, passwordMatch]);

  const handleSignUp = async () => {
    console.log('running handleSignIn');
    setLoading(true);
    axios
      .post(
        'http://localhost:3000/api/signup',
        {
          username: userNameValue,
          email: emailValue,
          password: passwordValue
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(() => {
        console.log('User created successfully');
        try {
          toggleToSignIn();
        } catch {
          (e) => console.log(e);
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
        let msg = '';
        if (e.response && e.response.data && e.response.data.message) {
          msg = e.response.data.message;
        } else {
          msg = e.message;
        }
        toast.error(msg);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (errorMessage) {
        setErrorMessage('');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  return (
    <>
      <form
        className="caret-slate-600 flex flex-col items-center"
        onSubmit={(e) => e.preventDefault()}>
        <InputBox
          className="w-60"
          type="text"
          name="username"
          placeholder="Username"
          value={userNameValue}
          required={true}
          onChange={(e) => setUserNameValue(e.target.value)}
        />
        <InputBox
          className="w-60"
          type="email"
          name="email"
          placeholder="Email"
          value={emailValue}
          required={true}
          onChange={(e) => setEmailValue(e.target.value)}
        />
        <InputBox
          className="w-60"
          type="password"
          name="password"
          placeholder="Password"
          value={passwordValue}
          required={true}
          onChange={(e) => setPasswordValue(e.target.value)}
        />
        <InputBox
          className="w-60"
          type="password"
          name="confirmPassword"
          placeholder="Re-enter Password"
          value={confirmPasswordValue}
          required={true}
          onChange={(e) => setConfirmPasswordValue(e.target.value)}
        />
        <button
          className="p-2 px-5 mt-4 m-2 rounded-full text-base font-semibold border border-gray-200 text-center bg-gray-100-300 text-white hover:bg-gray-200 hover:text-black transition-all disabled:hover:bg-transparent disabled:hover:text-gray-400 disabled:hover:cursor-not-allowed disabled:hover:border-gray-400"
          type="submit"
          onClick={handleSignUp}
          disabled={!isValid || loading}>
          {loading ? 'Loading' : 'Sign Up'}
        </button>
      </form>
      <div
        className="text-red-800"
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
