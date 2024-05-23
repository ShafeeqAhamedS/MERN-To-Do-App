import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';

import './todolistcomponent.css';

const TodoListComponent = () => {
  const [text, setText] = useState('');
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    getAllTask();
  }, []);

  const addTodoList = () => {
    if (text.trim() === '') return;
    axios.post(`http://localhost:3500/api/v1/list`, { text })
      .then(({ data }) => {
        console.log(data);
        getAllTask();
      })
      .catch(error => console.error('Error adding todo:', error));
  };

  const getAllTask = () => {
    axios.get(`http://localhost:3500/api/v1/list`)
      .then(({ data }) => {
        console.log(data);
        setTaskList(data);
      })
      .catch(error => console.error('Error fetching tasks:', error));
  };

  const deleteAList = (id) => {
    axios.delete(`http://localhost:3500/api/v1/list/${id}`)
      .then(({ data }) => {
        console.log(data);
        getAllTask();
      })
      .catch(error => console.error('Error deleting todo:', error));
  };

  const updateTaskStatus = (id, status) => {
    axios.patch(`http://localhost:3500/api/v1/list/${id}`, { status: !status })
      .then(({ data }) => {
        console.log(data);
        getAllTask();
      })
      .catch(error => console.error('Error updating task status:', error));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodoList();
      setText('')
    }
  };

  const strikeThrough = (status) => {
    return { textDecoration: status ? 'line-through' : 'none' };
  };

  return (
    <div className='container-todo'>
      <div className='container-box'>
        <div className='header'>
          <input
            onKeyDown={handleKeyPress}
            className='input'
            type='text'
            placeholder='Add task..'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className='button' onClick={addTodoList}>Add</button>
        </div>
      </div>
      <div>
        {taskList.map((task) => (
          <ul className='display-body-list' key={task._id}>
            <div className='list-container'>
              <li className='list-item'>
                <div className='text-container'>
                  <input
                    type = 'checkbox'
                    onChange={() => updateTaskStatus(task._id, task.status)}
                    checked={task.status}
                  />
                  <span style={strikeThrough(task.status)}>{task.text}</span>
                </div>
                <div className='button-container'>
                  <button
                    className='dlt-btn btn'
                    onClick={() => deleteAList(task._id)}
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </li>
            </div>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default TodoListComponent;