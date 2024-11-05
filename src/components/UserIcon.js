import React from 'react';

const UserIcon = ({ name }) => {
    // Split the name into parts and get the first letter of each part
    const initials = name
        .split(' ')
        .map(part => part.charAt(0).toUpperCase())
        .join('');

    return (
        <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#007bff', // You can change this color
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            textAlign: 'center'
        }}>
            {initials}
        </div>
    );
};

export default UserIcon;
