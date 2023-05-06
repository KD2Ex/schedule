import React, {FC} from 'react';
import {Box, Button, Grid, Typography} from "@mui/material";
import ProfileButton from "../styled/ProfileButton";
import {SocialType} from "../../models/types/SocialType";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import styles from '../LinkedAccount/LinkedAccount.module.css'

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
						<CheckCircleIcon sx={{color: theme => theme.palette.secondary.linked}}/>
						<Typography>
							Аккаунт привязан
						</Typography>
					</>
					: <>
						<CancelIcon sx={{color: theme => theme.palette.secondary.nonLinked}}/>
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
					<Button sx={{width: '100%'}} variant={'outlined'}>
						Подключить
					</Button>
				}
			</Grid>

		</Grid>

	);
};

export default LinkedAccount;