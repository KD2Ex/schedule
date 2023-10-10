import React, {useEffect, useState} from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import NavBar from "../../components/NavBar/NavBar";
import {Box} from "@mui/material";
import {useNavigate} from 'react-router-dom'
import {observer} from "mobx-react-lite";
import ScheduleEditDialog from "../../components/Dialogs/ScheduleEditDialog/ScheduleEditDialog";
import InfoDialog from "../../components/InfoDialog/InfoDialog";
import user from "../../store/user";

export const loader = async () => {

	const isAuth = await user.refresh()
	console.log(user.permissions.length)
	console.log(isAuth)

	if (isAuth && user.permissions.length <= 1) {
		await user.getPermissions();
	}

	return null
}

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

			<InfoDialog/>

			<ScheduleEditDialog

			/>

		</div>
	);
});

export default MainPage;