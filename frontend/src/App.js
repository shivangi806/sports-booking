import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RoleSelection from './components/RoleSelection';
// import Profile from './components/Profile';
import Admin from './components/Admin';

function App() {
  const [role, setRole] = useState(null); // Role state (admin or user)

  return (
    <Router>
      <div className="container mt-5">
        <h1 className="text-center mb-5">Sports Centre Booking App</h1>

        <Routes>
          {/* Role selection page */}
          <Route path="/" element={<RoleSelection setRole={setRole} />} />

          {/* User page (Profile component for booking) */}
          {/* <Route path="/user" element={<Profile role={role} />} /> */}

          {/* Admin page (Admin panel for managing bookings) */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
