const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection using pg's Pool
const pool = new Pool({
    user: 'YOUR_DB_USER',
    host: 'localhost',
    database: 'YOUR_DB_NAME',
    password: 'YOUR_DB_PASSWORD',
    port: 5432,
});

// Test route
app.get('/', (req, res) => {
    res.send('Backend Server is running');
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
