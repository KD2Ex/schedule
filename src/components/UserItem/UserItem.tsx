import React, {FC, useEffect, useState} from 'react';
import {Autocomplete, Box, Button, Grid, TextField, Toolbar, Tooltip, Typography} from "@mui/material";
import {AutocompleteOption} from "../../models/interfaces/IAutocompleteOption";
import schedule from "../../store/schedule";
import user from "../../store/user";
import alerts from "../../store/alerts";
import {IUserItem} from "../../models/interfaces/IUserItem";
import ButtonUserVerify from "../ButtonUserVerify/ButtonUserVerify";
import role, {roleAliases} from "../../store/role";


interface UserItemProps {
    userInfo: IUserItem,
}

const UserItem: FC<UserItemProps> = ({userInfo}) => {


    const [value, setValue] = useState([...userInfo.roles.map(item => roleAliases.find(role => role.value === item)?.alias)])
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<AutocompleteOption[]>([...role.list]);
    const loading = open && role.list.length === 0;
    const isFullNameSet = userInfo.name !== null && userInfo.surname !== null;

    useEffect(() => {

        let active = true;

        if (!loading) {
            return undefined
        }

        (async () => {
            await role.fetchRoles();
            const roles = role.getList()
            console.log(roles)
            roles.map((item, index) => (
                {
                    id: index,
                    label: item
                }
            ));

            if (active) {

                setOptions(roles)

            }


        })()

    }, [loading])

    useEffect(() => {



    }, [open])



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
                options={options}
                onChange={async (event: any, newValue: any) => {

                    console.log('Новое значение')
                    let roleName;
                    if (value.length > newValue.length) {
                        roleName = value.filter(item => !newValue.includes(item))
                    } else {
                        roleName = newValue.filter(item => !value.includes(item))
                    }

                    roleName = roleAliases.find(item => item.alias === roleName[0])?.value
                    console.log(roleName)
                    if (value.length > newValue.length) {

                        await role.removeRole(roleName, userInfo.id)

                    } else {
                        await role.addRole(roleName, userInfo.id)
                    }

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