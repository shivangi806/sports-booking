import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './components/Admin';

function App() {
  const backgroundStyle = {
    backgroundImage: "url('https://img.freepik.com/free-photo/abstract-luxury-blur-grey-color-gradient-used-as-background-studio-wall-display-your-products_1258-52617.jpg?size=626&ext=jpg&ga=GA1.1.2000011139.1709500386&semt=ais_hybrid')", // Replace with your image path
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    alignItems: 'center',
    border : '2px solid',
    width :'100%'
  };
  return (
    <Router>
      <div className="container mt-5" style={backgroundStyle}>
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
