function Profile(props) {
    return (
        <div>
            profile for
            <p>{localStorage.getItem('username')}</p>
        </div>
    );
}

export default Profile;