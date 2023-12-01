import { useState } from 'react';

/**
 * 
 * @param{*} props contains the arguments to access the history of the current user. This allows us to send the user to 
 * whichever url that we want to send it to by using history.push().
 * @returns The page for Users to Login or Setup an account with a username and password
 * 
 * This code creates the page so that users can Login or setup an account. Thus we have included in this code the ability to
 * enter a username and a password and then login or sign up using those inputted values. We record these values in useState hooks
 * username and password respectively. I also wrote code so that if a user enters in a wrong username or password then it
 * will show an error. Once a user attempts to log in or sign up, then we will connect with the backend. Specifically the
 * validateUser and signupUser API's in server.js.
 * 
 */
function LoginPage(props) {
    // Styles which we use on this page to manipulate the css.
    const styles = {
        container: { padding: '20px', maxWidth: '400px', margin: 'auto' },
        input: { width: '100%', padding: '10px', margin: '10px 0' },
        inputError: { width: '100%', padding: '10px', margin: '10px 0', borderColor: 'red', borderStyle: 'solid', borderRadius: '3px' },
        button: { padding: '10px 20px', cursor: 'pointer' },
        errorText: { color: 'red'}
    };

    // The useState hooks which we use to keep track of the username, password, and any errors on the page.
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [errorText, setErrorText] = useState('');

    // The function to prepare for calling the signupUser API. This gets called when a user clicks on the "Sign Up" button.
    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        console.log(username);
        console.log(password);
        signupUserAPI();
    }

    // The function which will call the signupUser API. We send this API the username and the password that
    // the user entered so we can see whether the user can log in with those details (no users can have the same username)
    // Then we call the API and produce errors if there is an error, otherwise if successful then we will send the user
    // to be onboarded.
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

    // The function to prepare for calling the login API. This gets called when a user clicks on the "Login" button.
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        callUserAPI();
    }

    // The function which calls the login API. We send this API the entered username and password from the user and 
    // if the API returns a success then we will move on to the onboarding page. Otherwise we will show errors.
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
                {/* This div is for entering the username*/}
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
                {/* This div is for entering the password*/}
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
                {/* This div is for the buttons */}
                <div>
                    <button type="submit" style={styles.button} onClick={handleLoginSubmit}>Login</button>
                    <button type="submit" style={styles.button} onClick={handleSignUpSubmit}>Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;