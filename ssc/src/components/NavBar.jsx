import React from 'react';

function NavBar() {
    const styles = {
        nav: { padding: '10px', backgroundColor: '#333', color: 'white' },
        ul: { listStyleType: 'none', padding: 0, display: 'flex', justifyContent: 'space-around' },
        li: { display: 'inline', margin: '0 10px' },
        a: { color: 'white', textDecoration: 'none' }
    };

    return (
        <nav style={styles.nav}>
            <ul style={styles.ul}>
                <li style={styles.li}><a href="/" style={styles.a}>Home</a></li>
                <li style={styles.li}><a href="/login" style={styles.a}>Login</a></li>
            </ul>
        </nav>
    );
}

export default NavBar;