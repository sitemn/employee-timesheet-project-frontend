import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosConfig';

const Projects = () => {
    
    const [projects, setProjects] = useState([]);
    const userData = JSON.parse(localStorage.getItem('user'));

    useEffect(() => { 
        const fetchProjects = async () => {
            try {
                const response = await axiosInstance.get(`/employees/${userData.id}/projects/`);
                setProjects(response.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
        fetchProjects(); },
     [userData.id]); 

    return (
        <div className="container mt-5">
            <h2 className="mb-4">My Projects</h2>
            <div className="row">
                {projects.length > 0 ? projects.map((project) => (
                    <div key={project.id} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{project.name}</h5>
                                <p className="card-text">{project.description}</p>
                                <h6>Assigned Employees</h6>
                                <ul className="list-unstyled">
                                    {project.employees.map((employee) => (
                                        <li key={employee.id}>{employee.employeeName}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )) : <p>No projects found.</p>}
            </div>
        </div>
    );
};

export default Projects;

