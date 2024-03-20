import { FaGoogle } from 'react-icons/fa';
import InputBox from './InputBox';
import { useState, useEffect } from 'react';
import axios from 'axios';

function LogInForm() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async () => {
    console.log('running handleSignIn');
    axios
      .post('https://reqres.in/api/login', {
        email: emailValue,
        password: passwordValue
      })
      .then(() => {
        console.log('SUCCESS');
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
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
        <button
          className="p-2 px-5 mt-4 m-2 rounded-full text-base font-semibold border border-gray-600 text-center bg-gray-100-300 text-white hover:bg-gray-200 hover:text-black transition-all"
          type="submit"
          onClick={handleSignIn}>
          Sign In
        </button>
        <div className="text-white justify-center items-center flex">
          or with{' '}
          <button className="p-2 ml-2 text-lg border border-slate-500 rounded-full bg-gray-200 text-black transition-all">
            <FaGoogle />
          </button>
        </div>
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

export default LogInForm;
