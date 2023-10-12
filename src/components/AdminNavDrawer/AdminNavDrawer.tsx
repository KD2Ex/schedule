import React, {FC, Fragment, useEffect, useState} from 'react';
import {Box, Button, Divider, Drawer, List, ListItem, ListItemButton, Toolbar, useTheme} from "@mui/material";
import {Link} from "react-router-dom";
import user from "../../store/user";
import {adminNavList} from "./data";

interface AdminNavDrawerProps {
    open: boolean,
    setOpen: React.Dispatch<boolean>
}


const AdminNavDrawer: FC<AdminNavDrawerProps> = ({open, setOpen}) => {


    useEffect(() => {

        adminNavList.forEach((item) => {
            const permissions = user.accessUrls
                .find(url => url.url === item.url)?.permissions

            let visible = false;

            user.permissions.forEach((permit) => {
                if (permissions.includes(permit)) {
                    visible = true;
                }
            })
            item.visible = visible
        })

    }, [])


    const dataEditList = [
        {url: '/edit/data/subjects', title: 'Дисциплины'},
        {url: '/edit/data/teachers', title: 'Преподаватели'},
        {url: '/edit/data/groups', title: 'Группы'},
        {url: '/edit/data/rooms', title: 'Аудитории'},
    ]
    const lists = [
        adminNavList,
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
                                        px: 0,

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