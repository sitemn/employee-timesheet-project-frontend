import React, { useState } from 'react';
import axios from 'axios';
import SignUp from './SignUp'; 
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../contexts/AuthContext';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const navigate = useNavigate();

    const signInUrl = "http://localhost:8099/auth/signin";

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(signInUrl, { username, password });
            // Destructure the response data to extract accessToken and other user details
            const { accessToken, id, employeeName, email, roles } = response.data;

            // Store the token and any other relevant details in localStorage or sessionStorage
            localStorage.setItem('authToken', accessToken);
            localStorage.setItem('user', JSON.stringify({ id, employeeName, email, roles }));
            // Handle login success
            login(); // Update the auth context state 
            navigate('/dashboard-employee');
            setError('');
        } catch (error) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div className="container">
        <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="col-md-6">
            <div className="card">
                <div className="card-body">
                <h2 className="text-center mb-4">VITS</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mb-3">Log In</button>
                </form>
                <hr />
                <SignUp />
                </div>
            </div>
            </div>
        </div>
        </div>

        
    );
};

export default SignIn;
