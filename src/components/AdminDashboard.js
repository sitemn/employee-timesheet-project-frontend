import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Employees from './Employees';
import Projects from './Projects';
import Timesheets from './Timesheets';
import axiosInstance from '../utils/axiosConfig';

const AdminDashboard = () => {
    return (
            <div style={{ display: 'flex' }}>
                <nav style={{ padding: '1rem', width: '20%', background: '#f0f0f0' }}>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        <li><Link to="/dashboard-admin/employees">Employees</Link></li>
                        <li><Link to="/dashboard-admin/projects">Projects</Link></li>
                        <li><Link to="/dashboard-admin/timesheets">Timesheets</Link></li>
                    </ul>
                </nav>
                <main style={{ flex: 1, padding: '1rem' }}>
                    <Routes>
                        <Route path="/dashboard-admin/employees" element={<Employees axiosInstance={axiosInstance} />} />
                        <Route path="/dashboard-admin/projects" element={<Projects axiosInstance={axiosInstance} />} />
                        <Route path="/dashboard-admin/timesheets" element={<Timesheets axiosInstance={axiosInstance} />} />
                    </Routes>
                </main>
            </div>
    );
};

export default AdminDashboard;
