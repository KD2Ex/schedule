import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from "../components/NavBar/NavBar";
import {Box} from "@mui/material";
import {useNavigate} from 'react-router-dom'

const MainPage = () => {

	const navigate = useNavigate();

	return (
		<div>
			<NavBar/>
			<Box sx={{padding: '1rem'}}>
				<Outlet/>
			</Box>
		</div>
	);
};

export default MainPage;