import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import '../styles/SearchPage.css';

function SearchPage() {
    // State variables using the useState hook
    const [searchResults, setSearchResults] = useState([]); // Stores the results of the search
    const [searchBy, setSearchBy] = useState('all'); // Stores the selected search criteria (all, major, location, course, time)
    const [query, setQuery] = useState(''); // Stores the user's search query
    const [initialSearchPerformed, setInitialSearchPerformed] = useState(false); // Tracks whether an initial search has been performed
    const [showSuggestions, setShowSuggestions] = useState(false); // Controls the visibility of search suggestions
    const [queryHistory, setQueryHistory] = useState([]); // Stores the user's search query history
    const MAX_QUERY_HISTORY = 3; // Maximum number of query history entries

    // useEffect hook to load previous queries from local storage when the component mounts
    useEffect(() => {
        const storedQueries = JSON.parse(localStorage.getItem('previousQueries')) || [];
        setQueryHistory(storedQueries);
    }, []);

    // Function to handle joining a session
    const handleJoinSession = async (sessionId) => {
        console.log(`Joining session ${sessionId}`);

        const requestBody = {
            username: localStorage.getItem('username'),
            session_id: sessionId,
        };

        try {
            const response = await fetch('http://localhost:9000/sessions/join-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();
            console.log(data.message);
        } catch (error) {
            console.error('Error joining the session:', error);
        }
    };

    // Function to handle leaving a session
    const handleLeaveSession = async (sessionId) => {
        console.log(`Leaving session ${sessionId}`);

        const requestBody = {
            username: localStorage.getItem('username'),
            session_id: sessionId,
        };

        try {
            const response = await fetch('http://localhost:9000/sessions/leave-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();
            console.log(data.message);

            performSearch(query, searchBy);

        } catch (error) {
            console.error('Error leaving the session:', error);
        }
    };

    // useEffect hook to perform the initial search when the component mounts
    useEffect(() => {
        performSearch(query, searchBy);
    }, []);

    // Function to perform the search and update searchResults state
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

    // Function to handle changes in the selected search criteria
    const handleSearchCriteriaChange = (event) => {
        const newSearchBy = event.target.value;
        setSearchBy(newSearchBy);

        performSearch(query, newSearchBy);
    };

    // Function to handle user input for search
    const handleSearch = (newQuery) => {
        setQuery(newQuery);
        setShowSuggestions(false);

        setQueryHistory((prevHistory) => {
            const updatedHistory = [newQuery, ...prevHistory];
            if (updatedHistory.length > MAX_QUERY_HISTORY) {
                updatedHistory.pop();
            }
            return updatedHistory;
        });

        localStorage.setItem('previousQueries', JSON.stringify(queryHistory));

        performSearch(newQuery, searchBy);
    };

    // Function to handle input change in the search bar
    const handleInputChange = (event) => {
        const input = event.target.value;
        setQuery(input);
        setShowSuggestions(true);
    };

    // JSX structure for rendering the SearchPage component
    return (
        <div className="container">
            <h2 className="title">Search Page</h2>
            {/* Radio buttons for selecting search criteria */}
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
            <p className="description">Enter your search query below:</p>
            {/* SearchBar component for user input */}
            <SearchBar
                onSearch={handleSearch}
                query={query}
                onInputChange={handleInputChange}
                querySuggestions={queryHistory}
                showSuggestions={showSuggestions}
            />

            {/* Display search results if initial search has been performed */}
            {initialSearchPerformed && (
                <div className="searchResults">
                    {/* Display search results or a message if no results found */}
                    {searchResults.length > 0 ? (
                        <ul>
                            {/* Mapping through search results and displaying each item */}
                            {searchResults.map((result) => (
                                <li key={result.id} className="resultItem">
                                    <p className="title">ID: {result.id}</p>
                                    <p>Location: {result.location}</p>
                                    <p>Major: {result.major}</p>
                                    <p>Course: {result.course}</p>
                                    <p>Time: {result.time}</p>
                                    <p>Participants: {result.participants}</p>
                                    <button onClick={() => handleJoinSession(result.id)} className="joinButton">Join Session</button>
                                    <button onClick={() => handleLeaveSession(result.id)} className="leaveButton">Leave Session</button>
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

// Exporting the SearchPage component as the default export
export default SearchPage;
