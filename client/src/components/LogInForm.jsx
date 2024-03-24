import { FaGoogle } from 'react-icons/fa';
import InputBox from './InputBox';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function LogInForm() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsValid(emailValue.trim() !== '' && passwordValue.trim() !== '');
  }, [emailValue, passwordValue]);
  const handleSignIn = async () => {
    setLoading(true);
    console.log('running handleSignIn');
    axios
      .post('http://localhost:3000/api/signin', {
        email: emailValue,
        password: passwordValue
      })
      .then(() => {
        console.log('SUCCESS');
        setLoading(false);
        navigate('/dashboard');
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

  return (
    <>
      <form
        className="caret-slate-600 flex flex-col items-center"
        onSubmit={(e) => e.preventDefault()}>
        <InputBox
          className="w-60"
          type="email"
          name="email"
          placeholder="Email"
          required={true}
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
        />
        <InputBox
          className="w-60"
          type="password"
          name="password"
          placeholder="Password"
          required={true}
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
        />
        <button
          className="p-2 px-5 m-2 rounded-full text-base font-semibold border border-gray-200 text-center bg-gray-100-300 text-white hover:bg-gray-200 hover:text-black transition-all disabled:hover:bg-transparent disabled:hover:text-gray-400 disabled:hover:cursor-not-allowed disabled:hover:border-gray-400"
          type="submit"
          onClick={handleSignIn}
          disabled={!isValid || loading}>
          {loading ? 'Loading' : 'Sign In'}
        </button>
      </form>
      <div className="text-white justify-center items-center flex">
        or with{' '}
        <button className="p-2 hover:ml-1 text-lg rounded-full hover:bg-gray-200 hover:text-black transition-all ease-in ">
          <FaGoogle />
        </button>
      </div>
    </>
  );
}

export default LogInForm;
