import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Profile() {
  const { user } = useAuth0();
    console.log(user);
  return (
        <div>
            <p>Email: {user.email}</p>
            <p>Email verified: {user.email_verified ? "Da" : "Ne"}</p>
            <p>Name: {user.name}</p>
            <p>Nickname: {user.nickname}</p>
        </div>
    );
}

export default Profile;