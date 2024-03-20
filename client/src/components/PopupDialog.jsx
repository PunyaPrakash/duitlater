import InputBox from './InputBox';
import { FaTimes } from 'react-icons/fa';

function PopupDialog({ onClick }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-30 backdrop:filter backdrop-blur-sm z-50">
      <div className="absolute flex justify-center items-center w-full h-full">
        <div className="rounded-xl text-white bg-slate-800 bg-opacity-60 backdrop-filter backdrop-blur-3xl w-2/6">
          <span
            className="p-2 m-2 flex justify-end hover:text-slate-700 hover:cursor-pointer"
            onClick={onClick}>
            <FaTimes />
          </span>

          <form action="" method="post" className="flex flex-col p-4 m-2 ">
            <label className="mx-3" htmlFor="newEmail">
              Enter your new email
            </label>
            <InputBox type="email" name="newEmail" placeholder="New Email" />
            <label className="mx-3" htmlFor="password">
              Enter your password
            </label>
            <InputBox type="password" name="password" placeholder="Password" />
            <div className="text-right w-full h-full">
              <button
                className="p-2 px-5 mt-4 m-2 w-fit rounded-full text-base font-semibold border border-gray-600 text-center bg-gray-100-300 text-white hover:bg-gray-200 hover:text-black transition-all"
                type="submit">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupDialog;
