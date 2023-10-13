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

    let sql;
    let queryParams;

    if (searchBy === 'all') {
      sql = `SELECT t.* FROM sessions t WHERE (t.*)::text LIKE '%$1%'`;
      queryParams = [`%${query}%`];
    } else {
      sql = `SELECT * FROM sessions WHERE ${searchBy} ILIKE $1`;
      queryParams = [`%${query}%`];
    }
    const { rows } = await pool.query(sql, queryParams);

    res.json(rows);
  } catch (error) {
    console.error('Error executing the query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
