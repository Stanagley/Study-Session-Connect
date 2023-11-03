import React, { useState } from 'react';
import GettingStartedModal from './GettingStartedModal'; // Import the GettingStartedModal component

function HomePage() {
    const [isGettingStartedModalOpen, setGettingStartedModalOpen] = useState(false);

    const styles = {
        container: { padding: '50px 20px', textAlign: 'center' },
        title: { fontSize: '2em', marginBottom: '20px' },
        description: { marginBottom: '30px' },
        button: { padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }
    };

    const openGettingStartedModal = () => {
        setGettingStartedModalOpen(true);
    };

    const closeGettingStartedModal = () => {
        setGettingStartedModalOpen(false);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Welcome to Study Sessions!</h1>
            <p style={styles.description}>Find and create study sessions tailored to your needs. Join a community of learners and enhance your knowledge.</p>
            <button style={styles.button} onClick={openGettingStartedModal}>
                Get Started
            </button>
            <GettingStartedModal
                isOpen={isGettingStartedModalOpen}
                onRequestClose={closeGettingStartedModal}
            />
        </div>
    );
}

export default HomePage;
