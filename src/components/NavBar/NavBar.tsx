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
import {Link as link, useNavigate} from 'react-router-dom';
import styles from './NavBar.module.css';
import {AuthContext, ColorModeContext} from "../../context";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import {NavBarButton} from "../UI/NavBarButton/NavBarButton";
import user from '../../store/user'




function NavBar() {

	const changeMode = useContext(ColorModeContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		user.logout()
		//navigate('/login')
	}

	return (
			<Box sx={{flexGrow: 1}}>
				<AppBar position='static' sx={{}} className={styles.appBar}>
					<Toolbar disableGutters>
						<Box sx={{flexGrow: 1}}>

							<NavBarButton component={link} to="/schedule" >
								Расписание
							</NavBarButton>
							{/*<Button sx={{color: 'white'}} component={link} to="/edit" >
								Списки
							</Button>*/}



						</Box>

						<Box sx={{flexGrow: 0}}>

							<IconButton onClick={() => changeMode.toggleColorMode()} aria-label="delete">
								<Brightness4Icon sx={{color:'white'}}/>
							</IconButton>
							<Button sx={{color: 'white'}} component={link} to="/profile">
								Профиль
							</Button>
							<NavBarButton onClick={handleLogout}>
								Выйти
							</NavBarButton>

						</Box>
					</Toolbar>

				</AppBar>
			</Box>


	)
}

export default NavBar