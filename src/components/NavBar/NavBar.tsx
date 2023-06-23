import React, {useContext} from 'react'
import {
	Button,
	AppBar,
	Toolbar,
	StyledEngineProvider,
	IconButton,
	ButtonProps,
	ButtonBaseProps,
	Box, useTheme
} from '@mui/material'
import {styled} from '@mui/material/styles';
import {Link, Link as link, useNavigate} from 'react-router-dom';
import styles from './NavBar.module.css';
import {AuthContext, ColorModeContext} from "../../context";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import {NavBarButton} from "../UI/NavBarButton/NavBarButton";
import user from '../../store/user'
import kkep_white from '../../styles/logos/kkep_white.svg'
import kkep from '../../styles/logos/kkep.svg'
import {observer} from "mobx-react-lite";



const NavBar = observer(() =>  {

	const changeMode = useContext(ColorModeContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		user.logout()
		navigate('/schedule')
	}

	const handleLogin = () => {
		navigate('/login')
	}


	return (
			<Box sx={{flexGrow: 1}}>

				<AppBar position='sticky' sx={{maxHeight: '90px'}} className={styles.appBar}>

					<Toolbar disableGutters sx={{
						position: 'sticky'
					}} >

						<Link to={'/schedule'}>
							<img
								src={kkep_white}
								alt=""
								style={{
									width: '90px',
									height: '60px',
									flexGrow: 0,
									marginRight: 8,
									color: 'white'
								}}>


							</img>
						</Link>




						<Box sx={{flexGrow: 2, maxHeight: '100%', position: 'sticky'}}>

							<NavBarButton component={link} to="/schedule" sx={{
								display: {xs: 'none', md: 'inline-block'}
							}} >
								Расписание
							</NavBarButton>
				{/*			<Button sx={{color: 'white'}} component={link} to="/edit" >
								Редактирование
							</Button>*/}



						</Box>

						<Box sx={{flexGrow: 0}}>

							<IconButton onClick={() => changeMode.toggleColorMode()} aria-label="delete">
								<Brightness4Icon sx={{color:'white'}}/>
							</IconButton>
							{user.isAuth
								? <><NavBarButton sx={{color: 'white'}} component={link} to="/profile">
									Профиль
								</NavBarButton>
								<NavBarButton onClick={handleLogout}>
									Выйти
								</NavBarButton></>
								: <NavBarButton onClick={handleLogin}>
									Войти
								</NavBarButton>
							}


						</Box>
					</Toolbar>

				</AppBar>
			</Box>


	)
})

export default NavBar