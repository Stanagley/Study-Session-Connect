// Importing React library
import React from 'react';

// Functional component for the AboutPage
function AboutPage() {
    // Styles for the component
    const styles = {
        container: { padding: '50px 20px' },
        title: { fontSize: '2em', marginBottom: '20px' },
        section: { marginBottom: '30px' },
        sectionTitle: { fontSize: '1.5em', marginBottom: '15px' }
    };

    // JSX structure for rendering the AboutPage component
    return (
        <div style={styles.container}>
            {/* AboutPage title */}
            <h1 style={styles.title}>About Study Session Connect</h1>

            {/* AboutPage section with project information */}
            <div style={styles.section}>
                <p><strong>Lead:</strong> John Cohen</p>
                <p><strong>Contributors:</strong> Alex Liu, Stanley Guo</p>
                <p><strong>Milestones:</strong> Study Session Connect Scrum Sprints</p>
            </div>

            {/* AboutPage section with project description */}
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Project Description:</h2>
                <p>
                    In today's fast-paced academic environment, students often face challenges when it comes to finding effective study partners and coordinating study sessions. To address this need, we propose the development of a dynamic and user-friendly platform called Study Session Connect. This platform will revolutionize the way students collaborate for enhanced learning experiences.
                </p>
            </div>
        </div>
    );
}

// Exporting the AboutPage component as the default export
export default AboutPage;
