// src/Login.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            // Handle successful login (e.g., save token, redirect)
            console.log('Login successful:', response.data);
            toast.success('Login successful! Redirecting to your dashboard...');
            setTimeout(() => {
                navigate('/loggedin'); // Redirect to the LoggedIn page
            }, 2000);
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Login failed. Please check your credentials.'); // Show error toast
        }
    };

    return (
        <>
            <ToastContainer /> {/* Toast container for displaying messages */}
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Login</button>
            </form>
        </>
    );
};

export default Login;
