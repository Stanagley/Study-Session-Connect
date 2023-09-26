import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';

function SearchPage() {
    const styles = {
        container: { padding: '50px 20px', textAlign: 'center' },
        title: { fontSize: '2em', marginBottom: '20px' },
        description: { marginBottom: '30px' },
        button: { padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' },
        searchResults: { marginTop: '20px' },
    };

    const [searchResults, setSearchResults] = useState([]); // State to store search results
    const [searchBy, setSearchBy] = useState('major'); // Default search criteria is 'major'

    const handleSearch = (query) => {
        // Fetch data from the JSON file
        fetch('http://localhost:9000/users')
            .then((response) => response.json())
            .then((data) => {
                // Implement a search algorithm to filter the results based on the selected criteria
                const filteredResults = data.filter((user) => {
                    // You can customize this search logic as needed
                    if (searchBy === 'major') {
                        return user.major.toLowerCase().includes(query.toLowerCase());
                    } else if (searchBy === 'location') {
                        return user.location.toLowerCase().includes(query.toLowerCase());
                    }
                    else if (searchBy === 'class') {
                        return user.class.toLowerCase().includes(query.toLowerCase());
                    }
                    else if (searchBy === 'time') {
                        return user.time.toLowerCase().includes(query.toLowerCase());
                    }
                });
    
                // Update the state with the filtered results
                setSearchResults(filteredResults);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const handleSearchCriteriaChange = (event) => {
        setSearchBy(event.target.value);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Search Page</h2>
            <p style={styles.description}>Select search criteria:</p>
            <div>
                <label>
                    <input type="radio" value="major" checked={searchBy === 'major'} onChange={handleSearchCriteriaChange} />
                    Major
                </label>
                <label>
                    <input type="radio" value="location" checked={searchBy === 'location'} onChange={handleSearchCriteriaChange} />
                    Location
                </label>
                <label>
                    <input type="radio" value="class" checked={searchBy === 'class'} onChange={handleSearchCriteriaChange} />
                    Class
                </label>
                <label>
                    <input type="radio" value="time" checked={searchBy === 'time'} onChange={handleSearchCriteriaChange} />
                    Time
                </label>
            </div>
            <p style={styles.description}>Enter your search query below:</p>
            <SearchBar onSearch={handleSearch} />

            <div style={styles.searchResults}>
                {searchResults.length > 0 ? (
                    <ul>
                        {searchResults.map((result) => (
                            <li key={result.id}>
                                <p>ID: {result.id}</p>
                                <p>Location: {result.location}</p>
                                <p>Major: {result.major}</p>
                                <p>Class: {result.class}</p>
                                <p>Time: {result.time}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No search results found.</p>
                )}
            </div>
        </div>
    );
}

export default SearchPage;
