// Importing React library and the useState hook
import React, { useState } from 'react';
import GettingStartedModal from './GettingStartedModal'; // Import the GettingStartedModal component

// Functional component for the HomePage
function HomePage() {
    // State variable to manage the visibility of the GettingStartedModal
    const [isGettingStartedModalOpen, setGettingStartedModalOpen] = useState(false);

    // Styles for the component
    const styles = {
        container: { padding: '50px 20px', textAlign: 'center' },
        title: { fontSize: '2em', marginBottom: '20px' },
        description: { marginBottom: '30px' },
        button: { padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }
    };

    // Function to open the GettingStartedModal
    const openGettingStartedModal = () => {
        setGettingStartedModalOpen(true);
    };

    // Function to close the GettingStartedModal
    const closeGettingStartedModal = () => {
        setGettingStartedModalOpen(false);
    };

    // JSX structure for rendering the HomePage component
    return (
        <div style={styles.container}>
            {/* HomePage title */}
            <h1 style={styles.title}>Welcome to Study Sessions!</h1>

            {/* HomePage description */}
            <p style={styles.description}>Find and create study sessions tailored to your needs. Join a community of learners and enhance your knowledge.</p>

            {/* Button to open the GettingStartedModal */}
            <button style={styles.button} onClick={openGettingStartedModal}>
                Get Started
            </button>

            {/* Rendering the GettingStartedModal component */}
            <GettingStartedModal
                isOpen={isGettingStartedModalOpen}
                onRequestClose={closeGettingStartedModal}
            />
        </div>
    );
}

// Exporting the HomePage component as the default export
export default HomePage;
