import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/dashboard-employee">VITS</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard-employee">Employee</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard-admin">Admin</Link>
            </li>
          </ul>
          <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
