import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function AddTimesheet({ projects, employeeId, onSubmit }) {
    const [show, setShow] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || '');
    const [timeEntries, setTimeEntries] = useState([{ date: '', hours: 0 }]);

    const handleClose = () => {
        setSelectedProjectId(projects[0]?.id || ''); 
        setTimeEntries([{ date: '', hours: 0 }]); 
        setShow(false); 
    };
    const handleShow = () => setShow(true);

    const handleAddTimeEntry = () => {
        setTimeEntries([...timeEntries, { date: '', hours: 0 }]);
    };

    const handleTimeEntryChange = (index, field, value) => {
        const updatedTimeEntries = [...timeEntries];
        updatedTimeEntries[index][field] = value;
        setTimeEntries(updatedTimeEntries);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            employee: { id: employeeId },
            project: { id: selectedProjectId },
            timeEntries: timeEntries.map(entry => ({
                ...entry,
                date: entry.date, 
                hours: Number(entry.hours)
            })),
        });
        handleClose();
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add Timesheet
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Timesheet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Project</Form.Label>
                            <Form.Select 
                                value={selectedProjectId} 
                                onChange={e => setSelectedProjectId(e.target.value)}
                                required>
                                {projects.map(project => (
                                    <option key={project.id} value={project.id}>{project.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        {timeEntries.map((entry, index) => (
                            <div key={index} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control 
                                        type="date" 
                                        value={entry.date} 
                                        onChange={e => handleTimeEntryChange(index, 'date', e.target.value)} 
                                        required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Hours</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        value={entry.hours} 
                                        onChange={e => handleTimeEntryChange(index, 'hours', parseFloat(e.target.value) || 0)}
                                        required />
                                </Form.Group>
                            </div>
                        ))}
                        <Button variant="secondary" onClick={handleAddTimeEntry} className="me-2">+ Add Time Entry</Button>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
