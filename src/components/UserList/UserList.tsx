import React, {FC} from 'react';
import {Box, Button, Tooltip} from "@mui/material";

interface UserListProps {
    data: any[]
}

const UserList: FC<UserListProps> = ({data}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >

            {data.map((item) => (
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        bgcolor: 'rgb(52,52,52)',
                        borderRadius: 2,
                        alignItems: 'center',
                        px: 2
                    }}>
                    {Object.entries(item).map(item => (
                        <p>
                            {item[1]}
                        </p>
                    ))}



                    <Tooltip title={'Нажмите, чтобы подвердить пользователя'}>
                        <Button
                            variant={'outlined'}
                            sx={{

                            }}
                        >
                            Подвердить
                        </Button>
                    </Tooltip>



                </Box>
            ))}
        </Box>
    );
};

export default UserList;