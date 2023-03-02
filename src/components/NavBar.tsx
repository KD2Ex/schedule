import React from 'react'
import {  Button, AppBar, Toolbar } from '@mui/material'
import {Link as link} from 'react-router-dom';



function NavBar() {

	return (

		<AppBar position='static'>
			<Toolbar sx={{
				spacing: 3,

			}}>

				<Button sx={{color: 'white'}} component={link} to="/schedule" >
					Расписание
				</Button>
				<Button sx={{color: 'white'}} component={link} to="/data" >
					Списки
				</Button>
				<Button sx={{color: 'white'}} component={link} to="/profile">
					Профиль
				</Button>

			</Toolbar>
		</AppBar>

	)
}

export default NavBar