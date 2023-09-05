import React, {FC, Fragment, useState} from 'react';
import {Box, Button, Divider, Drawer, List, ListItem, ListItemButton, Toolbar} from "@mui/material";
import {Link} from "react-router-dom";

interface AdminNavDrawerProps {
    open: boolean,
    setOpen: React.Dispatch<boolean>
}

const AdminNavDrawer: FC<AdminNavDrawerProps> = ({open, setOpen}) => {

    const scheduleList = [
        {url: '/edit/schedule', title: 'Редактирование расписания'}
    ]

    const dataEditList = [
        {url: '/edit/data/subjects', title: 'Дисциплины'},
        {url: '/edit/data/teachers', title: 'Преподаватели'},
        {url: '/edit/data/groups', title: 'Группы'},
        {url: '/edit/data/rooms', title: 'Аудитории'},
    ]
    const lists = [
        scheduleList,
        dataEditList
    ]

    return (

        <Drawer
            variant={'persistent'}
            open={open}
            sx={{
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {  boxSizing: 'border-box' },
            }}
        >

            <Toolbar
                sx={{
                    mb: 2
                }}/>


            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'flex-start'
                }}
            >
                <Button onClick={() => setOpen(false)}>
                    Скрыть
                </Button>
            </Box>


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