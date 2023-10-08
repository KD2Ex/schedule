import React, {FC, Fragment, useState} from 'react';
import {Box, Button, Divider, Drawer, List, ListItem, ListItemButton, Toolbar, useTheme} from "@mui/material";
import {Link} from "react-router-dom";
import user from "../../store/user";

interface AdminNavDrawerProps {
    open: boolean,
    setOpen: React.Dispatch<boolean>
}

const AdminNavDrawer: FC<AdminNavDrawerProps> = ({open, setOpen}) => {

    const scheduleList = [
        {
            url: '/edit/schedule',
            title: 'Редактирование расписания',
            visible: !!user.permissions.find(item => item === "schedule.updating.replacement")
        },
        {
            url: '/edit/users',
            title: 'Пользователи',
            visible: !!user.permissions.find(item => item === "verified.add")
        }
    ]

    const dataEditList = [
        {url: '/edit/data/subjects', title: 'Дисциплины'},
        {url: '/edit/data/teachers', title: 'Преподаватели'},
        {url: '/edit/data/groups', title: 'Группы'},
        {url: '/edit/data/rooms', title: 'Аудитории'},
    ]
    const lists = [
        scheduleList,
        //dataEditList
    ]

    const handleClose = () => {
        setOpen(false)
    }

    const theme = useTheme();

    return (

        <Drawer
           // variant={'persistent'}
            open={open}
            anchor={'right'}
            onClose={handleClose}
            sx={{
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    boxSizing: 'border-box',
                    bgcolor: theme.palette.background.default,
                    backgroundImage: 'none',
                    borderLeft: `1px solid ${theme.palette.primary.pale}`
                },
            }}
        >

            <Toolbar
                sx={{
                    mb: 2
                }}/>


           {/* <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'flex-start',
                    p: 1
                }}
            >
                <Button onClick={() => setOpen(false)}>
                    Скрыть
                </Button>
            </Box>
*/}

            <Box
                sx={{ overflow: 'auto' }}
                onClick={() => setOpen(false)}
            >

                {lists.map((list, index) => (
                    <Fragment key={index}>
                        <Divider/>
                        <List
                        >
                            {list.map((item) => (
                                item.visible &&
                                <ListItem
									key={item.url}
                                    sx={{
                                        py: 0,
                                    }}
                                >
                                    <ListItemButton
                                        sx={{
                                            height: 48
                                        }}
                                        component={Link}
                                        to={item.url}
                                    >
                                        {item.title}
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Fragment>
                ))}


            </Box>

        </Drawer>
    );
};

export default AdminNavDrawer;