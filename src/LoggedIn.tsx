// src/LoggedIn.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoggedIn: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Optionally, you can clear any authentication tokens or state here.
        navigate('/'); // Redirect to the home page
    };

    return (
        <div>
            <h1>Welcome to Your Dashboard!</h1>
            <p>You are now logged in.</p>
            <button onClick={handleLogout}>Logout</button>
            {/* Add more dashboard content or features here */}
        </div>
    );
};

export default LoggedIn;
