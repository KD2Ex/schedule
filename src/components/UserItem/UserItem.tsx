import React, {FC, useState} from 'react';
import {Autocomplete, Box, Button, Grid, TextField, Toolbar, Tooltip, Typography} from "@mui/material";
import {AutocompleteOption} from "../../models/interfaces/IAutocompleteOption";
import schedule from "../../store/schedule";
import user from "../../store/user";
import alerts from "../../store/alerts";


interface UserItemProps {
    info: any,
    permissions: any[]
}

const UserItem: FC<UserItemProps> = ({info, permissions}) => {


    const [value, setValue] = useState([])
    const [open, setOpen] = useState(false);

    const isFullNameSet = info.name !== null && info.surname !== null;

    const handleVerify = async () => {


        try {
            await user.verifyUser(info.uuid);
            alerts.openSuccessAlert('Пользователь подтвержден')
        } catch (e) {

            switch (e.response.data.code) {
                case 1: {
                    alerts.openErrorAlert('Ошибка: UUID отсутствует')
                    break;
                }
                case 2: {
                    alerts.openErrorAlert('Ошибка: Пользователь не существует')
                    break;
                }
                case 3: {
                    alerts.openErrorAlert('Ошибка: ФИО не заполнено')
                    break;
                }
                case 4: {
                    alerts.openErrorAlert('Ошибка: Пользователь уже верифицирован')
                    break;
                }

            }

        }

    }

    const handleRemove = async () => {

    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 2,
                alignItems: 'center',
                flexWrap: {xs: 'wrap', md: 'nowrap'},
                width: '100%'
            }}
        >

                <Typography
                    sx={{
                        minWidth: '30%'
                    }}
                >
                    {
                        isFullNameSet ?
                            `${info.surname} 
                         ${info.name} 
                        ${info.patronymic}`
                            : 'Имя не задано'
                    }
                </Typography>


            <Typography
                sx={{
                    minWidth: '30%'
                }}
            >
                {info.uuid}
            </Typography>

            <Button
                variant={'contained'}
                disabled={!isFullNameSet}
                onClick={handleVerify}
                sx={{
                    minWidth: '130px'
                }}
            >
                <Tooltip title={'Нажмите, чтобы подвердить пользователя'}>
                    <span>Подвердить</span>

                </Tooltip>
            </Button>
            <Autocomplete
                value={value}
                open={open}
                size='small'
                multiple
                sx={{width: '100%'}}
                onOpen={() => {
                    setOpen(true)
                }}
                onClose={() => {
                    setOpen(false);
                }}
                renderInput={(params) => (<TextField
                    {...params}
                    label={`Роль`}
                    InputProps={{
                        ...params.InputProps,
                    }}
                />)}
                options={permissions}
                onChange={(event: any, newValue: any) => {

                    setValue(newValue);
                }}
            />
        </Box>
    )

   /* return (
        <Grid
            container
            spacing={1}
            sx={{
                display: 'flex',
                bgcolor: (theme) => theme.palette.background.block,
                borderRadius: 2,
                alignItems: 'center',
                px: 1,
                py: 1
            }}>

            <Grid
                item
                xs={12}
                md={3}
            >
                {
                    isFullNameSet ?
                        `${info.surname} 
                         ${info.name} 
                        ${info.patronymic}`
                            : 'Имя не задано'
                }
            </Grid>

            <Grid
                item
                xs={12}
                md={3}
            >
                {info.uuid}
            </Grid>

            <Grid
                item
                md={2}
            >
                <Button
                    variant={'contained'}
                    disabled={!isFullNameSet}
                    sx={{

                    }}
                >
                    <Tooltip title={'Нажмите, чтобы подвердить пользователя'}>
                        <span>Подвердить</span>

                    </Tooltip>
                </Button>

            </Grid>


            <Grid
                item
                md={3}
            >
                <Autocomplete
                    value={value}
                    open={open}
                    size='small'
                    multiple
                    sx={{width: '100%'}}
                    onOpen={() => {
                        setOpen(true)
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    renderInput={(params) => (<TextField
                        {...params}
                        label={`Роль`}
                        InputProps={{
                            ...params.InputProps,
                        }}
                    />)}
                    options={permissions}
                    onChange={(event: any, newValue: any) => {

                        setValue(newValue);
                    }}
                />
            </Grid>
        </Grid>
    );*/
};

export default UserItem;