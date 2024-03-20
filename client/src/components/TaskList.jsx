/* eslint-disable react/prop-types */
import { forwardRef, useImperativeHandle, useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const TaskList = forwardRef(function TaskList(props, ref) {
  const [taskList, setTaskList] = useState([]);

  // Use useImperativeHandle to expose the handleAddTask function to parent components
  useImperativeHandle(ref, () => ({
    handleAddTask: (taskValue) => {
      if (taskValue) {
        const newTask = {
          id: taskList.length,
          name: taskValue,
          status: 'active'
        };
        setTaskList([...taskList, newTask]);
      }
    }
  }));

  const setStatusToCompleted = (id) => {
    setTaskList(
      taskList.map((task) => {
        if (task.id === id) {
          return { ...task, status: 'completed' };
        }
        return task;
      })
    );
  };

  const handleRemove = (deleteId) => {
    const newTaskList = taskList.filter((task) => task.id !== deleteId);
    setTaskList(newTaskList);
  };

  let displayTaskList;
  if (props.taskFilter === 'all') {
    // Show all tasks regardless of status
    displayTaskList = taskList;
  } else {
    // Show tasks based on the provided taskFilter
    displayTaskList = taskList.filter((task) => task.status === props.taskFilter);
  }

  return (
    <div className="mx-2 overflow-auto bg-inherit grow ">
      {displayTaskList.map((task) => {
        return (
          <div
            className="flex justify-between items-center border-b border-slate-200 p-1 pl-4 focus-within:bg-opacity-15 focus-within:bg-slate-200"
            key={task.id}>
            <input
              className="bg-transparent grow outline-none"
              type="text"
              value={task.name} // Display the task name as the input value
              readOnly // Make the input read-only
            />
            <span
              className="m-1 text-white text-lg cursor-pointer hover:text-slate-900"
              onClick={() => setStatusToCompleted(task.id)}>
              <FaCheck />
            </span>
            <span
              className="m-1 text-white text-lg cursor-pointer hover:text-slate-900"
              onClick={() => handleRemove(task.id)} // Pass the task id to the onRemove function
            >
              <FaTimes />
            </span>
          </div>
        );
      })}
    </div>
  );
});
export default TaskList;
