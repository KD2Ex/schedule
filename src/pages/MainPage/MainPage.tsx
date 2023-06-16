import React, {useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from "../../components/NavBar/NavBar";
import {Box} from "@mui/material";
import {useNavigate} from 'react-router-dom'
import GlobalAlert from "../../components/GlobalAlert/GlobalAlert";
import alert from "../../store/alerts";
import {observer} from "mobx-react-lite";
import ScheduleEditDialog from "../../components/Dialogs/ScheduleEditDialog/ScheduleEditDialog";

const MainPage = observer(() => {

	const navigate = useNavigate();

	useEffect(() => {

		//navigate('/schedule')
	}, [])

	return (
		<div>
			<NavBar/>
			<Box sx={{padding: '1rem'}}>
				<Outlet/>

			</Box>

			<GlobalAlert
				alert={alert.alert}
			/>

			<ScheduleEditDialog

			/>

		</div>
	);
});

export default MainPage;