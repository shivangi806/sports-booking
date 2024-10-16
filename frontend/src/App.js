import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './components/Admin';

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <h1 className="text-center mb-5">Sports Centre Booking App</h1>

        <Routes>
          {/* Admin page (Admin panel for managing bookings) */}
          <Route path="/" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
