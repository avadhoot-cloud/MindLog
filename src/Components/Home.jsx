import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the Login page
  };

  const handleSignupClick = () => {
    navigate('/signup'); // Navigate to the Signup page
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 overflow-hidden">
      {/* Dynamic moving background animations */}
      <div className="absolute inset-0">
        <div className="animate-spin-slow rounded-full bg-white opacity-20 h-72 w-72 absolute top-20 left-20 blur-3xl"></div>
        <div className="animate-pulse rounded-full bg-white opacity-10 h-96 w-96 absolute bottom-10 right-10 blur-2xl"></div>
      </div>

      {/* Main content */}
      <h1 className="text-5xl font-extrabold text-white mb-6 z-10 max-w-md text-center">
        Welcome to Personal Management App
      </h1>
      <p className="text-lg text-gray-100 mb-8 z-10 max-w-md text-center">
        Manage your tasks, goals, and progress efficiently!
      </p>
      <div className="flex space-x-4 z-10">
        <button
          onClick={handleLoginClick}
          className="px-6 py-3 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;
