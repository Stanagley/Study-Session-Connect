import React, { useEffect, useState } from 'react';

function MySessionsPage() {
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

    useEffect(() => {
        performSearch();
    }, []);

    const handleDeleteSession = async(sessionId) => {
        try {
            // Delete the session and its attendees
            await fetch(`http://localhost:9000/sessions/delete-session/${sessionId}`, {
                method: 'DELETE',
            });
    
            // Refresh the list of sessions
            performSearch();
        } catch (err) {
            console.error(err.message);
        }
    };
    

    const performSearch = async() => {
        const requestBody = {
            username: localStorage.getItem('username'),
        };
    
        try {
            const response = await fetch('http://localhost:9000/sessions/get-my-sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();
            setSearchResults(data.my_sessions.rows);  // <-- Update this line
            console.log(data);
        } catch (error) {
            console.error('Error joining the session:', error);
        }
    };
    

    return(
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
                            <p>Participants: {result.participants}</p>
                            <button onClick={() => handleDeleteSession(result.id)} style={{ ...styles.button, marginLeft: '10px' }}>Delete Session</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No owned sessions found.</p>
            )}
        </div>
    );
}

export default MySessionsPage;