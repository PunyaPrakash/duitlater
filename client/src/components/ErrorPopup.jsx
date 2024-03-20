import { LuXCircle } from 'react-icons/lu';

function ErrorPopup(props) {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center rounded-xl w-fit h-fit bg-opacity-95 bg-slate-800 p-3 text-red-700 font-semibold border-[1px] border-red-700">
      <div className="text-red-700 text-2xl pr-2 drop-shadow-2xl">
        <LuXCircle />
      </div>
      {props.error}
    </div>
  );
}

export default ErrorPopup;
