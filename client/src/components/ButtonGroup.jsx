/* eslint-disable react/prop-types */

const ButtonGroup = ({ buttons, selectedButton, setSelectedButton, setTaskFilter }) => {
  return (
    <div className="flex">
      {buttons.map((button) => (
        <button
          key={button.id}
          className={` min-w-min rounded-t-lg  p-1 pb-4 justify-center px-4 text-base font-semibold ${
            selectedButton === button.id ? 'bg-gray-200 text-black' : 'text-white'
          } hover:bg-gray-200 hover:text-black hover:bg-opacity-70 transition-all`}
          onClick={() => {
            setSelectedButton(button.id);
            setTaskFilter(button.label.toLowerCase());
          }}>
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
