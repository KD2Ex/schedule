import React, {FC, useState} from 'react';
import styles from "../../pages/LoginPage/LoginPage.module.css";
import {useNavigation, useNavigate} from 'react-router-dom'
import {
	Box,
	Button,
	Divider,
	FormControl,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
	useTheme
} from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google'
import GitHubIcon from '@mui/icons-material/GitHub';
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";
import user from '../../store/user';
import vklogo from '../../styles/logos/VK_Compact_Logo.png'
import tgLogo from '../../styles/logos/tgIcon.png'
import gllogo from '../../styles/logos/google.png'
import kkeplogo from '../../styles/logos/kkep.svg'
import {GITHUB_AUTH_URL, GOOGLE_AUTH_URL, REDIRECT_URL, VK_AUTH_URL} from "../../api/http/urls";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import alerts from "../../store/alerts";
import {API_URL} from "../../api/http";

const LoginForm: FC = observer(() => {

	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [showPassword, setShowPassword] = React.useState(false);
	const navigate = useNavigate();



	const handleLogin = async (e) => {

		e.preventDefault()
		const response = await user.login(username, password);

		if (response.result) {
			navigate('/schedule');
			alerts.openInfoAlert('Вы успешно авторизованы')
		} else {
			if (response.code === 403) {
				alerts.openErrorAlert('Неверное имя пользователя или пароль');
			}
		}

	}

	const handleClickShowPassword = () => setShowPassword((show) => !show);


	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const theme = useTheme()

	return (

			<form className={styles.loginBox}
				  onSubmit={handleLogin}
				  style={{borderColor: theme.palette.primary.pale}}
			>


				<TextField
					placeholder={'Email'}
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					size={'small'}
					sx={{
						width: '100%',
					}}
					variant="outlined"

				>

				</TextField>
				<TextField
					type={showPassword ? 'text' : 'password'}
					sx={{
						width: '100%',
					}}
					placeholder={'Пароль'} value={password} onChange={(e) => setPassword(e.target.value)}
					size={'small'}
					variant="outlined"
					InputProps={{endAdornment:
							<InputAdornment position="end" sx={{m: 0}}>
								<IconButton

									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end"
								>
									{showPassword ? <VisibilityOff sx={{m: 0}}/> : <Visibility sx={{m: 0}}/>}
								</IconButton>
							</InputAdornment>
					}}
				>

				</TextField>
				<Button
					type={"submit"}
					//onClick={handleLogin}
					size={'small'}
					variant={'contained'}
					sx={{width: '100%'}}>
					Войти
				</Button>


				<form onSubmit={handleLogin}
					 style={{
						 flexDirection: 'column',
						 gap: 12,
						 alignItems: 'center'
					 }}
				>

				</form>

				<Divider sx={{width: '100%', pt: 1}} variant={'middle'}>ИЛИ</Divider>

				<Box sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>


					<Typography>
						Авторизуйтесь через
					</Typography>
					<Box sx={{m: 0}}>
						<IconButton onClick={() => user.loginWithServices(VK_AUTH_URL)}>
							<img src={vklogo} style={{width: '32px', height: '32px', margin: 0}}/>
						</IconButton>
						<IconButton onClick={() => user.loginWithServices(API_URL + '/auth/telegram/login?redirectUrl=' + REDIRECT_URL)}>
							<img src={tgLogo} style={{width: '32px', height: '32px', margin: 0}}/>
						</IconButton>

						{/*<IconButton onClick={() => user.loginWithServices(GOOGLE_AUTH_URL)}>
							<GoogleIcon sx={{width: '32px', height: '32px', margin: 0}}/>
							<img src={gllogo} style={{width: '32px', height: '32px', margin: 0}}/>
						</IconButton>
						<IconButton onClick={() => user.loginWithServices(GITHUB_AUTH_URL)}>
							<GitHubIcon sx={{width: '32px', height: '32px', margin: 0, color: (theme) => theme.palette.mode === 'light'
									? 'black'
									: 'white'
							}}/>
						</IconButton>*/}
					</Box>
				</Box>

				<Typography>
					Нет аккаунта? {' '}
					<Typography
						component={Link}
						to={'/signup'}
						sx={{
							color: (theme) => theme.palette.text.primary,
							textDecoration: 'none',
							fontWeight: 600
						}}
					>
						Зарегистрируйтесь
					</Typography>
				</Typography>

			</form>

	);
});

export default LoginForm;