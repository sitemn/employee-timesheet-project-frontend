import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axiosInstance from '../utils/axiosConfig';

export default function EditTimesheet({timesheets, projects, employeeId, onTimesheetAddedOrEdited}) {
    const [show, setShow] = useState(false);
    const [editingTimesheet, setEditingTimesheet] = useState(null);

    const handleClose = () => {
        setEditingTimesheet(null);
        setShow(false); 
    };
    const handleShow = () => setShow(true);

    const handleEdit = (timesheet) => {
        setEditingTimesheet({ ...timesheet });
    };

    const handleChange = (e, field) => {
        setEditingTimesheet({
            ...editingTimesheet,
            [field]: e.target.value,
        });
    };

    const handleTimeEntryChange = (index, value) => {
        const newTimeEntries = [...editingTimesheet.timeEntries];
        newTimeEntries[index] = { ...newTimeEntries[index], ...value };
        setEditingTimesheet({ ...editingTimesheet, timeEntries: newTimeEntries });
    };

    const saveTimesheet = async () => {
        try {
            await axiosInstance.put(`/timesheets/${editingTimesheet.id}`, {
                employee: { id: employeeId },
                project: { id: editingTimesheet.projectId },
                timeEntries: editingTimesheet.timeEntries,
            });
            alert('Timesheet updated successfully');
            handleClose();
            onTimesheetAddedOrEdited();
        } catch (error) {
            console.error('Error updating timesheet:', error);
            alert('Failed to update timesheet');
        }
    };

  return (
    <>
        <Button variant="secondary me-2" onClick={handleShow}>Edit Timesheets</Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Timesheet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {timesheets.map((timesheet, index) => (
                    <div key={index} className="mb-3">
                        <div>{`Timesheet ID: ${timesheet.id}`}</div>
                        <Button variant="outline-primary" onClick={() => handleEdit(timesheet)}>Edit</Button>
                    </div>
                ))}
                {editingTimesheet && (
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Project</Form.Label>
                            <Form.Select value={editingTimesheet.projectId} onChange={(e) => handleChange(e, 'projectId')}>
                                {projects.map(project => (
                                    <option key={project.id} value={project.id}>{project.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        {editingTimesheet.timeEntries.map((entry, index) => (
                            <div key={index}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" value={entry.date} onChange={(e) => handleTimeEntryChange(index, { date: e.target.value })} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Hours</Form.Label>
                                    <Form.Control type="number" value={entry.hours} onChange={(e) => handleTimeEntryChange(index, { hours: e.target.value })} />
                                </Form.Group>
                            </div>
                        ))}
                        <Button onClick={saveTimesheet}>Save</Button>
                    </Form>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    </>
    
  );
}
