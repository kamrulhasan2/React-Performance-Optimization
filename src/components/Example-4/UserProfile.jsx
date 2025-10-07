import React, { useState, useEffect } from 'react';


const UserProfile = ({ firstName, lastName }) => {
    const [fullName, setFullName] = useState('');

    useEffect(() => {
        setFullName(`${firstName} ${lastName}`);
    }, [firstName, lastName]);

    return <h1>Welcome, {fullName}</h1>;

};

export default UserProfile;