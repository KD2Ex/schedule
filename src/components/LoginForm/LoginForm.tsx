import React, {FC, useState} from 'react';
import styles from "../../pages/LoginPage/LoginPage.module.css";
import {Box, Button, Divider, IconButton, TextField, Typography} from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google'
import GitHubIcon from '@mui/icons-material/GitHub';
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";
import user from '../../store/user';
import vklogo from '../../styles/logos/VK_Compact_Logo.png'
import gllogo from '../../styles/logos/google.png'
import kkeplogo from '../../styles/logos/kkep.svg'
import {GITHUB_AUTH_URL, GOOGLE_AUTH_URL, VK_AUTH_URL} from "../../api/http/urls";

const LoginForm: FC = observer(() => {

	const [username, setUsername] = useState<string>('123');
	const [password, setPassword] = useState<string>('');


	const handleLogin = () => {
		user.login(username, password);
	}

	return (

			<Box className={styles.loginBox} sx={{borderColor: (theme) => theme.palette.primary.pale}}>


				<TextField
					placeholder={'Имя пользователя'}
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					size={'small'}
					sx={{width: '100%'}}
					variant="outlined"
				>

				</TextField>
				<TextField
					type={'password'}
					sx={{width: '100%'}}
					placeholder={'Пароль'} value={password} onChange={(e) => setPassword(e.target.value)} size={'small'} variant="outlined" >

				</TextField>

				<Button onClick={handleLogin} size={'small'} variant={'contained'} sx={{width: '100%'}}>
					Войти
				</Button>


				<Divider sx={{width: '100%'}} variant={'middle'}>ИЛИ</Divider>
				<Typography>
					Авторизуйтесь через
				</Typography>
				<Box sx={{m: 0}}>
					<IconButton onClick={() => user.loginWithServices(VK_AUTH_URL)}>
						<img src={vklogo} style={{width: '32px', height: '32px', margin: 0}}/>
					</IconButton>
					<IconButton onClick={() => user.loginWithServices(GOOGLE_AUTH_URL)}>
						{/*<GoogleIcon sx={{width: '32px', height: '32px', margin: 0}}/>*/}
						<img src={gllogo} style={{width: '32px', height: '32px', margin: 0}}/>
					</IconButton>
					<IconButton onClick={() => user.loginWithServices(GITHUB_AUTH_URL)}>
						<GitHubIcon sx={{width: '32px', height: '32px', margin: 0, color: (theme) => theme.palette.mode === 'light'
								? 'black'
								: 'white'
						}}/>
					</IconButton>
				</Box>

			</Box>

	);
});

export default LoginForm;