import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Box, Button, Container, Grid, Paper} from "@mui/material";
import teacher from "../../store/teacher";
import ScheduleDayDataGrid from "../../components/ScheduleDayDataGrid/ScheduleDayDataGrid";
import {GridColumns} from "@mui/x-data-grid";
import schedule from "../../store/schedule";
import subject from "../../store/subject";
import rooms from "../../store/rooms";
import moment from "moment";
import {Link, Outlet} from 'react-router-dom';

const AdminPage = observer(() => {




	return (
		<>
			<Container sx={{display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				gap: 1,
				flexWrap: 'wrap',}}

			>
				<Button variant={'outlined'} component={Link} to={'/edit/schedule'}>
					Редактирование расписания
				</Button>

				<Button variant={'outlined'} component={Link} to={'/edit/schedule'}>
					Данные
				</Button>


			</Container>

			<Outlet/>

		</>

	);
});

export default AdminPage;