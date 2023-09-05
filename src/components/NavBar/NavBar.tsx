import React, {useContext, useState} from 'react'
import {
	Button,
	AppBar,
	Toolbar,
	StyledEngineProvider,
	IconButton,
	ButtonProps,
	ButtonBaseProps,
	Box, useTheme, useMediaQuery, Drawer, ListItemButton, List
} from '@mui/material'
import {styled} from '@mui/material/styles';
import {Link, Link as link, useNavigate} from 'react-router-dom';
import styles from './NavBar.module.css';
import {AuthContext, ColorModeContext} from "../../context";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import ListIcon from '@mui/icons-material/List'
import {NavBarButton} from "../UI/NavBarButton/NavBarButton";
import user from '../../store/user'
import kkep_white from '../../styles/logos/kkep_white.svg'
import kkep from '../../styles/logos/kkep.svg'
import {observer} from "mobx-react-lite";
import MenuIcon from '@mui/icons-material/Menu';


const NavBar = observer(() =>  {

	const changeMode = useContext(ColorModeContext);
	const navigate = useNavigate();

	const [open, setOpen] = useState(false);


	const menuList = [
		{
			title: 'Расписание',
			url: '/schedule',
		},
		{
			title: 'Администрирование',
			url: '/edit',
		},

	]

	const isMobile = useMediaQuery('xs');

	const handleLogout = () => {
		user.logout()
		navigate('/schedule')
	}

	const handleLogin = () => {
		navigate('/login')
	}

	const handleClose = () => {
		setOpen(false);
	}

	return (
			<Box sx={{flexGrow: 1}}>

				<AppBar position='sticky'
						sx={{
							maxHeight: '90px',
							zIndex: '1400',
						}}
						className={styles.appBar}>

					<Toolbar disableGutters sx={{
						position: 'sticky',
						display: 'flex',
						width: '100%',
					}} >

						<Box
							sx={{
								flexGrow: {xs: 1, md: 0},
							}}
						>

							<Link to={'/schedule'}
							>
								<img
									src={kkep_white}
									alt=""
									style={{
										width: '90px',
										height: '60px',
										marginRight: 8,
										color: 'white'
									}}>


								</img>
							</Link>
						</Box>




						<Box
							sx={{
								display: {xs: 'none', md: 'flex'},
								justifyContent: 'space-between',
								width: '100%',

							}}
						>

							<Box
								sx={{
									flexGrow: 2,
									maxHeight: '100%',
									position: 'sticky',
									display: {xs: 'none', md: 'flex'}
								}}
							>

								<NavBarButton component={link} to="/schedule" sx={{

								}} >
									Расписание
								</NavBarButton>
								<Button sx={{color: 'white'}} component={link} to="/edit" >
									Администрирование
								</Button>



							</Box>

							<Box sx={{flexGrow: 0}}>

								{user.isAuth
									? <><NavBarButton component={link} to="/profile">
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

						</Box>

						<IconButton onClick={() => changeMode.toggleColorMode()} aria-label="delete">
							<Brightness4Icon sx={{color:'white'}}/>
						</IconButton>
						<Box
							sx={{
								display: {xs: 'flex', md: 'none'},
							}}
						>
							<IconButton
								sx={{
									color: 'white'
								}}
								onClick={() => setOpen(prev => !prev)}
							>
								<MenuIcon

								/>
							</IconButton>

							<Drawer
								open={open}
								anchor={'right'}
								onClose={handleClose}
								sx={{
									flexShrink: 0,
									[`& .MuiDrawer-paper`]:
										{
											boxSizing: 'border-box',
											bgcolor: (theme) => theme.palette.background.default,
										},
								}}
							>
								<Toolbar
									sx={{
										height: '90px',
										p: 0,
										m: 0
									}}/>

								<Box
									role="presentation"
									onClick={() => setOpen(false)}
								>
									<List
										sx={{
											width: '100%'
										}}
									>
										{menuList.map(item => (
											<ListItemButton
												key={item.url}
												component={Link}
												to={item.url}
											>
												{item.title}
											</ListItemButton>
										))}
										{user.isAuth
											? <><ListItemButton component={link} to="/profile">
												Профиль
											</ListItemButton>
												<ListItemButton onClick={handleLogout}>
													Выйти
												</ListItemButton>
											</>
											: <ListItemButton onClick={handleLogin}>
												Войти
											</ListItemButton>
										}
										{/*<ListItemButton
											onClick={(e) => {
												e.preventDefault();
												changeMode.toggleColorMode()
											}}
										>
											Темная тема
										</ListItemButton>*/}
									</List>
								</Box>


							</Drawer>
						</Box>

					</Toolbar>

				</AppBar>
			</Box>


	)
})

export default NavBar