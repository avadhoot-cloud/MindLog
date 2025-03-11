import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Navigation from './Components/Navigation';
import Dashboard from './Components/Dashboard';
import Todo from './pages/Todo';
import BucketList from './pages/BucketList';
import Diary from './pages/Diary';
import Add_lists from './pages/Add_lists';
import Movies from './pages/Movies';
import Passwords from './pages/Passwords';
import Fantasies from './pages/Fantasies';
import Ideas from './pages/Ideas';
import Long_term_goals from './pages/Long_term_goals';
import Motivational_quotes from './pages/Motivational_quotes';
import Skills from './pages/Skills';
import Friends_and_Crushes from './pages/Friends_and_Crushes';
import Cybernotes from './pages/Cybernotes';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Navigation arrows appear on all pages */}
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Nested routes for Dashboard */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="todo" element={<Todo />} />
            <Route path="bucket-list" element={<BucketList />} />
            <Route path="diary" element={<Diary />} />
            <Route path="add-lists" element={<Add_lists />} />
            <Route path="movies" element={<Movies />} />
            <Route path="passwords" element={<Passwords />} />
            <Route path="fantasies" element={<Fantasies />} />
            <Route path="ideas" element={<Ideas />} />
            <Route path="long-term-goals" element={<Long_term_goals />} />
            <Route path="motivational-quotes" element={<Motivational_quotes />} />
            <Route path="skills" element={<Skills />} />
            <Route path="friends-crushes" element={<Friends_and_Crushes />} />
            <Route path="cybernotes" element={<Cybernotes />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
