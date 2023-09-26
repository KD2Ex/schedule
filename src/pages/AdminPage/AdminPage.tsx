import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Box, Button, Container, Grid, Paper} from "@mui/material";
import {Link, Outlet} from 'react-router-dom';
import AdminNavDrawer from "../../components/AdminNavDrawer/AdminNavDrawer";

const AdminPage = observer(() => {

	const [open, setOpen] = useState(false);

	return (
		<>
			<Box sx={{display: 'flex',
				alignItems: 'center',
				justifyContent: 'flex-end',
				gap: 1,
				mb: 0,
				flexWrap: 'wrap',}}

			>
				<Button
					onClick={() => setOpen(true)}
					variant={'outlined'}
					sx={{
						position: 'absolute',
						mt: 4
					}}
				>
					Меню
				</Button>
				<AdminNavDrawer
					open={open}
					setOpen={setOpen}
				/>



{/*
				<Button variant={'outlined'} component={Link} to={'/edit/schedule'}>
					Редактирование расписания
				</Button>

				<Button variant={'outlined'} component={Link} to={'/edit/data'}>
					Данные
				</Button>*/}


			</Box>

			<Outlet/>




		</>

	);
});

export default AdminPage;