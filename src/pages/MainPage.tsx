import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from "../components/NavBar/NavBar";
import {Box} from "@mui/material";

const MainPage = () => {



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