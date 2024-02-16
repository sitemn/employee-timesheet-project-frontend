import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [password, setPassword] = useState('');
    const [roles, setRoles] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Split roles by comma and trim whitespace to create an array of roles
        const rolesArray = roles.split(',').map(role => role.trim());
        
        try {
            const response = await axios.post('BACKEND_SIGNUP_ENDPOINT', {
                email,
                employeeName,
                password,
                roles: rolesArray,
            });
            console.log(response.data);
            // Handle signup success (e.g., redirect, display message)
        } catch (error) {
            console.error(error);
            // Handle signup failure (e.g., display error message)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <div>
                <label htmlFor="email">Email:</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="employeeName">Employee Name:</label>
                <input id="employeeName" type="text" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="roles">Roles:</label>
                <input id="roles" type="text" placeholder="Enter roles separated by commas" value={roles} onChange={(e) => setRoles(e.target.value)} required />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUp;
