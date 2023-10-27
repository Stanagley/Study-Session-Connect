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


router.get('/', async (req, res) => {
    try {
        const sessions = await pool.query("SELECT * FROM sessions");
        res.json(sessions.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/get-my-sessions', async(req, res) => {
    const{username} = req.body;
    try {
        const my_sessions = await pool.query(
            "SELECT * FROM sessions WHERE username = $1",
            [username]
        );
        res.json({my_sessions});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error getting sessions');
    }
});


router.post('/', async (req, res) => {
    try {
        // Fetch the maximum id from the sessions table
        const result = await pool.query("SELECT MAX(id) AS max_id FROM sessions");
        const maxId = (result.rows[0].max_id || 0) + 1;  // Increment the max id

        // Extract other details from the request body
        const { location, major, course, time, username } = req.body;

        // Insert the new session using the incremented id
        const newSession = await pool.query(
            "INSERT INTO sessions (id, location, major, course, time, participants, username) VALUES ($1, $2, $3, $4, $5, 0, $6) RETURNING *",
            [maxId, location, major, course, time, username]
        );
        
        res.json(newSession.rows[0]);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;