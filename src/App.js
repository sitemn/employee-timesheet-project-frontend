import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import SignIn from './components/SignIn';
import AdminDashboard from './components/AdminDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';


function AuthenticatedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
}

function App() {


  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/dashboard-employee"
              element={<AuthenticatedRoute>
                  <Header /><EmployeeDashboard />
                </AuthenticatedRoute>} />
            <Route path="/dashboard-admin/*" 
              element={<AuthenticatedRoute>
                <Header /><AdminDashboard />
                </AuthenticatedRoute>} />

          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

