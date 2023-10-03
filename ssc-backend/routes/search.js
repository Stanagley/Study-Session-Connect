const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// Define a route for handling searches
router.get('/', async (req, res) => {
    const query = req.query.query; // Get the search query from the request query parameters
    const searchBy = req.query.searchBy; // Get the search criteria from the request query parameters

    try {
        // Fetch data from the JSON file or your data source
        const response = await fetch('http://localhost:9000/users');
        const data = await response.json();

        // Implement your search logic here
        const filteredResults = data.filter((user) => {
            if (searchBy === 'major') {
                return user.major.toLowerCase().includes(query.toLowerCase());
            } else if (searchBy === 'location') {
                return user.location.toLowerCase().includes(query.toLowerCase());
            } else if (searchBy === 'class') {
                return user.class.toLowerCase().includes(query.toLowerCase());
            } else if (searchBy === 'time') {
                return user.time.toLowerCase().includes(query.toLowerCase());
            }
        });

        // Send the filtered results as JSON response
        res.json(filteredResults);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
