import React, {useEffect, useState} from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import NavBar from "../../components/NavBar/NavBar";
import {Box} from "@mui/material";
import {useNavigate} from 'react-router-dom'
import {observer} from "mobx-react-lite";
import ScheduleEditDialog from "../../components/Dialogs/ScheduleEditDialog/ScheduleEditDialog";
import InfoDialog from "../../components/InfoDialog/InfoDialog";

const MainPage = observer(() => {

	const navigate = useNavigate();

	useEffect(() => {
		//navigate('/schedule)
	}, [])

	return (
		<div>
			<NavBar/>
			<Box sx={{padding: '1rem'}}>
				<Outlet/>

			</Box>

			<InfoDialog/>

			<ScheduleEditDialog

			/>

		</div>
	);
});

export default MainPage;