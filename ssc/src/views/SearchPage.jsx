import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';

function SearchPage() {
    const styles = {
        container: { padding: '50px 20px', textAlign: 'center' },
        title: { fontSize: '2em', marginBottom: '20px' },
        description: { marginBottom: '30px' },
        button: { padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' },
        searchResults: {
            marginTop: '20px',
            backgroundColor: '#f5f5f5',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        resultItem: {
            marginBottom: '10px',
            padding: '10px',
            backgroundColor: 'white',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
    };

    const [searchResults, setSearchResults] = useState([]); // State to store search results
    const [searchBy, setSearchBy] = useState('major'); // Default search criteria is 'major'
    const [query, setQuery] = useState(''); // Search query
    const [initialSearchPerformed, setInitialSearchPerformed] = useState(false); // Track whether the initial search has been performed

    useEffect(() => {
        // Trigger the initial search when the component mounts
        performSearch(query, searchBy);
    }, []); // The empty array [] means this effect runs once when the component mounts

    const performSearch = (searchQuery, searchCriteria) => {
        // Make an HTTP GET request to your Express backend's /search endpoint
        fetch(`http://localhost:9000/search?query=${searchQuery}&searchBy=${searchCriteria}`)
            .then((response) => response.json())
            .then((data) => {
                setSearchResults(data);
                setInitialSearchPerformed(true); // Set the flag to indicate the initial search has been performed
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const handleSearchCriteriaChange = (event) => {
        const newSearchBy = event.target.value;
        setSearchBy(newSearchBy);

        // Trigger a search when the search criteria changes
        performSearch(query, newSearchBy);
    };

    const handleSearch = (newQuery) => {
        setQuery(newQuery);

        // Trigger a search when the query changes
        performSearch(newQuery, searchBy);
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
                    <input type="radio" value="course" checked={searchBy === 'course'} onChange={handleSearchCriteriaChange} />
                    Course
                </label>
                <label>
                    <input type="radio" value="time" checked={searchBy === 'time'} onChange={handleSearchCriteriaChange} />
                    Time
                </label>
            </div>
            <p style={styles.description}>Enter your search query below:</p>
            <SearchBar onSearch={handleSearch} />

            {initialSearchPerformed && ( // Conditionally render the results
                <div style={styles.searchResults}>
                    {searchResults.length > 0 ? (
                        <ul>
                            {searchResults.map((result) => (
                                <li key={result.id} style={styles.resultItem}>
                                    <p>Location: {result.location}</p>
                                    <p>Major: {result.major}</p>
                                    <p>Course: {result.course}</p>
                                    <p>Time: {result.time}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No search results found.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchPage;
