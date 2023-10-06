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
        const { location, major, course, time } = req.body;
        const newSession = await pool.query(
            "INSERT INTO sessions (location, major, course, time) VALUES ($1, $2, $3, $4) RETURNING *",
            [location, major, course, time]
        );
        res.json(newSession.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
