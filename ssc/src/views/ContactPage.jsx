// Importing React library
import React from 'react';

// Functional component for the ContactPage
function ContactPage() {
    // Styles for the component
    const styles = {
        container: { padding: '50px 20px', textAlign: 'center' },
        title: { fontSize: '2em', marginBottom: '20px' },
        description: { marginBottom: '30px' },
        button: { padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }
    };

    // JSX structure for rendering the ContactPage component
    return (
        <div style={styles.container}>
            {/* ContactPage title */}
            <h2 style={styles.title}>Contact Us</h2>

            {/* ContactPage description */}
            <p style={styles.description}>Feel free to get in touch with us for any inquiries or feedback at testing@testing.com.</p>

            {/* Contact form */}
            <form>
                <div>
                    {/* Name input field */}
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" />
                </div>

                <div>
                    {/* Email input field */}
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" />
                </div>

                <div>
                    {/* Message textarea */}
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" rows="4"></textarea>
                </div>

                {/* Submit button */}
                <button type="submit" style={styles.button}>Submit</button>
            </form>
        </div>
    );
}

// Exporting the ContactPage component as the default export
export default ContactPage;
