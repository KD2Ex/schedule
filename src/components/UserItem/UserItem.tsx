import React, {FC, useEffect, useState} from 'react';
import {Autocomplete, Box, Button, Grid, TextField, Toolbar, Tooltip, Typography} from "@mui/material";
import {AutocompleteOption} from "../../models/interfaces/IAutocompleteOption";
import schedule from "../../store/schedule";
import user from "../../store/user";
import alerts from "../../store/alerts";
import {IUserItem} from "../../models/interfaces/IUserItem";
import ButtonUserVerify from "../ButtonUserVerify/ButtonUserVerify";
import role, {roleAliases} from "../../store/role";
import {observer} from "mobx-react-lite";


interface UserItemProps {
    userInfo: IUserItem,
}

const UserItem: FC<UserItemProps> = ({userInfo}) => {

    console.log(userInfo.roles)
    const [value, setValue] = useState([...userInfo.roles.map(item => roleAliases.find(role => role.value === item)?.alias)])
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<AutocompleteOption[]>([...role.list]);
    const loading = open && role.list.length === 0;
    const isFullNameSet = userInfo.name !== '' && userInfo.surname !== '';

    const isAdmin = user.permissions.find(item => item === "role.manager.available")

    /*useEffect(() => {

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

        return () => {
            active = false;
        }

    }, [loading])*/

    useEffect(() => {


    }, [open])


    useEffect(() => {


        console.log(userInfo.roles)

        setValue([...userInfo.roles.map(item => roleAliases.find(role => role.value === item)?.alias)])

    }, [userInfo])

    return (
        <Grid
            container
            columns={isAdmin ? 12 : 8}
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
                        `${userInfo.surname} 
                         ${userInfo.name} 
                        ${userInfo.patronymic}`
                            : 'Имя не задано'
                }
            </Grid>

            <Grid
                item
                xs={12}
                md={3}
            >
                {userInfo.uuid}
            </Grid>

            <Grid
                item
                md={2}
                lg={1.5}
            >
               {/* <Button
                    variant={'contained'}
                    disabled={!isFullNameSet}
                    sx={{

                    }}
                >
                    <Tooltip title={'Нажмите, чтобы подвердить пользователя'}>
                        <span>Подвердить</span>

                    </Tooltip>
                </Button>*/}

                <ButtonUserVerify
                    disabled={!isFullNameSet}
                    verified={userInfo.verified}
                    uuid={userInfo.uuid}
                />


            </Grid>


            {
                isAdmin && (
                    <Grid
                        item
                        xs={12}
                        md={4}
                        lg={4.5}
                    >
                        <Autocomplete
                            value={value}
                            open={open}
                            size='small'
                            multiple
                            //disabled={!user.permissions.find(item => item === 'role.manager.add')}
                            sx={{
                                width: '100%',
                                mt: {xs: 1, md: 0},
                                '& .MuiChip-label': {
                                    color: 'white'
                                }
                            }}
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
                    </Grid>
                )
            }


        </Grid>
    );
};

export default observer(UserItem);