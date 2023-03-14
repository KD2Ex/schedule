import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from "../components/NavBar/NavBar";

const MainPage = () => {
	return (
		<div>
			<NavBar/>
			<div style={{paddingLeft: '2rem', paddingRight: '2rem'}}>
				<Outlet/>
			</div>
		</div>
	);
};

export default MainPage;