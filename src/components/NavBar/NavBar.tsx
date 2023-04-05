import React, {useContext} from 'react'
import {
	Button,
	AppBar,
	Toolbar,
	StyledEngineProvider,
	IconButton,
	ButtonProps,
	ButtonBaseProps,
	Box
} from '@mui/material'
import {styled} from '@mui/material/styles';
import {Link as link} from 'react-router-dom';
import styles from './NavBar.module.css';
import {AuthContext, ColorModeContext} from "../../context";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import {NavBarButton} from "../UI/NavBarButton/NavBarButton";
import user from '../../store/user'




function NavBar() {

	const changeMode = useContext(ColorModeContext);
	const changeAuth = useContext(AuthContext);





	return (
		<StyledEngineProvider injectFirst>
			<Box sx={{flexGrow: 1}}>
				<AppBar position='static' sx={{}} className={styles.appBar}>
					<Toolbar disableGutters>
						<Box sx={{flexGrow: 1}}>

							<NavBarButton component={link} to="/schedule" >
								Расписание
							</NavBarButton>
							<NavBarButton  onClick={() => changeAuth.changeAuth()}>
								Авторизация
							</NavBarButton>
							{/*<Button sx={{color: 'white'}} component={link} to="/data" >
								Списки
							</Button>
							<Button sx={{color: 'white'}} component={link} to="/profile">
								Профиль
							</Button>*/}
						{/*<Button onClick={() => changeMode.toggleColorMode()}>
							qwe123r
						</Button>*/}
							<IconButton onClick={() => changeMode.toggleColorMode()} aria-label="delete">
								<Brightness4Icon/>
							</IconButton>
						</Box>

						<Box sx={{flexGrow: 0}}>
							<NavBarButton onClick={() => user.setAuth(false)}>Выйти</NavBarButton>

						</Box>
					</Toolbar>

				</AppBar>
			</Box>

		</StyledEngineProvider>

	)
}

export default NavBar