import React, { useState } from 'react';

function CreateSessionPage() {
    const [formData, setFormData] = useState({
        id: 0,
        location: '',
        major: '',
        course: '',
        time: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const insertPostgresSession = async (event) => {
        event.preventDefault();
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
        console.log('Form Data Submitted:', formData);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        //Give form data an id
        let new_maxId;
        try {
            const response = await fetch('http://localhost:9000/sessions/max-id'); //fetch max
            const data = await response.json(); //record current max
            console.log(data.maxId)
            new_maxId = data.maxId + 1; //create new max
        } catch (error) {
            console.error('Error fetching max ID:', error);
            return;
        }
        formData.id = new_maxId;

        //Attempt to write to postgres
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
