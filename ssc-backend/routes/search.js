const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// Define a route for handling searches
router.get('/', async (req, res) => {
    const query = req.query.query; // Get the search query from the request query parameters
    const searchBy = req.query.searchBy; // Get the search criteria from the request query parameters

    try {
        // Fetch data from the JSON file or your data source
        const response = await fetch('http://localhost:9000/');
        const data = await response.json();

        // Implement your search logic here
        const filteredResults = data.filter((user) => {
            if (user && typeof user === 'object') {
                if (searchBy === 'major' && user.major && typeof user.major === 'string' && user.major.toLowerCase().includes(query.toLowerCase())) {
                    return true;
                } else if (searchBy === 'location' && user.location && typeof user.location === 'string' && user.location.toLowerCase().includes(query.toLowerCase())) {
                    return true;
                } else if (searchBy === 'class' && user.class && typeof user.class === 'string' && user.class.toLowerCase().includes(query.toLowerCase())) {
                    return true;
                } else if (searchBy === 'time' && user.time && typeof user.time === 'string' && user.time.toLowerCase().includes(query.toLowerCase())) {
                    return true;
                }
            }
            return false;
        });

        // Send the filtered results as JSON response
        res.json(filteredResults);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
