import React, { useState } from 'react';

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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Data Submitted:', formData);
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
