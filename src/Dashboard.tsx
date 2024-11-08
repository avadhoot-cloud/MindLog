import React, { useState } from 'react';
import './css/Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [isListExpanded, setListExpanded] = useState(false);
  const [isTaskExpanded, setTaskExpanded] = useState(false);
  const [isHabbitExpanded, setHabbitExpanded] = useState(false);

  const toggleList = () => {
    setListExpanded(!isListExpanded);
  };
  const toggleTask = () => {
    setTaskExpanded(!isTaskExpanded);
  };
  const toggleHabbit = () => {
    setHabbitExpanded(!isHabbitExpanded);
  };
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-item">Diary</div>
        <div className="sidebar-item" onClick={toggleList}>
          List
        </div>
        {isListExpanded && (
          <div className="submenu">
            <div className="submenu-item">List 1</div>
            <div className="submenu-item">List 2</div>
            <div className="submenu-item">List 3</div>
            <div className="submenu-item">Add List</div>
          </div>
        )}
        <div className="sidebar-item" onClick={toggleTask}>
          Tasks
        </div>
        {isTaskExpanded && (
          <div className="submenu">
            <div className="submenu-item">task 1</div>
            <div className="submenu-item">task 2</div>
            <div className="submenu-item">task 3</div>
            <div className="submenu-item">Add Task</div>
          </div>
        )}
        <div className="sidebar-item" onClick={toggleHabbit}>
          Habbits
        </div>
        {isHabbitExpanded && (
          <div className="submenu">
            <div className="submenu-item">Habbit 1</div>
            <div className="submenu-item">Habbit 2</div>
            <div className="submenu-item">Habbit 3</div>
            <div className="submenu-item">Add Habbit</div>
          </div>
        )}
      </aside>
      
      <div className="main-content">
        <header className="header">
          <button className="logout-button" onClick={() => navigate('/')}>Logout</button>
        </header>
        
        <section className="content">
          <h1>Welcome to the Dashboard</h1>
          <p>Here you can manage your lists and diary.</p>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
