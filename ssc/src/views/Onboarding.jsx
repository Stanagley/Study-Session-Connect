import { useState, useEffect } from 'react';

/**
 * 
 * @param {*} props contains the arguments so that we can access the user's history.
 * Doing this, we can then send the user to the profile page after they finish onboarding.
 * @returns The page for users to onboard themselves.
 * 
 * This code contains the code so users can onboard and then we will have their information so that we
 * can display it for other people or for themselves in their profile. We record information such as their
 * first name, last name, major, and grad year. All information that can be useful when finding session to connect on.
 */
function Onboarding(props) {
    // The styles needed so that this page can look like an actual page.
    const styles = {
        container: { padding: '20px', maxWidth: '400px', margin: 'auto' },
        input: { width: '100%', padding: '10px', margin: '10px 0' },
        inputError: { width: '100%', padding: '10px', margin: '10px 0', borderColor: 'red', borderStyle: 'solid', borderRadius: '3px' },
        button: { padding: '10px 20px', cursor: 'pointer' }
    };

    // The useState hooks to record a user's entered info and any errors.
    const [fname, setFName] = useState('');
    const [fnameError, setFNameError] = useState(false);
    const [lname, setLName] = useState('');
    const [lnameError, setLNameError] = useState(false);
    const [major, setMajor] = useState('');
    const [majorError, setMajorError] = useState(false);
    const [gradYear, setGradYear] = useState(0);
    const [gradYearError, setGradYearError] = useState(false);
    const possibleMajors = [
        'ARCH',
        'ARTS',
        'ASTR',
        'BCBP',
        'BIOL',
        'BMED',
        'BUSN',
        'CHEM',
        'CHME',
        'CIVL',
        'COGS',
        'COMM',
        'CSCI',
        'ECON',
        'ECSE',
        'ENGR',
        'ENVE',
        'ERTH',
        'ESCI',
        'GSAS',
        'IHSS',
        'ISCI',
        'ISYE',
        'ITWS',
        'MANE',
        'MATH',
        'MATP',
        'MGMT',
        'MTLE',
        'LANG',
        'LITR',
        'PHIL',
        'PHYS',
        'PSYC',
        'STSO',
        'WRIT',
    ]
    const [showOnboarding, setShowOnboarding] = useState(false);
    
    // This function checks for any errors once they submit all of their info.
    const handleSubmit = (e) => {
        e.preventDefault();
        let error = false;
        if (fname == '' || fnameError) {
            setFNameError(true);
            error = true;
        }
        if (lname == '' || lnameError) {
            setLNameError(true);
            error = true;
        }
        if (major == '' || majorError) {
            setMajorError(true);
            error = true;
        }
        if (gradYear == 0 || gradYearError) {
            setGradYearError(true);
            error = true;
        }
        if (!error) {
            storeProfileInfo();
        }
    }

    // This function calls the userInfo API. If the user already has information then we will redirect them to their profile.
    // If they don't have any information submitted yet, then we will allow them to stay on this onboarded page so that they
    // can fill out their info.
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
                localStorage.setItem('major', profile[0].major);
                localStorage.setItem('gradYear', profile[0].gradyear);
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

    // This function calls the setUserInfo API. We send this API all of the submitted info from the user so that we can
    // record it in the databse. If this works out successfully, then we will redirect the user to their profile where it 
    // will display their information.
    const storeProfileInfo = async () => {
        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: localStorage.getItem('username'), firstName: fname, lastName: lname, 
                                       major: major, gradYear: gradYear }),
            }
            const response = await fetch('http://localhost:9000/setUserInfo', options);
            const success = await response.json();
            console.log(success);
            localStorage.setItem('fname', fname);
            localStorage.setItem('lname', lname);
            localStorage.setItem('major', major);
            localStorage.setItem('gradYear', gradYear);
            props.history.push('/profile');
            window.location.reload();
        }
        catch (e) {
            console.log(e)
        }
    }

    // This useEffect hook calls the getUserInfo function so that we can immediately check if a user
    // has already submitted their information and redirect them if necessary.
    useEffect(() => {
        getUserInfo();
    }, [])
    
    return (
        <div style={styles.container}>
        {showOnboarding ? 
        <div>
            <h2>Onboarding</h2>
        <form>
            {/* This div records the user's first name*/}
            <div>
                <label>First Name:</label>
                <input type="username" placeholder="Enter your first name" style={fnameError ? styles.inputError : styles.input} onChange={(e) => {
                    setFName(e.target.value);
                    if (e.target.value != '') {
                        setFNameError(false);
                    }
                }}/>
            </div>
            {/* This div records the user's last name*/}
            <div>
                <label>Last Name:</label>
                <input type="username" placeholder="Enter your last name" style={lnameError ? styles.inputError : styles.input} onChange={(e) => {
                    setLName(e.target.value);
                    if (e.target.value != '') {
                        setLNameError(false);
                    }
                }}/>
            </div>
            {/* This div records the user's major*/}
            <div>
                <label>Major:</label>
                <input type="username" placeholder="Enter your major (4 letter code)" style={majorError ? styles.inputError : styles.input} onChange={(e) => {
                    setMajor(e.target.value.toUpperCase());
                    if (!possibleMajors.includes(e.target.value.toUpperCase())) {
                        setMajorError(true);
                    } else {
                        setMajorError(false);
                    }
                }}/>
            </div>
            {/* This div records the user's grad year*/}
            <div>
                <label>Grad Year:</label>
                <input type="username" placeholder="Enter your grad year" style={gradYearError ? styles.inputError : styles.input} onChange={(e) => {
                    let year = parseInt(e.target.value);
                    let current = new Date();
                    setGradYear(e.target.value);
                    if (isNaN(year) || year < current.getFullYear() || year > current.getFullYear() + 6) {
                        setGradYearError(true);
                    } else {
                        setGradYearError(false);
                    }
                }}/>
            </div>
            {/* This div contains the button to submit */}
            <div>
                <button type="submit" style={styles.button} onClick={handleSubmit}>Finish</button>
            </div>
        </form> </div>: <div></div>}
    </div>
    );
}

export default Onboarding;