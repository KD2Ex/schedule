import React, {FC} from 'react';
import {Autocomplete, Box, Button, TextField, Tooltip} from "@mui/material";
import UserItem from "../UserItem/UserItem";

interface UserListProps {
    data: any[]
}

const UserList: FC<UserListProps> = ({data}) => {

    const permissions = [
        {id: 1, label: 'Студент'},
        {id: 2, label: 'Преподаватель'},
        {id: 2, label: 'Администратор'},
    ]

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >

            {data.map((item, index) => (
                <UserItem
                    key={index}
                    userInfo={item}
                    permissions={permissions}
                />
            ))}
        </Box>
    );
};

export default UserList;