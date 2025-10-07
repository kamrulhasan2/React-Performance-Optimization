import React, { useState, useEffect } from 'react';


const UserProfile = ({ firstName, lastName }) => {
    // const [fullName, setFullName] = useState('');

    // useEffect(() => {
    //     setFullName(`${firstName} ${lastName}`);
    // }, [firstName, lastName]);

    // Here useEffect crate an extra side effect, so we can directly use the props 
    // without useEffect and useState

    const fullName = `${firstName} ${lastName}`;

    return <h1>Welcome, {fullName}</h1>;

};

export default UserProfile;