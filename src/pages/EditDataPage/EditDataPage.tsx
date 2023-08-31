import React, {useState} from 'react';
import {Box, Button, Divider, Drawer, List, ListItem, ListItemButton, Toolbar} from "@mui/material";
import {Outlet} from "react-router-dom";
import AdminNavDrawer from "../../components/AdminNavDrawer/AdminNavDrawer";

const EditDataPage = () => {




    return (
        <div >

            <Outlet/>

        </div>
    );
};

export default EditDataPage;