import { useState } from 'react';
import './App.css';
import { FaChevronUp } from 'react-icons/fa';
import LogInForm from './components/LogInForm';
import SignUpForm from './components/SignUpForm';
import logoSrc from './assets/logoNameBlack.svg';

function App() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [cardOpacity, setCardOpacity] = useState(1);

  const toggleForm = () => {
    setCardOpacity(0);
    setTimeout(() => {
      setIsSignUp((prevState) => !prevState);
      setCardOpacity(1);
    }, 250);
  };

  return (
    <div className="bg-container">
      <div className="flex justify-center items-center h-screen">
        <div className="flex items-center h-5/6 w-3/5 rounded-2xl bg-[#2081c6] shadow-2xl overflow-hidden transition-all duration-500  ">
          <div className="flex flex-col w-fit h-full bg-white items-center justify-center p-2">
            <img src={logoSrc} alt="Logo" className="h-10" />
            <p className="text-center p-4 w-fit">
              An easy-to-use and efficient task management with Calendar integration, desktop and
              email notification system, shared task creation and role management.
            </p>
          </div>
          <div className="m-6 items-center text-center justify-center">
            <div
              className="mb-10 text-3xl font-semibold text-center text-white px-5 select-none fade"
              style={{ opacity: cardOpacity }}>
              {isSignUp ? 'Log in' : 'Sign up'}
            </div>
            <div className="fade w-72" style={{ opacity: cardOpacity }}>
              {isSignUp ? (
                //Log In Form
                <LogInForm />
              ) : (
                //Sign Up Form
                <SignUpForm />
              )}
              <div className="flex justify-center text-white pt-6 fade ">
                <span className="cursor-pointer" onClick={toggleForm}>
                  <FaChevronUp />
                </span>
              </div>
              <div className="text-white text-semibold pt-2 fade whitespace-nowrap">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <span
                  className="cursor-pointer border border-opacity-0 hover:border-opacity-100 border-slate-200 rounded-full p-1 mx-1 px-2 pb-2"
                  onClick={toggleForm}>
                  {isSignUp ? 'Sign up' : 'Log in'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
