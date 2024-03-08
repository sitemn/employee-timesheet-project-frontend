import React, { useState, useEffect } from 'react';

export default function Employees({ axiosInstance }) {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axiosInstance.get('/employees');
                setEmployees(response.data);
            } catch (error) {
                console.error('Failed to fetch employees:', error);
            }
        };

        fetchEmployees();
    }, [axiosInstance]);

    return (
        <div>
            <h2>Employees</h2>
            <ul>
                {employees.map((employee) => (
                    <li key={employee.id}>
                        {employee.employeeName} - {employee.email}
                        <ul>
                            {employee.roles.map((role) => (
                                <li key={role.id}>{role.name}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}
