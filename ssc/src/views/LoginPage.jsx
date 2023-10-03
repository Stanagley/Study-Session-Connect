import { useState } from 'react';

function LoginPage() {
    const styles = {
        container: { padding: '20px', maxWidth: '400px', margin: 'auto' },
        input: { width: '100%', padding: '10px', margin: '10px 0' },
        button: { padding: '10px 20px', cursor: 'pointer' }
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUpSubmit = (e) => {
        console.log(username);
        console.log(password);
        // ADD FUNCTIONALITY DEAL WITH BACKEND
        // 1. check unique user already in ds (this user already used)
        // 2. if unqiue, create new user with password
    }

    const handleLoginSubmit = (e) => {
        console.log(username);
        console.log(password);
        // ADD FUNCTIONALITY DEAL WITH BACKEND
        // 1. Check if user exists (no such user)
        // 2. Check if correct password (incorrect password)
        callUserAPI();
    }

    const callUserAPI = async () => {
        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "Access-Control-Request-Method": "*"
                },
                body: JSON.stringify({ username: username, password: password})
            }
            const response = await fetch('http://localhost:9000/login', options);
            // callback(response);
            const users = await response.json();
            console.log({ users });
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <div style={styles.container}>
            <h2>Login</h2>
            <form>
                <div>
                    <label>Username:</label>
                    <input type="username" placeholder="Enter your username" style={styles.input} onChange={(e) => {
                        setUsername(e.target.value);
                    }}/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" placeholder="Enter your password" style={styles.input} onChange={(e) => {
                        setPassword(e.target.value);
                    }}/>
                </div>
                <div>
                    <button type="submit" style={styles.button} onClick={handleLoginSubmit}>Login</button>
                    <button type="submit" style={styles.button} onClick={handleSignUpSubmit}>Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;