// src/Register.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', { username, password });
            toast.success('Registration successful! Redirecting to home page...');
            setTimeout(() => {
                navigate('/'); // Redirect to home after 2 seconds
            }, 2000);
        } catch (error) {
            console.error('Registration error:', error);
            toast.error('Registration failed. Please try again.'); // Show error toast
        }
    };

    return (
        <>
            <ToastContainer /> {/* Toast container for displaying messages */}
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
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
                <button type="submit">Register</button>
            </form>
        </>
    );
};

export default Register;
