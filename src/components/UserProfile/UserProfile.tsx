import React from 'react';
import {Paper} from "@mui/material";


interface UserProfileProps {
    name: string;
    email: string;
    group: string;
    avatarUrl: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, email, group, avatarUrl }) => {
    return (
        <Paper elevation={3} sx={{maxWidth: 800, margin: '20px auto', padding: 3}}>
        <div className="user-profile">
            <h2>Профиль пользователя</h2>
            <div className="profile-info">
                <div className="avatar">
                    <img src={avatarUrl} alt="Avatar" className="avatar-img" />
                </div>
                <div className="user-details">
                    <p><strong>Имя:</strong> {name}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Группа:</strong> {group}</p>
                </div>
            </div>
        </div>
        </Paper>
    );
};

export default UserProfile;
