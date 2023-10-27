import React, { useState } from 'react';

function CreateSessionPage() {
    const [formData, setFormData] = useState({
        id: 0,
        location: '',
        major: '',
        course: '',
        time: '',
        username: localStorage.getItem('username')
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const insertPostgresSession = async () => {
        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }
            const response = await fetch('http://localhost:9000/sessions/', options);
            const responseData = await response.json();
            console.log('Data saved:', responseData);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
        console.log('Form Data Submitted:', formData);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Attempt to write to postgres
        insertPostgresSession();
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
                name="course"
                placeholder="Class Name"
                value={formData.course}
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
