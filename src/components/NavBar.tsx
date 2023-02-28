import React from 'react'
import {  Button, AppBar, Toolbar } from '@mui/material'
import {Link as link} from 'react-router-dom';



function NavBar() {

	return (

		<AppBar position='static'>
			<Toolbar sx={{
				spacing: 3,
			}}>



				<Button component={link} to="/schedule" >
					Расписание
				</Button>
				<Button component={link} to="/data" >
					Списки
				</Button>
				<Button component={link} to="/profile">
					Профиль
				</Button>

			</Toolbar>
		</AppBar>

	)
}

export default NavBar