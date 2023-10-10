const express = require('express');
const { Pool } = require('pg');
const router = express.Router();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ssc',
  password: 'postgres',
  port: 5432,
});

// Define a route for handling searches
router.get('/', async (req, res) => {
  const query = req.query.query; // Get the search query from the request query parameters
  const searchBy = req.query.searchBy; // Get the search criteria from the request query parameters

  try {
    // Define the valid search criteria based on the available columns
    const validSearchCriteria = ['id', 'location', 'major', 'course', 'time', 'participants'];

    if (!validSearchCriteria.includes(searchBy)) {
      return res.status(400).json({ error: 'Invalid search criteria' });
    }

    // Create a SQL query based on the search criteria and query
    const sql = `SELECT * FROM sessions WHERE ${searchBy} ILIKE $1`;
    
    // Execute the SQL query using the connection pool
    const { rows } = await pool.query(sql, [`%${query}%`]);

    // Send the results as JSON response
    res.json(rows);
  } catch (error) {
    console.error('Error executing the query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

