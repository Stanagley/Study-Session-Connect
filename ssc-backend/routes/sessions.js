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

router.get('/times-participating', async(req, res) => {
    try {
        const times = await pool.query(`
            SELECT COUNT(*) AS num 
            FROM sessions s 
            JOIN attendees a ON s.id = a.session_id
            JOIN users u ON u.username = a.username
        `);
        const num = times.rows[0].num;
        res.json({num});
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Error with times query')
    }
});

router.post('/join-session', async (req, res) => {
    const { username, session_id } = req.body;

    try {
        // Add user to attendees
        await pool.query(
            "INSERT INTO attendees (username, session_id) VALUES ($1, $2)",
            [username, session_id]
        );

        // Increment participants count in sessions
        await pool.query(
            "UPDATE sessions SET participants = participants + 1 WHERE id = $1",
            [sessionId]
        );

        res.json({ message: 'Joined the session successfully' });
    } catch (err) {
        console.error('Error joining the session:', err);
        res.status(500).send('Server error');
    }
});

router.post('/leave-session', async (req, res) => {
    const { username, session_id } = req.body;

    try {
        // Remove user from attendees
        await pool.query(
            "DELETE FROM attendees WHERE username = $1 AND session_id = $2",
            [username, session_id]
        );

        // Decrement participants count in sessions
        await pool.query(
            "UPDATE sessions SET participants = participants - 1 WHERE id = $1",
            [session_id]
        );

        res.json({ message: 'Left the session successfully' });
    } catch (err) {
        console.error('Error leaving the session:', err);
        res.status(500).send('Server error');
    }
});

router.get('/max-id', async (req, res) => {
  try {
      const sessions = await pool.query("SELECT MAX(id) AS max_id FROM sessions");
      
      // Extract the max_id from the first row
      const maxId = sessions.rows[0].max_id;

      res.json({ maxId });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error with max-id query');
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