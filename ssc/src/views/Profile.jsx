import { useEffect, useState } from 'react';
import blank_profile from '../assets/blank_profile.png';

/**
 * 
 * @param {*} props is an argument that gives us access to the user's history so that we can push the user
 * to the login page.
 * @returns The page for the user to view their profile. This contains information such as a user's inputted
 * grad year or major.
 * 
 * This code creates the page for users to look at their profile. Their profile contains their first name, last name
 * major, and grad year. They are able to view all of this information as long as the user is logged in and it is all saved
 * in the database.
 */
function Profile(props) {
    // These styles allow us to make the page look better
    const styles = {
        container: { padding: '20px', maxWidth: '400px', margin: 'auto' },
        input: { width: '100%', padding: '10px', margin: '10px 0' },
        button: { padding: '10px 20px', cursor: 'pointer' },
        icon: { borderRadius: '50%', width: '100px', height: '100px'},
        editing: { display: 'flex', flexDirection: 'column'},
    };

    // These are the useState hooks that we use to record the first name, last name, major, and grad year.
    // These would be important for editing a user's information
    const [editMode, setEditMode] = useState(false);
    const [fname, setFName] = useState(localStorage.getItem('fname'));
    const [lname, setLName] = useState(localStorage.getItem('lname'));
    const [major, setMajor] = useState(localStorage.getItem('major'));
    const [gradYear, setGradYear] = useState(localStorage.getItem('gradYear'));

    // This useEffect is for checking if a user is logged in or not. If the user is not logged in then we send them
    // to the login page.
    useEffect(() => {
        if (localStorage.getItem('username') == '') {
            props.history.push('/login');
            window.location.reload()
        }
    }, []);

    // This function handles whether or not a user is editing their profile.
    function handleEdit() {
        if (editMode) {
            // saving
            setEditMode(false);
            console.log('save');
            // Add API for saving new profile info
        } else {
            setEditMode(true);
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.icon}>
                <img src={blank_profile} style={styles.icon}/>
            </div>
            {
                editMode ? 
                <div style={styles.editing}>
                    <input placeholder='First Name' value={fname} style={styles.input} onChange={(e) => {
                        setFName(e.target.value);
                    }}/>
                    <input placeholder='Last Name' value={lname} style={styles.input} onChange={(e) => {
                        setLName(e.target.value);
                    }}/>
                    <input placeholder='Major' value={major} style={styles.input} onChange={(e) => {
                        setMajor(e.target.value);
                    }}/>
                    <input placeholder='Grad Year' value={gradYear} style={styles.input} onChange={(e) => {
                        setGradYear(e.target.value);
                    }}/>
                    <button onClick={handleEdit}>Save</button>
                </div> :
                <div>
                 <h2>{localStorage.getItem('fname')} {localStorage.getItem('lname')}</h2>
                 <h3>{localStorage.getItem('major')}</h3>
                 <h3>{localStorage.getItem('gradYear')}</h3>
                 <button onClick={handleEdit}>Edit</button>
             </div>
                
            }
        </div>
    );
}

export default Profile;