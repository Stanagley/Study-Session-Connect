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

    const handleSearch = (query) => {
        // Fetch data from the JSON file
        fetch('http://localhost:9000/users')
            .then((response) => response.json())
            .then((data) => {
                // Implement a search algorithm to filter the results based on the major property
                const filteredResults = data.filter((user) => {
                    // You can customize this search logic as needed
                    return user.major.toLowerCase().includes(query.toLowerCase());
                });

                // Update the state with the filtered results or display "No results found"
                setSearchResults(filteredResults.length > 0 ? filteredResults : []);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Search Page</h2>
            <p style={styles.description}>Enter the major you want to search for:</p>
            <SearchBar onSearch={handleSearch} />

            <div style={styles.searchResults}>
                {searchResults.length > 0 ? (
                    <ul>
                        {searchResults.map((result, index) => (
                            <li key={index}>{result.major}</li>
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
