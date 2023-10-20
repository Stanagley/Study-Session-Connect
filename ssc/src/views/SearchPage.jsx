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

    const [searchResults, setSearchResults] = useState([]); 
    const [searchBy, setSearchBy] = useState('all'); 
    const [query, setQuery] = useState(''); 
    const [initialSearchPerformed, setInitialSearchPerformed] = useState(false);

    const handleJoinSession = (sessionId) => {
        console.log(`Joining session ${sessionId}`);
    };

    useEffect(() => {
        performSearch(query, searchBy);
    }, []);

    const performSearch = (searchQuery, searchCriteria) => {
        fetch(`http://localhost:9000/search?query=${searchQuery}&searchBy=${searchCriteria}`)
            .then((response) => response.json())
            .then((data) => {
                setSearchResults(data);
                setInitialSearchPerformed(true);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const handleSearchCriteriaChange = (event) => {
        const newSearchBy = event.target.value;
        setSearchBy(newSearchBy);

        performSearch(query, newSearchBy);
    };

    const handleSearch = (newQuery) => {
        setQuery(newQuery);

        performSearch(newQuery, searchBy);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Search Page</h2>
            <p style={styles.description}>Select search criteria:</p>
            <div>
                <label>
                    <input type="radio" value="all" checked={searchBy === 'all'} onChange={handleSearchCriteriaChange} />
                    All
                </label>
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

            {initialSearchPerformed && ( 
                <div style={styles.searchResults}>
                    {searchResults.length > 0 ? (
                        <ul>
                            {searchResults.map((result) => (
                                <li key={result.id} style={styles.resultItem}>
                                    <p>ID: {result.id}</p>
                                    <p>Location: {result.location}</p>
                                    <p>Major: {result.major}</p>
                                    <p>Course: {result.course}</p>
                                    <p>Time: {result.time}</p>
                                    <button onClick={() => handleJoinSession(result.id)}>Join Session</button>
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
