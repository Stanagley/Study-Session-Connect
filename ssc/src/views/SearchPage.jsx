import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import '../styles/SearchPage.css';

function SearchPage() {
    const [searchResults, setSearchResults] = useState([]); 
    const [searchBy, setSearchBy] = useState('all'); 
    const [query, setQuery] = useState(''); 
    const [initialSearchPerformed, setInitialSearchPerformed] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [queryHistory, setQueryHistory] = useState([]);
    const MAX_QUERY_HISTORY = 3;


    useEffect(() => {
        const storedQueries = JSON.parse(localStorage.getItem('previousQueries')) || [];
        setQueryHistory(storedQueries);
    }, []);


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


    const handleInputChange = (event) => {
        const input = event.target.value;
        setQuery(input);
        setShowSuggestions(true);
    };
    

    return (
        <div className="container">
            <h2 className="title">Search Page</h2>
            <p className="description">Select search criteria:</p>
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
            <SearchBar
                onSearch={handleSearch}
                query={query}
                onInputChange={handleInputChange}
                querySuggestions={queryHistory}
                showSuggestions={showSuggestions}
            />

            {initialSearchPerformed && (
                <div className="searchResults">
                    {searchResults.length > 0 ? (
                        <ul>
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

export default SearchPage;
