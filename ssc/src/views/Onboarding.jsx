import { useState, useEffect } from 'react';

function Onboarding(props) {
    const styles = {
        container: { padding: '20px', maxWidth: '400px', margin: 'auto' },
        input: { width: '100%', padding: '10px', margin: '10px 0' },
        inputError: { width: '100%', padding: '10px', margin: '10px 0', borderColor: 'red', borderStyle: 'solid', borderRadius: '3px' },
        button: { padding: '10px 20px', cursor: 'pointer' }
    };

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
                <input type="username" placeholder="Enter your first name" style={fnameError ? styles.inputError : styles.input} onChange={(e) => {
                    setFName(e.target.value);
                    if (e.target.value != '') {
                        setFNameError(false);
                    }
                }}/>
            </div>
            <div>
                <label>Last Name:</label>
                <input type="username" placeholder="Enter your last name" style={lnameError ? styles.inputError : styles.input} onChange={(e) => {
                    setLName(e.target.value);
                    if (e.target.value != '') {
                        setLNameError(false);
                    }
                }}/>
            </div>
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
            <div>
                <button type="submit" style={styles.button} onClick={handleSubmit}>Finish</button>
            </div>
        </form> </div>: <div></div>}
    </div>
    );
}

export default Onboarding;