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

router.post('/is-in', async (req, res) => {
    const{ username, session_id } = req.body
    try {
        const exists = await pool.query(
            "SELECT exists(SELECT 1 from attendees WHERE username=$1 AND session_id=$2) AS response",
            [username, session_id]
        );
        const ans = exists.rows[0].response;
        res.json({isIN: ans});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error with is-in query')
    }
});

router.post('/join-session', async (req, res) => {
    const { username, session_id } = req.body;

    // Check if user is already in the session
    const exists = await pool.query(
        "SELECT exists(SELECT 1 from attendees WHERE username=$1 AND session_id=$2) AS response",
        [username, session_id]
    );
    const isAlreadyJoined = exists.rows[0].response;

    if (isAlreadyJoined) {
        return res.status(400).json({ message: 'You have already joined this session.' });
    }

    try {
        // Add user to attendees
        await pool.query(
            "INSERT INTO attendees (username, session_id) VALUES ($1, $2)",
            [username, session_id]
        );

        // Increment participants count in sessions
        await pool.query(
            "UPDATE sessions SET participants = participants + 1 WHERE id = $1",
            [session_id]
        );

        res.json({ message: 'Joined the session successfully' });
    } catch (err) {
        console.error('Error joining the session:', err);
        res.status(500).send('Server error');
    }
});

router.post('/leave-session', async (req, res) => {
    const { username, session_id } = req.body;

    // Check if user is in the session
    const exists = await pool.query(
        "SELECT exists(SELECT 1 from attendees WHERE username=$1 AND session_id=$2) AS response",
        [username, session_id]
    );
    const isParticipant = exists.rows[0].response;

    if (!isParticipant) {
        return res.status(400).json({ message: 'You are not in this session.' });
    }

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
    // const response = await fetch('http://localhost:9000/sessions/max-id');
    // const data = await response.json();
    // let new_id = data.maxId + 1
    try {
        const { id, location, major, course, time } = req.body;
        const newSession = await pool.query(
            "INSERT INTO sessions (id, location, major, course, time, participants) VALUES ($1, $2, $3, $4, $5, 0) RETURNING *",
            [id, location, major, course, time]
        );
        res.json(newSession.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;