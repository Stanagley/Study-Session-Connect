import { useEffect } from 'react';
import blank_profile from '../assets/blank_profile.png';

function Profile(props) {

    const styles = {
        container: { padding: '20px', maxWidth: '400px', margin: 'auto' },
        input: { width: '100%', padding: '10px', margin: '10px 0' },
        button: { padding: '10px 20px', cursor: 'pointer' },
        icon: { borderRadius: '50%', width: '100px', height: '100px'}
    };

    useEffect(() => {
        if (localStorage.getItem('username') == '') {
            props.history.push('/login');
            window.location.reload()
        }
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.icon}>
                <img src={blank_profile} style={styles.icon}/>
            </div>
            <h2>{localStorage.getItem('fname')} {localStorage.getItem('lname')}</h2>
            <h3>{localStorage.getItem('major')}</h3>
            <h3>{localStorage.getItem('gradYear')}</h3>
        </div>
    );
}

export default Profile;