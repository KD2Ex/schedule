import React, {useContext} from 'react'
import {  Button, AppBar, Toolbar, StyledEngineProvider } from '@mui/material'
import {Link as link} from 'react-router-dom';
import styles from './NavBar.module.css';
import {ColorModeContext} from "../../context";



function NavBar() {

	const changeMode = useContext(ColorModeContext);

	return (
		<StyledEngineProvider injectFirst>
			<AppBar  position='static' sx={{flexDirection: "row", py: 2, px: "2rem"}} className={styles.appBar}>
					<Button  component={link} to="/schedule" >
						Расписание
					</Button>
					<Button sx={{color: 'white'}} component={link} to="/data" >
						Списки
					</Button>
					<Button sx={{color: 'white'}} component={link} to="/profile">
						Профиль
					</Button>
				<Button onClick={() => changeMode.toggleColorMode()}>qwe123r</Button>

			</AppBar>
		</StyledEngineProvider>

	)
}

export default NavBar