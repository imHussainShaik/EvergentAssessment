
import './App.css';

import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleNewTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleNewTaskSubmit = (event) => {
    event.preventDefault();
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleTaskDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleTaskComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') {
      return task.completed;
    } else if (filter === 'incomplete') {
      return !task.completed;
    } else {
      return true;
    }
  });

  return (
    <div className='list'>
    <h1>To-Do List</h1>

    <div>
      <form className='form' onSubmit={handleNewTaskSubmit}>
        <input
          type="text"
          placeholder="Enter a new task here"
          value={newTask}
          onChange={handleNewTaskChange}
        />
        <button type="submit">+ Add New Task</button>
      </form>

      <div className='filters'>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('incomplete')}>Incomplete</button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleTaskComplete(task.id)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text}
            </span>
            <button className='delete' onClick={() => handleTaskDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default App;