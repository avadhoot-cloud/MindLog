import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from local storage
    navigate('/login', { replace: true }); // Redirect to Login and replace history
  };

  return (
    <div className="flex justify-between items-center w-full p-4 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 shadow-lg">
      <div className="flex space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 text-white bg-blue-700 rounded-lg shadow-md hover:bg-blue-800 transition duration-300 transform hover:scale-105"
        >
          Back
        </button>
        <button
          onClick={() => navigate(1)}
          className="px-4 py-2 text-white bg-green-700 rounded-lg shadow-md hover:bg-green-800 transition duration-300 transform hover:scale-105"
        >
          Forward
        </button>
      </div>

      {/* Conditionally render Logout Button */}
      {location.pathname === '/dashboard' && (
        <button
          className="px-4 py-2 text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 transition duration-300 transform hover:scale-105"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Navigation;