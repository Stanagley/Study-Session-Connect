var express = require('express');
var router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ssc',
  password: 'postgres',
  port: 5432,
});

router.get('/max-id', async (req, res) => {
  try {
      const sessions = await pool.query("SELECT MAX(id) AS max_id FROM sessions");
      
      // Extract the max_id from the first row
      const maxId = sessions.rows[0].max_id;

      res.json({ maxId });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.get('/', async (req, res) => {
    try {
        const sessions = await pool.query("SELECT * FROM sessions");
        res.json(sessions.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/', async (req, res) => {
    try {
        const { id, location, major, course, time } = req.body;
        const newSession = await pool.query(
            "INSERT INTO sessions (id, location, major, course, time) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [id, location, major, course, time]
        );
        res.json(newSession.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;