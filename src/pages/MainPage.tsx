import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from "../components/NavBar/NavBar";

const MainPage = () => {



	return (
		<div>
			<NavBar/>
			<div style={{paddingLeft: '1rem', paddingRight: '1rem'}}>
				<Outlet/>
			</div>
		</div>
	);
};

export default MainPage;