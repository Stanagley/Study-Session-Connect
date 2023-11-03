import { useEffect, useState } from 'react';
import blank_profile from '../assets/blank_profile.png';

function Profile(props) {

    const styles = {
        container: { padding: '20px', maxWidth: '400px', margin: 'auto' },
        input: { width: '100%', padding: '10px', margin: '10px 0' },
        button: { padding: '10px 20px', cursor: 'pointer' },
        icon: { borderRadius: '50%', width: '100px', height: '100px'},
        editing: { display: 'flex', flexDirection: 'column'},
    };

    const [editMode, setEditMode] = useState(false);
    const [fname, setFName] = useState(localStorage.getItem('fname'));
    const [lname, setLName] = useState(localStorage.getItem('lname'));
    const [major, setMajor] = useState(localStorage.getItem('major'));
    const [gradYear, setGradYear] = useState(localStorage.getItem('gradYear'));

    useEffect(() => {
        if (localStorage.getItem('username') == '') {
            props.history.push('/login');
            window.location.reload()
        }
    }, []);

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