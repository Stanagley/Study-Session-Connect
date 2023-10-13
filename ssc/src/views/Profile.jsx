import { useEffect } from 'react';

function Profile(props) {

    useEffect(() => {
        if (localStorage.getItem('username') == '') {
            props.history.push('/login');
            window.location.reload()
        }
    }, []);

    return (
        <div>
            <div>profile for {localStorage.getItem('username')}</div>
            <div>profile for {localStorage.getItem('fname')} {localStorage.getItem('lname')}</div>
        </div>
    );
}

export default Profile;