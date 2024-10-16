import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Mock data for time slots, centers, and courts
const timeSlots = ["6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM"];
const centresData = {
  Indiranagar: {
    sports: {
      Badminton: ["Court 1", "Court 2", "Court 3"],
      Cricket: ["Ground 1", "Ground 2"],
      Basketball: ["Court 1", "Court 2"]
    }
  },
  Koramangala: {
    sports: {
      Badminton: ["Court 1", "Court 2", "Court 3"],
      Cricket: ["Ground 1", "Ground 2"],
      Basketball: ["Court 1", "Court 2"]
    }
  },
  kadubeesanahalli: {
    sports: {
      Badminton: ["Court 1", "Court 2", "Court 3"],
      Cricket: ["Ground 1", "Ground 2"],
      Basketball: ["Court 1", "Court 2"]
    }
  },
  Marathahalli: {
    sports: {
      Badminton: ["Court 1", "Court 2", "Court 3"],
      Cricket: ["Ground 1", "Ground 2"],
      Basketball: ["Court 1", "Court 2"]
    }
  },
  JP_Nagar: {
    sports: {
      Badminton: ["Court 1", "Court 2", "Court 3"],
      Cricket: ["Ground 1", "Ground 2"],
      Basketball: ["Court 1", "Court 2"]
    }
  }
};

function Admin() {
  const defaultCentre = "Indiranagar";
  const defaultSport = "Badminton";
  const defaultDate = new Date().toLocaleDateString('en-CA');

  const [bookings, setBookings] = useState([]);
  const [selectedCentre, setSelectedCentre] = useState(defaultCentre);
  const [selectedSport, setSelectedSport] = useState(defaultSport);
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [availableCourts, setAvailableCourts] = useState(centresData[selectedCentre]?.sports[selectedSport] || []);

  // Update available courts when the centre or sport changes
  useEffect(() => {
    setAvailableCourts(centresData[selectedCentre]?.sports[selectedSport] || []);
  }, [selectedCentre, selectedSport]);

  // Fetch bookings when the page loads or when centre, sport, or date changes
  useEffect(() => {
    fetchBookings();
  }, [selectedCentre, selectedSport, selectedDate]);

  // Fetch bookings from the backend
  const fetchBookings = async () => {
    try {
      const response = await axios.get('https://sports-booking.onrender.com/api/bookings', {
        params: { centre: selectedCentre, sport: selectedSport, date: selectedDate }
      });
      console.log('Fetched bookings:', response.data);  // Log fetched bookings
      setBookings(response.data);  // Store the bookings in the state
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  // Handle creating a new booking
  const handleNewBooking = async (court, timeSlot) => {
    const user = prompt("Enter the user's name for this booking:");
    const status = prompt("Enter the status (e.g., 'Checked-in', 'Pending Payment'):");

    if (user && status) {
      const newBooking = {
        centre: selectedCentre,
        sport: selectedSport,
        court,
        timeSlot,
        user,
        status,
        date: selectedDate
      };

      console.log("New Booking Data (POST):", newBooking);  // Log the new booking data

      try {
        const response = await axios.post('https://sports-booking.onrender.com/api/bookings', newBooking);
        console.log('Backend Response:', response.data);  // Log the backend response
        setBookings([...bookings, response.data]);  // Add the new booking to the state
      } catch (err) {
        console.error('Error creating booking:', err);
        if (err.response && err.response.status === 400) {
          alert(err.response.data.message);  // Show an error message if the slot is already booked
        }
      }
    }
  };


  const handleMakeAvailable = async (bookingId) => {
    try {
      // Make a DELETE request to remove the booking
      await axios.delete(`https://sports-booking.onrender.com/api/bookings/${bookingId}`);
      
      // Remove the booking from the state after deletion
      setBookings(bookings.filter(b => b._id !== bookingId));
    } catch (err) {
      console.error('Error making slot available:', err);
    }
  };

  


  // Render bookings in the table
  const renderBooking = (court, time) => {
    const booking = bookings.find(b => b.court === court && b.timeSlot === time);
  
    if (booking) {
      return (
        <div className="booking-slot bg-success">
          {booking.user} <br />
          {booking.status}
          <br />
          {/* Add a "Make Available" button */}
          <button className="btn btn-sm btn-danger mt-2" onClick={() => handleMakeAvailable(booking._id)}>
            Make Available
          </button>
        </div>
      );
    }
  
    return (
      <div className="booking-slot" onClick={() => handleNewBooking(court, time)}>
        <span className="text-muted">Available</span>
      </div>
    );
  };
  

  return (
    <div className="container mt-5">
      <h3>Schedule View</h3>

      {/* Centre Selection */}
      <div className="form-group">
        <label>Select Centre:</label>
        <select className="form-control" onChange={(e) => setSelectedCentre(e.target.value)} value={selectedCentre}>
          {Object.keys(centresData).map((centre, index) => (
            <option key={index} value={centre}>{centre}</option>
          ))}
        </select>
      </div>

      {/* Sport Selection */}
      <div className="form-group mt-3">
        <label>Select Sport:</label>
        <select className="form-control" onChange={(e) => setSelectedSport(e.target.value)} value={selectedSport}>
          {Object.keys(centresData[selectedCentre]?.sports || {}).map((sport, index) => (
            <option key={index} value={sport}>{sport}</option>
          ))}
        </select>
      </div>

      {/* Date Selection */}
      <div className="form-group mt-3">
        <label>Select Date:</label>
        <input type="date" className="form-control" onChange={(e) => setSelectedDate(e.target.value)} value={selectedDate} />
      </div>

      {/* Schedule Table */}
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Time Slots</th>
            {availableCourts.map((court, index) => (
              <th key={index}>{court}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time, timeIndex) => (
            <tr key={timeIndex}>
              <td>{time}</td>
              {availableCourts.map((court, courtIndex) => (
                <td key={courtIndex}>
                  {renderBooking(court, time)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
