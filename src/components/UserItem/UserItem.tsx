import React, {FC, useState} from 'react';
import {Autocomplete, Box, Button, Grid, TextField, Tooltip} from "@mui/material";
import {AutocompleteOption} from "../../models/interfaces/IAutocompleteOption";
import schedule from "../../store/schedule";


interface UserItemProps {
    info: any,
    permissions: any[]
}

const UserItem: FC<UserItemProps> = ({info, permissions}) => {


    const [value, setValue] = useState([])
    const [open, setOpen] = useState(false);

    const isFullNameSet = info.name !== null && info.surname !== null;

    return (
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
                md={2}
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
                md={1.5}
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
                md
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
    );
};

export default UserItem;