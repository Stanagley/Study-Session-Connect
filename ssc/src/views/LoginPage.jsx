function LoginPage() {
    const styles = {
        container: { padding: '20px', maxWidth: '400px', margin: 'auto' },
        input: { width: '100%', padding: '10px', margin: '10px 0' },
        button: { padding: '10px 20px', cursor: 'pointer' }
    };

    return (
        <div style={styles.container}>
            <h2>Login</h2>
            <form>
                <div>
                    <label>Email:</label>
                    <input type="email" placeholder="Enter your email" style={styles.input} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" placeholder="Enter your password" style={styles.input} />
                </div>
                <div>
                    <button type="submit" style={styles.button}>Login</button>
                </div>
            </form>
        </div>
    );
}
