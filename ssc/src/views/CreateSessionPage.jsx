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

    const [message, setMessage] = useState('');
    const [locationError, setLocationError] = useState(false);
    const [majorError, setMajorError] = useState(false);
    const [classNameError, setClassNameError] = useState(false);
    const [timeError, setTimeError] = useState(false);

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
            setMessage('Session Created Successfully');
        } catch (error) {
            console.error('Error submitting form:', error);
            setMessage('Error Creating Session');
        }
        console.log('Form Data Submitted:', formData);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        let error = false;
        if (formData.time != '') {
            setTimeError(false);
        } else {
            setTimeError(true);
            error = true;
        }
        if (formData.course != '') {
            setClassNameError(false);
        } else {
            setClassNameError(true);
            error = true;
        }
        if (formData.major != '') {
            setMajorError(false);
        } else {
            setMajorError(true);
            error = true;
        }
        if (formData.location != '') {
            setLocationError(false);
        } else {
            setLocationError(true);
            error = true;
        }

        if (error) {
            setMessage("Error: Missing Fields");
        } else {
            insertPostgresSession();
        }
    };
    

    const styles = {
        form: { display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: 'auto' },
        input: { padding: '10px', margin: '10px 0' },
        button: { padding: '10px 20px', cursor: 'pointer' },
        errorInput: { padding: '10px', margin: '10px 0', borderColor: 'red', borderStyle: 'solid', borderRadius: '3px' },
        errorText: { color: 'red' },
        successText: { color: 'green' }
    };

    return (
        <form style={styles.form} onSubmit={handleSubmit}>
            <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleInputChange}
                style={locationError ? styles.errorInput : styles.input}
            />
            <input
                type="text"
                name="major"
                placeholder="Major"
                value={formData.major}
                onChange={handleInputChange}
                style={majorError ? styles.errorInput : styles.input}
            />
            <input
                type="text"
                name="course"
                placeholder="Class Name"
                value={formData.course}
                onChange={handleInputChange}
                style={classNameError ? styles.errorInput : styles.input}
            />
            <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                style={timeError ? styles.errorInput : styles.input}
            />
            <button type="submit" style={styles.button}>Create Session</button>
            <p style={message.substring(0, 5) == 'Error' ? styles.errorText : styles.successText}>{message}</p>
        </form>
    );
}

export default CreateSessionPage;
