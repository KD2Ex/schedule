import React, {FC, useState} from 'react';
import {Autocomplete, Box, Button, Grid, TextField, Toolbar, Tooltip, Typography} from "@mui/material";
import {AutocompleteOption} from "../../models/interfaces/IAutocompleteOption";
import schedule from "../../store/schedule";
import user from "../../store/user";
import alerts from "../../store/alerts";
import {IUserItem} from "../../models/interfaces/IUserItem";
import ButtonUserVerify from "../ButtonUserVerify/ButtonUserVerify";


interface UserItemProps {
    userInfo: IUserItem,
    permissions: any[]
}

const UserItem: FC<UserItemProps> = ({userInfo, permissions}) => {


    const [value, setValue] = useState([])
    const [open, setOpen] = useState(false);

    const isFullNameSet = userInfo.name !== null && userInfo.surname !== null;

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
                            `${userInfo.surname} 
                         ${userInfo.name} 
                        ${userInfo.patronymic}`
                            : 'Имя не задано'
                    }
                </Typography>

            <Typography
                sx={{
                    minWidth: '30%'
                }}
            >
                {userInfo.uuid}
            </Typography>

            <ButtonUserVerify
                verified={userInfo.verified}
                uuid={userInfo.uuid}
            />

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