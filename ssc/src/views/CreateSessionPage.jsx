import React, { useState } from 'react';
import axios from 'axios';

function CreateSessionPage() {
    const [formData, setFormData] = useState({
        location: '',
        major: '',
        className: '',
        time: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form Data Submitted:', formData);
        // ADD FUNCTIONALITY TO SEND DATA TO BACKEND
        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }
            const response = await fetch('http://localhost:9000/sessions', options);
    
            // Handle successful response (e.g., show a success message)
            console.log('Data saved:', response.data);
        } catch (error) {
            // Handle errors (e.g., show an error message to the user)
            console.error('Error submitting form:', error);
        }
    };

    const styles = {
        form: { display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: 'auto' },
        input: { padding: '10px', margin: '10px 0' },
        button: { padding: '10px 20px', cursor: 'pointer' }
    };

    return (
        <form style={styles.form} onSubmit={handleSubmit}>
            <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleInputChange}
                style={styles.input}
            />
            <input
                type="text"
                name="major"
                placeholder="Major"
                value={formData.major}
                onChange={handleInputChange}
                style={styles.input}
            />
            <input
                type="text"
                name="className"
                placeholder="Class Name"
                value={formData.className}
                onChange={handleInputChange}
                style={styles.input}
            />
            <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                style={styles.input}
            />
            <button type="submit" style={styles.button}>Create Session</button>
        </form>
    );
}

export default CreateSessionPage;
