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

router.get('/', async (req, res) => {
  const query = req.query.query; 
  const searchBy = req.query.searchBy; 

  try {
    const validSearchCriteria = ['all', 'location', 'major', 'course', 'time'];

    if (!validSearchCriteria.includes(searchBy)) {
      return res.status(400).json({ error: 'Invalid search criteria' });
    }

    if (searchBy === 'all') {
      const columnsToSearch = ['location', 'major', 'course', 'time'];

      const concatenatedQueries = columnsToSearch.map((column) => `(${column}::text ILIKE $1)`).join(' OR ');
      const sql = `SELECT * FROM sessions WHERE ${concatenatedQueries}`;
      const queryParams = [`%${query}%`];

      const { rows } = await pool.query(sql, queryParams);
      res.json(rows);
    } else {
      let sql = `SELECT * FROM sessions WHERE ${searchBy} ILIKE $1`;
      let queryParams = [`%${query}%`];
    
      const { rows } = await pool.query(sql, queryParams);

      res.json(rows);
    }
  } catch (error) {
    console.error('Error executing the query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
