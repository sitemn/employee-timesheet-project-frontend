import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosConfig';

const Timesheets = () => {
    const [timesheets, setTimesheets] = useState([]);
    const [hoursSummary, setHoursSummary] = useState({}); // Stores hours per project
    const [totalHours, setTotalHours] = useState(0);
    const userData = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchTimesheets = async () => {
            try {
                const response = await axiosInstance.get(`/timesheets/employee/${userData.id}`);
                setTimesheets(response.data);

                // Calculate hours worked per project and total hours
                const newHoursSummary = {};
                let newTotalHours = 0;
                response.data.forEach(timesheet => {
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
                console.error("Error fetching timesheets:", error);
            }
        };

        fetchTimesheets();
    }, [userData.id]);

    return (
        <div className="container mt-3">
            <h2 className="mb-4">My Timesheets</h2>
            {timesheets.length > 0 ? timesheets.map((timesheet) => (
                <div key={timesheet.timesheetId} className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">Timesheet ID: {timesheet.id}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Project ID: {timesheet.projectId}</h6>
                        {timesheet.timeEntries.map((entry, index) => (
                            <p className="card-text" key={index}>
                                Date: {entry.date}, Hours: {entry.hours}
                            </p>
                        ))}
                    </div>
                </div>
            )) : <p className="text-center">No timesheets found.</p>}
            
            

            <div className="summary-section mt-4">
                <h3>Hours Summary</h3>
                {Object.entries(hoursSummary).map(([projectId, hours]) => (
                    <p key={projectId}>Project ID: {projectId}, Hours Worked: {hours}</p>
                ))}
                <p>Total Hours Worked: {totalHours}</p>
            </div>
        </div>
    );
};

export default Timesheets;
