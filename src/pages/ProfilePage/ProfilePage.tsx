import React, {useEffect, useState} from 'react'
import './ProfilePage.css'
import {
	Box,
	Grid,
	Typography,
	useTheme
} from "@mui/material";
import {AutocompleteOption} from "../../models/interfaces/IAutocompleteOption";
import {SCHEDULE_ENTITY} from "../../models/enums/SCHEDULE_ENTITY";
import {SettingsBox} from "../../components/styled/SettingsBox";
import user from "../../store/user";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {ScheduleEntityType} from "../../models/enums/ScheduleEntityType";
import {observer} from "mobx-react-lite";
import {setLoadedOption} from "../../utils/setLoadedOption";
import {IScheduleEntity} from "../../models/interfaces/IScheduleEntity";
import LinkedAccountList from "../../components/LInkedAccoutList/LinkedAccountList";
import ScheduleMailing from "../ScheduleMailing/ScheduleMailing";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";

export const loader = async () => {

	await user.fetchProfile().catch((reason) => console.log(reason));
	return null
}


const ProfilePage = observer(() =>  {

	const [filterType, setFilterType] = useState<IScheduleEntity>({title: SCHEDULE_ENTITY.GROUP, value: ScheduleEntityType.GROUP});
	const [filterValue, setFilterValue] = useState<AutocompleteOption | null>(null);
	const navigate = useNavigate();
	const theme = useTheme();

	useEffect(() => {

		if (localStorage.getItem('token')) {
			user.checkAuth()
		} else {
			user.setPretendingToAuth(true);
			navigate("/login")
		}

		(async () => {
				await user.fetchProfile();
				console.log(user.profile)
				if (user.profile.linkedSchedule.contain) {
					const newFilterType = user.profile.linkedSchedule.linkedEntityType;
					setFilterType({value: newFilterType, title: SCHEDULE_ENTITY[newFilterType]})
					setFilterValue(await setLoadedOption(user.profile.linkedSchedule.linkedEntityType,
						user.profile.linkedSchedule.linkedEntityId))
				}
			}
		)()


		VK.Widgets.AllowMessagesFromCommunity("vk_allow_messages_from_community", {}, 220122071);

	}, [])


	useEffect(() => {

		if (filterValue !== null) {

		}

	}, [filterValue])




/*	const isMobile = useMediaQuery(theme.breakpoints.down( 'sm'))
	const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))

	console.log(isMobile)*/

	const tabs = [
		{title: 'Настройки', url: '/profile'},
	]
	const location = useLocation();
	console.log(location)

  return (
  	<>
		<Box sx={{
			display: 'flex',
			flexWrap: 'wrap',

			gap: 2,
			'& a': {
				marginBottom: 2,
				'&:hover': {
					fontSize: 44,
				},
				transition: '200ms',
				width: 'fit-content',
				fontWeight: 'bold',
				color: theme.palette.primary.main
			}
		}}>
			{tabs.map((item) => (
				<Typography
					sx={{
						textDecoration: 'none',
						fontSize: location.pathname === item.url ? 44 : 34
					}}
					component={Link}
					to={item.url}
					variant={'h4'}
				>
					{item.title}
				</Typography>
			))}

		</Box>

		<Grid container spacing={2}>

			<Grid item xs={12} lg={6} sx={{'h4': {marginBottom: 1}}}>





				<Typography variant={'h4'}>
					Аккаунт

				</Typography>

				<ProfileInfo/>


			</Grid>


			<Grid item xs={12} lg>
				{/*<UserPermission/>*/}
				<Typography variant={'h4'}>
					Расписание
				</Typography>
				<SettingsBox>

					<Grid container spacing={2}>

						<ScheduleMailing/>

					</Grid>

				</SettingsBox>
				<LinkedAccountList/>

			</Grid>

		</Grid>
	</>
  )
})

export default ProfilePage;