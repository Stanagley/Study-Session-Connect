import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function NavBar(props) {

    const [loggedInUser, setLoggedInUser] = useState('');

    const styles = {
        nav: { padding: '10px', backgroundColor: '#333', color: 'white' },
        ul: { listStyleType: 'none', padding: 0, display: 'flex', justifyContent: 'space-around' },
        li: { display: 'inline', margin: '0 10px' },
        a: { color: 'white', textDecoration: 'none' }
    };

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('username'));
    }, [])

    function handleLogout() {
        localStorage.setItem("username", '');
        setLoggedInUser('');
    }

    // Will Be a drop down menu later, now just for testing purposes b/c high priority goals exist
    return (
        <nav style={styles.nav}>
            <ul style={styles.ul}>
                <li style={styles.li}><Link to="/" style={styles.a}>Home</Link></li>
                <li style={styles.li}><a href="/create-session" style={styles.a}>Create Session</a></li>
                <li style={styles.li}><Link to="/search" style={styles.a}>Search</Link></li>
                {loggedInUser == '' || loggedInUser == null ? 
                <li style={styles.li}><Link to="/login" style={styles.a}>Login</Link></li> : 
                <li style={styles.li}><Link to="/login" style={styles.a} onClick={handleLogout}>Logout</Link></li>}
            </ul>
        </nav>
    );
}

export default NavBar;
