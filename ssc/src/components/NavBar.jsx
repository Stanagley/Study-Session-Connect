import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import blank_profile from '../assets/blank_profile.png';
import ssclogo from '../assets/ssclogo.jpg'

function NavBar(props) {

    const [loggedInUser, setLoggedInUser] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const styles = {
        nav: { padding: '10px', backgroundColor: '#333', color: 'white' },
        ul: { listStyleType: 'none', padding: 0, display: 'flex', justifyContent: 'space-around' },
        li: { display: 'inline', margin: '0 10px', marginTop: 'auto', marginBottom: 'auto'},
        a: { color: 'white', textDecoration: 'none' },
        img: { borderRadius: '50%', height: '30px', width: '30px'},
        logo: { height: '1px', width: '1px'},
        dropdownDiv: { backgroundColor: 'white', position: 'absolute', border: '1px #333 solid', borderRadius: '3px' },
        dropdownUl: { listStyleType: 'none', padding: '10px 10px 0 10px' },
        dropdownLi: { marginBottom: '10px' },
        dropdownA: { color: '#333', textDecoration: 'none', fontSize: '15px' }
    };

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('username'));
    }, [])

    function handleLogout() {
        localStorage.setItem("username", '');
        localStorage.setItem('fname', '');
        localStorage.setItem('lname', '');
        localStorage.setItem('major', '');
        localStorage.setItem('gradYear', 0);
        setLoggedInUser('');
    }

    // Will Be a drop down menu later, now just for testing purposes b/c high priority goals exist
    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>
                <img src={ssclogo} alt="SSC Logo" style={styles.img} />
            </div>
            <ul style={styles.ul}>
                <li style={styles.li}><Link to="/" style={styles.a}>Home</Link></li>
                <li style={styles.li}><a href="/create-session" style={styles.a}>Create Session</a></li>
                <li style={styles.li}><Link to="/search" style={styles.a}>Search</Link></li>
                {loggedInUser === '' || loggedInUser === null ? 
                <li style={styles.li}><Link to="/login" style={styles.a}>Login</Link></li> :
                <li 
                    style={styles.li} 
                    onClick={() => {
                        if (showDropdown) {
                            setShowDropdown(false);
                        } else {
                            setShowDropdown(true);
                        }
                    }}
                >
                    <img style={styles.img} src={blank_profile} />
                    {showDropdown ? 
                        <div style={styles.dropdownDiv}>
                            <ul style={styles.dropdownUl}>
                                <li style={styles.dropdownLi}><Link to="/profile" style={styles.dropdownA}>Profile</Link></li>
                                <li style={styles.dropdownLi}><Link to="/my-sessions" style={styles.dropdownA}>My Sessions</Link></li>
                                <li style={styles.dropdownLi}><Link to="/login" style={styles.dropdownA} onClick={handleLogout}>Logout</Link></li>
                            </ul>
                        </div> 
                        : 
                        <></>}
                </li>}
                {/*<li style={styles.li}><Link to="/login" style={styles.a} onClick={handleLogout}>Logout</Link></li>}*/}
            </ul>
        </nav>
    );
}

export default NavBar;
