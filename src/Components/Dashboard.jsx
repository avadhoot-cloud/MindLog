import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from local storage
    navigate('/'); // Redirect to Home
  };

  const menuItems = [
    { name: 'Todo', path: '/dashboard/todo' },
    { name: 'Bucket List', path: '/dashboard/bucket-list' },
    { name: 'Diary', path: '/dashboard/diary' },
    { name: 'Friends & Crushes', path: '/dashboard/friends-crushes' },
    { name: 'Fantasies', path: '/dashboard/fantasies' },
    { name: 'Ideas', path: '/dashboard/ideas' },
    { name: 'Long-term Goals', path: '/dashboard/long-term-goals' },
    { name: 'Motivational Quotes', path: '/dashboard/motivational-quotes' },
    { name: 'Skills', path: '/dashboard/skills' },
    { name: 'Movies List', path: '/dashboard/movies' },
    { name: 'Passwords', path: '/dashboard/passwords' },
    { name: 'Add List', path: '/dashboard/add-lists' },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 text-center text-xl font-bold bg-gray-900">
          Dashboard
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block p-3 rounded-lg hover:bg-gray-700 transition-colors ${
                  isActive ? 'bg-gray-700 font-semibold' : ''
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          className="w-full p-4 text-center bg-red-600 hover:bg-red-700 font-semibold transition-colors"
          onClick={handleLogout}
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
