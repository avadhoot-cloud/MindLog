// src/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Welcome to the MindLog Application!</h1>
            <Link to="/register">
                <button>Register</button>
            </Link>
            <Link to="/login">
                <button>Login</button>
            </Link>
        </div>
    );
};

export default Home;
