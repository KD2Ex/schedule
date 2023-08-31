import React, {FC} from 'react';
import {Box, Button, Grid, Typography} from "@mui/material";
import ProfileButton from "../styled/ProfileButton";
import {SocialType} from "../../models/types/SocialType";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import styles from '../LinkedAccount/LinkedAccount.module.css'
import AuthService from "../../api/services/AuthService";
import user from "../../store/user";
import {GITHUB_AUTH_URL, GOOGLE_AUTH_URL, REDIRECT_URL, VK_AUTH_URL, VK_LINK_URL} from "../../api/http/urls";
import {API_URL} from "../../api/http";

interface LinkedAccountProps {
	type: SocialType,
	isLinked: boolean,
}

const LinkedAccount: FC<LinkedAccountProps> = ({isLinked, type}) => {



	/*return (
		<Box className={styles.flex}>
			<Box sx={{minWidth: '100px', width: {xs: '100%', md: '120px'}}}>
				<Typography>
					{type}
				</Typography>
			</Box>
			<Box className={styles.flex} sx={{flexGrow: 1, gap: 1}}>
				{ isLinked
					? <>
						<CheckCircleIcon sx={{color: theme => theme.palette.secondary.linked}}/>
						<Typography sx={{fontSize: 14}}>
							Учетная запись привязана
						</Typography>
					</>
					: <>
						<CancelIcon sx={{color: theme => theme.palette.secondary.nonLinked}}/>
						<Typography>
							Учетная запись не привязана
						</Typography>
					</>
				}
			</Box>
			<Box sx={{flexGrow: 0}}>
				{isLinked
					?
					<ProfileButton sx={{width: '100px'}}>
						Отключить
					</ProfileButton>
					:
					<ProfileButton sx={{width: '100px'}}>
						Подключить
					</ProfileButton>
				}
			</Box>
		</Box>
	)*/


	const handleClick = async () => {

		// let url = '';
		//
		// switch (type) {
		// 	case "VK": {
		// 		url = VK_AUTH_URL;
		// 		break;
		// 	}
		// 	case "GITHUB": {
		// 		url = GITHUB_AUTH_URL;
		// 		break;
		// 	}
		// 	case "GOOGLE": {
		// 		url = GOOGLE_AUTH_URL;
		// 		break;
		// 	}
		// 	case "TELEGRAM": {
		// 		url = VK_AUTH_URL;
		// 		break;
		// 	}
		// }
		//await user.loginWithServices(`${url}&link=1`);


		await user.loginWithServices(
			API_URL + `/oauth2/authorize/${type.toLowerCase()}?redirect_uri=${REDIRECT_URL}&link=1&token_bearer=${localStorage.getItem('token')}`
		);

	}

	return (
		<Grid container sx={{alignItems: 'center'}} spacing={2}>
			<Grid item xs={12} sm={2} lg={3} xl={3}>
				<Typography>
					{type}
				</Typography>
			</Grid>

			<Grid item xs={12} sm={7} lg={8} xl={6} sx={{display: 'flex', gap: 1}}>
				{ isLinked
					? <>
						<CheckCircleIcon sx={{color: theme => theme.palette.secondary.success}}/>
						<Typography>
							Аккаунт привязан
						</Typography>
					</>
					: <>
						<CancelIcon sx={{color: theme => theme.palette.secondary.error}}/>
						<Typography>
							Аккаунт не привязан
						</Typography>
					</>
				}
			</Grid>
			<Grid item sx={{flexGrow: 0}} xs={12} sm={3} lg={12} xl={3}>
				{isLinked
					?
					<ProfileButton sx={{width: '100%'}}>
						Отключить
					</ProfileButton>
					:
					<ProfileButton
						sx={{width: '100%'}}
						onClick={handleClick}
					>
						Подключить
					</ProfileButton>
				}
			</Grid>

		</Grid>

	);
};

export default LinkedAccount;