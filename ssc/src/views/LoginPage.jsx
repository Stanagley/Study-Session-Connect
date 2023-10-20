import { useState } from 'react';

function LoginPage(props) {
    const styles = {
        container: { padding: '20px', maxWidth: '400px', margin: 'auto' },
        input: { width: '100%', padding: '10px', margin: '10px 0' },
        inputError: { width: '100%', padding: '10px', margin: '10px 0', borderColor: 'red', borderStyle: 'solid', borderRadius: '3px' },
        button: { padding: '10px 20px', cursor: 'pointer' },
        errorText: { color: 'red'}
    };

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [errorText, setErrorText] = useState('');

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        console.log(username);
        console.log(password);
        // ADD FUNCTIONALITY DEAL WITH BACKEND
        // 1. check unique user already in ds (this user already used)
        // 2. if unqiue, create new user with password
        signupUserAPI();
    }

    const signupUserAPI = async () => {
        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: username, password: password}),
            }
            const response = await fetch('http://localhost:9000/signup', options);
            const success = await response.json();
            console.log(success);
            if (success.value) {
                localStorage.setItem("username", username);
                props.history.push('/onboarding');
                window.location.reload();
            } else {
                setLoginError(true);
                setErrorText("A user with that username already exists")
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        callUserAPI();
    }

    const callUserAPI = async () => {
        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: username, password: password}),
            }
            const response = await fetch('http://localhost:9000/login', options);
            const success = await response.json();
            console.log(success.value);
            if (success.value) {
                localStorage.setItem("username", username);
                props.history.push('/onboarding');
                window.location.reload();
            } else {
                setLoginError(true);
                setErrorText("Your username or password was typed incorrectly");
            }
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
                    {loginError ? 
                    <p style={styles.errorText}>{errorText}</p> : <></>}
                    <label>Username:</label>
                    <input type="username" placeholder="Enter your username" style={usernameError ? styles.inputError : styles.input} onChange={(e) => {
                        setUsername(e.target.value);
                        if (e.target.value == '') {
                            setUsernameError(true);
                        } else {
                            setUsernameError(false);
                        }
                    }}/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" placeholder="Enter your password" style={passwordError ? styles.inputError : styles.input} onChange={(e) => {
                        setPassword(e.target.value);
                        if (e.target.value == '') {
                            setPasswordError(true);
                        } else {
                            setPasswordError(false);
                        }
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