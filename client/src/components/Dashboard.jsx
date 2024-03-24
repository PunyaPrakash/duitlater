import logoSrc from '../assets/logoNameWhite.svg';
import InputBox from './InputBox';
import { MdAddTask } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import DropdownMenu from './DropdownMenu';
import ButtonGroup from './ButtonGroup';
import TaskList from './TaskList';
import { useRef, useState } from 'react';
import PopupDialog from './PopupDialog';

function Dashboard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState(1);
  const [popupVisible, setPopupVisible] = useState(false); // Default selected button
  const dropdownRef = useRef(null);
  const [taskText, setTaskText] = useState('');
  const addTaskRef = useRef(null);
  const [taskFilter, setTaskFilter] = useState('All');
  const addTask = () => {
    addTaskRef.current.handleAddTask(taskText);
    setTaskText('');
  };
  return (
    <div className="bg-gray-800 min-h-screen">
      <nav className="sticky flex p-2 justify-between items-center text-white font-semibold h-auto w-screen bg-gray-900">
        <div className="text-white text-2xl p-1 pl-4">
          <img src={logoSrc} alt="Logo" className="h-8 pr-2" />
        </div>
        <span
          className="pr-4 text-3xl cursor-pointer"
          onClick={() => {
            setIsDropdownOpen((prevState) => !prevState);
          }}>
          <CgProfile />
        </span>
      </nav>
      {isDropdownOpen && (
        <div ref={dropdownRef} className="sticky top-0 mr-2 right-0 z-40">
          <DropdownMenu
            setPopupVisibility={() => {
              setPopupVisible((prevState) => !prevState);
            }}
          />
        </div>
      )}
      <div className="flex justify-center h-full z-20">
        <div className="flex flex-col p-4 mt-3 rounded-xl items-center bg-cyan-950 bg-opacity-70 text-white  w-[95%] backdrop-filter backdrop-blur-[2px]">
          <div className="flex m-4 justify-evenly items-center w-full ">
            {/* Add Task Here */}
            <InputBox
              type="text"
              name="task"
              placeholder="Add task"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              className="p-2 rounded-xl grow bg-transparent border border-slate-300 focus:bg-white"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addTask();
                }
              }}
            />
            <button
              className="flex items-center m-2 p-[9px] px-4 rounded-xl text-base font-semibold border border-gray-600 bg-transparent text-white hover:bg-gray-200 hover:text-black transition-all"
              type="button"
              onClick={addTask} // Handle adding task
            >
              <MdAddTask className="mr-2 text-lg" />
              Add
            </button>
          </div>
          <div className="flex m-4 w-full h-full flex-col">
            <div className="mx-2 overflow-hidden bg-transparent border-b border-slate-200 bg-opacity-20 min-w-min">
              <ButtonGroup
                buttons={[
                  { id: 1, label: 'All' },
                  { id: 2, label: 'Active' },
                  { id: 3, label: 'Completed' }
                ]}
                selectedButton={selectedButton}
                setSelectedButton={setSelectedButton}
                setTaskFilter={setTaskFilter}
              />
            </div>
            <div className="flex overflow-y-auto h-72">
              <TaskList ref={addTaskRef} taskFilter={taskFilter} />
            </div>
          </div>
        </div>
      </div>
      {popupVisible && (
        <PopupDialog
          onClick={() => {
            setPopupVisible((prevState) => !prevState);
            console.log('PopupToggle');
          }}
        />
      )}
    </div>
  );
}

export default Dashboard;
