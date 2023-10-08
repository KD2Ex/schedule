import React, {FC, useEffect} from 'react';
import {Autocomplete, Box, Button, TextField, Tooltip} from "@mui/material";
import UserItem from "../UserItem/UserItem";
import UserService from "../../api/services/UserService";
import role from "../../store/role";

interface UserListProps {
    data: any[]
}

const UserList: FC<UserListProps> = ({data}) => {

    console.log(data)

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
                />
            ))}
        </Box>
    );
};

export default UserList;