import React, {useState} from 'react';
import {TextField, Typography} from "@mui/material";
import {SettingsBox} from "../styled/SettingsBox";
import ProfileButton from "../styled/ProfileButton";


interface UserPermissionProps {
    uuid: string,
    setUuid: React.Dispatch<string>,

}

const UserPermission = () => {

    const [uuid, setUuid] = useState('');

    const handleVerifyUser = () => {

    }

    const handleUuidChange = (e) => {
        setUuid(e.target.value)
    }

    return (
        <>
            <Typography variant={"h4"} sx={{marginBottom: 1}}>
                Подтверждение
            </Typography>
            <SettingsBox sx={{
                display: 'flex',
                gap: 2
            }}>
                <TextField
                    variant={'outlined'}
                    sx={{width: '100%'}}
                    size={"small"}
                    placeholder={'Введите UUID'}
                    value={uuid}
                    onChange={handleUuidChange}
                />
                <ProfileButton
                    onClick={handleVerifyUser}
                >
                    Подтвердить
                </ProfileButton>
            </SettingsBox>
        </>
    );
};

export default UserPermission;