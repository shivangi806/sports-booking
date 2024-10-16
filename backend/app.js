const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
// const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/bookingApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/bookings', bookingRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));










// const express = require('express');
// const bookingRoutes = require('./routes/bookingRoutes'); // Import your booking routes
// const cors = require('cors');

// const app = express();
// app.use(cors());  // Enable CORS to allow requests from a different port (e.g., 3000 for React, 5000 for Express)
// app.use(express.json());  // For parsing JSON in request bodies

// // Mount the booking routes
// app.use('/api/bookings', bookingRoutes);  // Make sure this is mounted correctly

// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
