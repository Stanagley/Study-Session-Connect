import React from 'react';

function ContactPage() {
    const styles = {
        container: { padding: '50px 20px', textAlign: 'center' },
        title: { fontSize: '2em', marginBottom: '20px' },
        description: { marginBottom: '30px' },
        button: { padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Contact Us</h2>
            <p style={styles.description}>Feel free to get in touch with us for any inquiries or feedback at testing@testing.com.</p>
            <form>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" rows="4"></textarea>
                </div>
                <button type="submit" style={styles.button}>Submit</button>
            </form>
        </div>
    );

}

export default ContactPage;