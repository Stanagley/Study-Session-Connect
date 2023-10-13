import { useState, useEffect } from 'react';

function Onboarding(props) {
    const styles = {
        container: { padding: '20px', maxWidth: '400px', margin: 'auto' },
        input: { width: '100%', padding: '10px', margin: '10px 0' },
        button: { padding: '10px 20px', cursor: 'pointer' }
    };

    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    const [showOnboarding, setShowOnboarding] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // CALL API to backend to store the information
        console.log(fname);
        console.log(lname);
        storeProfileInfo();
    }

    const getUserInfo = async () => {
        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: localStorage.getItem('username') }),
            }
            const response = await fetch('http://localhost:9000/userInfo', options);
            const profile = await response.json();
            console.log(profile);
            if (profile.length != 0) {
                localStorage.setItem('fname', profile[0].fname);
                localStorage.setItem('lname', profile[0].lname);
                props.history.push('/profile');
                window.location.reload();
            } else {
                setShowOnboarding(true);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    const storeProfileInfo = async () => {
        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: localStorage.getItem('username'), firstName: fname, lastName: lname }),
            }
            const response = await fetch('http://localhost:9000/setUserInfo', options);
            const success = await response.json();
            console.log(success);
            localStorage.setItem('fname', fname);
            localStorage.setItem('lname', lname);
            props.history.push('/profile');
            window.location.reload();
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getUserInfo();
    }, [])
    
    return (
        <div style={styles.container}>
        {showOnboarding ? 
        <div>
            <h2>Onboarding</h2>
        <form>
            <div>
                <label>First Name:</label>
                <input type="username" placeholder="Enter your first name" style={styles.input} onChange={(e) => {
                    setFName(e.target.value);
                }}/>
            </div>
            <div>
                <label>Last Name:</label>
                <input type="username" placeholder="Enter your last name" style={styles.input} onChange={(e) => {
                    setLName(e.target.value);
                }}/>
            </div>
            <div>
                <button type="submit" style={styles.button} onClick={handleSubmit}>Finish</button>
            </div>
        </form> </div>: <div></div>}
    </div>
    );
}

export default Onboarding;