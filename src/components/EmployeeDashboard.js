import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosConfig';
import AddTimesheet from './AddTimesheet';
import EditTimesheet from './EditTimesheet';

export default function EmployeeDashboard() {
    const [projects, setProjects] = useState([]);
    const [timesheets, setTimesheets] = useState([]);
    const [hoursSummary, setHoursSummary] = useState({});
    const [dataRefreshTrigger, setDataRefreshTrigger] = useState(0); // Initial trigger
    const [totalHours, setTotalHours] = useState(0);
    const userData = JSON.parse(localStorage.getItem('user'));
    

    useEffect(() => {
        const fetchProjectsAndTimesheets = async () => {
            try {
                const projectsResponse = await axiosInstance.get(`/employees/${userData.id}/projects/`);
                setProjects(projectsResponse.data);

                const timesheetsResponse = await axiosInstance.get(`/timesheets/employee/${userData.id}`);
                setTimesheets(timesheetsResponse.data);

                // Calculate hours worked per project and total hours
                const newHoursSummary = {};
                let newTotalHours = 0;
                timesheetsResponse.data.forEach(timesheet => {
                    timesheet.timeEntries.forEach(entry => {
                        newTotalHours += entry.hours;
                        if (newHoursSummary[timesheet.projectId]) {
                            newHoursSummary[timesheet.projectId] += entry.hours;
                        } else {
                            newHoursSummary[timesheet.projectId] = entry.hours;
                        }
                    });
                });
                setHoursSummary(newHoursSummary);
                setTotalHours(newTotalHours);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchProjectsAndTimesheets();
    }, [userData.id, dataRefreshTrigger]);

    const addNewTimesheet = async (timesheetData) => {
        try {
            await axiosInstance.post('/timesheets', timesheetData);
            alert('Timesheet added successfully');
            setDataRefreshTrigger(prev => prev + 1);
            // Optionally, refresh timesheets list 
        } catch (error) {
            console.error('Failed to add timesheet:', error);
            alert('Failed to add timesheet');
        }
    };

     
  return (
        <div className="container mt-4">
        <h2>Time Worked Details</h2>
        {projects.length > 0 ? projects.map(project => (
            <div key={project.id} className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">{project.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Project ID: {project.id}</h6>
                    <p className="card-text">Description: {project.description}</p>
                    <ul className="list-group list-group-flush">
                        {timesheets.filter(ts => ts.projectId === project.id).flatMap(ts => 
                            ts.timeEntries.map((entry, index) => (
                                <li key={index} className="list-group-item">
                                    Date: {entry.date}, Hours: {entry.hours}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        )): <p>No projects found.</p>}
        
        <EditTimesheet
                timesheets={timesheets}
                projects={projects}
                employeeId={userData.id}
                onTimesheetAddedOrEdited={() => setDataRefreshTrigger(prev => prev + 1)}
            />
        {/* <button className="btn btn-secondary me-2" onClick={() => handleEditTimesheet()}>Edit Timesheet</button> */}
        <AddTimesheet 
                projects={projects} 
                employeeId={userData.id} 
                onSubmit={addNewTimesheet} 
            />

        <div className="mt-4">
            <h3>Summary</h3>
            {Object.entries(hoursSummary).map(([projectId, hours]) => {
                const projectName = projects.find(p => p.id === projectId)?.name || 'Unknown Project';
                return (
                    <p key={projectId}>{projectName}: {hours} hours</p>
                );
            })}
            <strong>Total Time Worked: {totalHours} hours</strong>
        </div>
    </div>
  );
}
