import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';


const SignUp = () => {
    const [email, setEmail] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [password, setPassword] = useState('');
    const [roles, setRoles] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
        <>
            <div className="d-flex justify-content-center">
                <Button variant="success" onClick={handleShow}>
                    Create New Account
                </Button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="EmployeeName" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="mb-3"> 
                            <input type="text" className="form-control" placeholder="Roles" value={roles} onChange={(e) => setRoles(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                    </form>
                </Modal.Body>
            </Modal>
        </>

        
    );
};

export default SignUp;
