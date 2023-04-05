import React, {FC, useState} from 'react';
import styles from "../../pages/LoginPage/LoginPage.module.css";
import {Box, Button, Divider, IconButton, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";
import user from '../../store/user';
import vklogo from '../../styles/logos/VK_Compact_Logo.png'
import {VK_AUTH_URL} from "../../api/http/urls";

const LoginForm: FC = observer(() => {

	const [username, setUsername] = useState<string>('123');
	const [password, setPassword] = useState<string>('');


	const handleLogin = () => {
		user.login(username, password);
	}

	return (
		<Box className={styles.loginBox}  >

			<TextField placeholder={'Имя пользователя'} value={username} onChange={(e) => setUsername(e.target.value)} size={'small'} variant="outlined" >

			</TextField>
			<TextField type={'password'} placeholder={'Пароль'} value={password} onChange={(e) => setPassword(e.target.value)} size={'small'} variant="outlined" >

			</TextField>

			<Button onClick={handleLogin} size={'small'} variant={'outlined'} >
				Войти
			</Button>


			<Divider sx={{width: '100%'}} variant={'middle'}>ИЛИ</Divider>
			<Typography>
				Авторизуйтесь через
			</Typography>
			<Box>
				<IconButton onClick={() => user.loginWithServices(VK_AUTH_URL)}>
					<img src={vklogo} style={{width: '32px', height: '32px', margin: 0}}/>
				</IconButton>
			</Box>

		</Box>
	);
});

export default LoginForm;