import React, {useEffect, useState} from 'react';
import {Box, Button, List, ListItemButton, OutlinedInput, TextField, Tooltip, Typography} from "@mui/material";
import UserList from "../../components/UserList/UserList";

const EditUsersPage = () => {

    const data = [
        {
            firstName: 'Кирилл',
            lastName: 'Костицу',
            patronymic: 'Андреевич',
            uuid: '2cd3e28e-4f09-11ee-be56-0242ac120002',
            group: '632-КД9-4ИСП'
        },
        {
            firstName: 'Кирилл',
            lastName: 'Костицу',
            patronymic: 'Андреевич',
            uuid: '2cd3e28e-4f09-11ee-be56-0242ac120002',
            group: '632-КД9-4ИСП'
        },
        {
            firstName: 'Кирилл',
            lastName: 'Костицу',
            patronymic: 'Андреевич',
            uuid: '2cd3e28e-4f09-11ee-be56-0242ac120002',
            group: '632-КД9-4ИСП'
        },
        {
            firstName: 'Кирилл',
            lastName: 'Костицу',
            patronymic: 'Андреевич',
            uuid: '2cd3e28e-4f09-11ee-be56-0242ac120002',
            group: '632-КД9-4ИСП'
        },
        {
            firstName: 'Кирилл',
            lastName: 'Костицу',
            patronymic: 'Андреевич',
            uuid: '2cd3e28e-4f09-11ee-be56-0242ac120002',
            group: '632-КД9-4ИСП'
        },


    ]

    const [value, setValue] = useState('');
    const [list, setList] = useState([]);

    useEffect(() => {

        const newList = data.filter(item => item.uuid === value);

        setList(newList);

    }, [value])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1
            }}
        >

            <Typography
                variant={'h4'}
                sx={{
                    fontWeight: 600
                }}
            >
                Подтверждение пользователей

            </Typography>

            <Typography>
                Введите UUID пользователя и нажмите "Подтвердить" для подтверждения ФИО
                и предоставления дополнительных функций
            </Typography>

            <TextField
                label="Поиск"
                variant="outlined"
                placeholder={'Введите UUID'}
                sx={{
                    width: '350px',
                    mb: 2
                }}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />

            {
                list.length !== 0
                    ? <UserList
                        data={list}
                    />

                    : value ?
                    <Typography>
                        Пользователи не найдены!
                    </Typography> : null
            }


        </Box>
    );
};

export default EditUsersPage;