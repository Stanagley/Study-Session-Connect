import React from 'react';

function Footer() {
    const styles = {
        footer: { backgroundColor: '#f5f5f5', padding: '20px 0', textAlign: 'center' },
        links: { display: 'flex', justifyContent: 'center', marginBottom: '10px' },
        link: { margin: '0 15px', textDecoration: 'none', color: '#007BFF' },
        copyright: { fontSize: '0.9em', color: '#666' }
    };

    return (
        <footer style={styles.footer}>
            <div style={styles.links}>
                <a href="/" style={styles.link}>Home</a>
                <a href="/about" style={styles.link}>About</a>
                <a href="/contact" style={styles.link}>Contact</a>
            </div>
            <p style={styles.copyright}>© 2023 Study Sessions. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
