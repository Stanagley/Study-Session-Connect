import React from 'react';

function HomePage() {
    const styles = {
        container: { padding: '50px 20px', textAlign: 'center' },
        title: { fontSize: '2em', marginBottom: '20px' },
        description: { marginBottom: '30px' },
        button: { padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Welcome to Study Sessions!</h1>
            <p style={styles.description}>Find and create study sessions tailored to your needs. Join a community of learners and enhance your knowledge.</p>
            <button style={styles.button}>Get Started</button>
        </div>
    );
}

export default HomePage;
