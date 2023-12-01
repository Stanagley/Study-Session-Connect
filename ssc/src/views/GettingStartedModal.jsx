// Importing necessary modules and components
import React from 'react';
import Modal from 'react-modal';

// Setting the root element for the modal
Modal.setAppElement('#root');

// Functional component for the Getting Started Modal
function GettingStartedModal({ isOpen, onRequestClose }) {
    // Styles for the modal
    const modalStyles = {
        content: {
            maxWidth: '400px',
            maxHeight: '300px',
            margin: 'auto',
            textAlign: 'center',
        },
    };

    // Styles for the content within the modal
    const contentStyles = {
        title: {
            fontSize: '1.5em',
            margin: '10px 0',
        },
        description: {
            margin: '20px 0',
        },
    };

    // JSX structure for rendering the Getting Started Modal
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Getting Started Modal"
            style={modalStyles}
        >
            {/* Modal title */}
            <h2 style={contentStyles.title}>Getting Started</h2>

            {/* Modal description */}
            <p style={contentStyles.description}>
                To get started, create a profile or log in to an existing one. To create a session, click on
                the Create Session button in the navigation bar, and to search for sessions, use the Search option in the navigation
                bar.
            </p>

            {/* Close button */}
            <button onClick={onRequestClose}>Close</button>
        </Modal>
    );
}

// Exporting the GettingStartedModal component as the default export
export default GettingStartedModal;
