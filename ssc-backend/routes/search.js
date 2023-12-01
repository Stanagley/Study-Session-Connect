// Importing necessary modules
const express = require('express');
const { Pool } = require('pg');

// Creating an Express router
const router = express.Router();

// Creating a PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ssc',
  password: 'postgres',
  port: 5432,
});

// Handling GET requests to the root endpoint
router.get('/', async (req, res) => {
  // Extracting query parameters from the request
  const query = req.query.query;
  const searchBy = req.query.searchBy;

  try {
    // Valid search criteria for study sessions
    const validSearchCriteria = ['all', 'location', 'major', 'course', 'time'];

    // Checking if the provided search criteria is valid
    if (!validSearchCriteria.includes(searchBy)) {
      return res.status(400).json({ error: 'Invalid search criteria' });
    }

    // Handling different search scenarios based on the search criteria
    if (searchBy === 'all') {
      // When searching by 'all', search across multiple columns
      const columnsToSearch = ['location', 'major', 'course', 'time'];

      // Generating a dynamic SQL query to search across columns
      const concatenatedQueries = columnsToSearch
        .map((column) => `(${column}::text ILIKE $1)`)
        .join(' OR ');
      const sql = `SELECT id, * FROM sessions WHERE ${concatenatedQueries}`;
      const queryParams = [`%${query}%`];

      // Executing the query and sending the results as JSON
      const { rows } = await pool.query(sql, queryParams);
      res.json(rows);
    } else {
      // When searching by a specific criteria (e.g., 'location', 'major', etc.)
      let sql = `SELECT id, * FROM sessions WHERE ${searchBy} ILIKE $1`;
      let queryParams = [`%${query}%`];

      // Executing the query and sending the results as JSON
      const { rows } = await pool.query(sql, queryParams);
      res.json(rows);
    }
  } catch (error) {
    // Handling errors and sending an appropriate response
    console.error('Error executing the query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Exporting the router for use in other parts of the application
module.exports = router;
