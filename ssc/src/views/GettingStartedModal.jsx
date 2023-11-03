import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

function GettingStartedModal({ isOpen, onRequestClose }) {
    const modalStyles = {
        content: {
            maxWidth: '400px',
            maxHeight: '300px',
            margin: 'auto',
            textAlign: 'center',
        },
    };

    const contentStyles = {
        title: {
            fontSize: '1.5em', 
            margin: '10px 0',
        },
        description: {
            margin: '20px 0',
        },
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Getting Started Modal"
            style={modalStyles}
        >
            <h2 style={contentStyles.title}>Getting Started</h2>
            <p style={contentStyles.description}>
                To get started, create a profile or log in to an existing one. To create a session, click on 
                the Create Session button in the navigation bar, and to search for sessions, use the Search option in the navigation 
                bar.
            </p>
            <button onClick={onRequestClose}>Close</button>
        </Modal>
    );
}

export default GettingStartedModal;
