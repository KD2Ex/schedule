import React, {useEffect, useState} from 'react'
import styles from './ProfilePage.module.css'
import './ProfilePage.css'
import {
	Alert,
	Autocomplete,
	Box,
	Button,
	Grid,
	OutlinedInput,
	Snackbar,
	TextField,
	Typography,
	useTheme
} from "@mui/material";
import ProfileButton from "../../components/styled/ProfileButton";
import {AutocompleteOption} from "../../models/IAutocompleteOption";
import {useFilterOptions} from "../../hooks/useFilterOptions";
import {FILTER_TYPES} from "../../models/enums/FilterType";
import TypeButtons from "../../components/TypeButtons";
import {SettingsBox} from "../../components/styled/SettingsBox";
import {isEmailValid} from "../../utils/validators";
import {SettingTypography} from "../../components/styled/SettingTypography";
import UserService from "../../api/services/UserService";
import {scheduleTypeToFilterValue} from "../../utils/converters";
import user from "../../store/user";
import {useNavigate} from "react-router-dom";
import LinkedAccount from "../../components/LinkedAccount/LinkedAccount";

function ProfilePage() {

	const [isMailingActive, setIsMailingActive] = useState(false);
	const [isAccountLinked, setIsAccountLinked] = useState(false);
	const [openList, setOpenList] = useState(false);
	const [openAlerts, setOpenAlerts] = useState(false);
	const [filterOptions, setFilterOptions] = useState<AutocompleteOption[]>([]);
	const [filterType, setFilterType] = useState<FILTER_TYPES>(FILTER_TYPES.GROUPS);
	const [filterValue, setFilterValue] = useState<AutocompleteOption | null>(null);
	const [email, setEmail] = useState('');
	const isEmailCorrect = isEmailValid(email);
	const loading = openList && filterOptions?.length === 0;

	const navigate = useNavigate();

	useEffect(() => {

		if (localStorage.getItem('token')) {
			user.checkAuth()
		} else {
			user.setPretendingToAuth(true);
			navigate("/login")
		}

		(async () => {
				const user = await UserService.getProfileInfo();
				console.log(user.mail)
				setEmail(user.mail)
				if (user.linkedSchedule.contain) {
					setFilterType(scheduleTypeToFilterValue(user.linkedSchedule.linkedEntityType))
					setFilterValue(user.linkedSchedule.linkedEntityId)
				}
			}
		)()
	}, [])

	useEffect(() => {

		if (!loading) {
			return undefined;
		}

		useFilterOptions(filterType, setFilterOptions)

	}, [loading])

	useEffect(() => {
		if (!openList) {
			setFilterOptions([]);

		}
	}, [openList])

	useEffect(() => {

		if (filterValue !== null) {

		}

		setOpenAlerts(true);

	}, [filterValue])


	const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenAlerts(false);
	}

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {

		setEmail(event.target.value);
	}

	const handleMailingOn = () => {
		setIsMailingActive(true);
	}

	const handleMailingOff = () => {
		setIsMailingActive(false);
	}

	const handleLinkingOn = () => {
		setIsAccountLinked(true);
	}

	const handleLinkingOff = () => {
		setIsAccountLinked(false);
	}

	const linkedAccounts = [
		{type: "VK", contain: false, needMailing: true, enabledMailing: true},
		{type: "GITHUB", contain: true, needMailing: true, enabledMailing: true},
		{type: "TELEGRAM", contain: false, needMailing: true, enabledMailing: true},
		{type: "GOOGLE", contain: true, needMailing: true, enabledMailing: true},
	]

  return (
  	<>
		<Typography sx={{marginBottom: 2}} variant={'h3'} fontWeight={700}>
			Настройки
		</Typography>

		<Grid container spacing={2}>

			<Grid item xs={12} lg={8}>

				<Typography variant={'h4'}  fontWeight={400}>
					Расслыка
				</Typography>

				<SettingsBox>

					<Grid container spacing={2}>

						<Grid item xs={12}>
							<ProfileButton
								onClick={handleLinkingOn}
								sx={{display: isAccountLinked ? 'none' : 'flex'}}
							>
								Привязать аккаунт
							</ProfileButton>
							<ProfileButton
								onClick={handleLinkingOff}
								sx={{display: isAccountLinked ? 'flex' : 'none'}}
							>
								Отвязать аккаунт
							</ProfileButton>
						</Grid>

						<Grid item xs={12}>
							<ProfileButton
								onClick={handleMailingOn}
								sx={{display: isMailingActive ? 'none' : 'flex'}}
							>
								Включить расслыку
							</ProfileButton>
							<ProfileButton
								onClick={handleMailingOff}
								sx={{display: isMailingActive ? 'flex' : 'none'}}
							>
								Отключить расслыку
							</ProfileButton>
						</Grid>

						<Grid item xs={12}>

							<div className={styles.vk_button} id="vk_allow_messages_from_community">

							</div>
						</Grid>

					</Grid>

				</SettingsBox>



				<Typography variant={'h4'}>
					Расписание
				</Typography>

				<SettingsBox>

					<Typography sx={{fontSize: 18, marginBottom: 2}}>
						Выберите, какое расписание вы хотите получать:
					</Typography>

					<Grid container spacing={2}>

						<Grid item xs={12} md={2}>

							<SettingTypography>
								Тип расписания
							</SettingTypography>

						</Grid>
						<Grid item xs={12} md={10}>
							<TypeButtons
								filterType={filterType}
								setFilterType={setFilterType}
								setFilterValue={setFilterValue}
								exclusive
								size='small'

							/>
						</Grid>

						<Grid item xs={12} md={2}>

							<SettingTypography>
								Сущность
							</SettingTypography>

						</Grid>
						<Grid item xs={12} md={10}>


							<Autocomplete
								value={filterValue}
								size='small'
								open={openList}
								sx={{width: {xs: 315}}}
								onOpen={() => {
									setOpenList(true);
								}}
								onClose={() => {
									setOpenList(false);
								}}
								loading={loading}
								options={filterOptions}
								renderInput={(params) => (<TextField
									{...params}
									label={` ${filterType}`}
									InputProps={{
										...params.InputProps,
									}}
								/>)}
								onChange={(event: any, newValue: AutocompleteOption | null) => {
									setFilterValue(newValue);
								}}
							/>
						</Grid>

					</Grid>

				</SettingsBox>

				<Typography variant={'h4'}>
					Аккаунт

				</Typography>

				<SettingsBox>
					<Typography sx={{fontWeight: 200, fontSize: 16, marginBottom :2}}>

						Изменить персональные данные учетной записи

					</Typography>
					<Grid container spacing={2}>

						<Grid item xs={12} md={2}>
							<SettingTypography>
								Электронная почта
							</SettingTypography>
						</Grid>
						<Grid item xs={12} md={10}>
							<OutlinedInput
								sx={{width: '100%'}}
								size={"small"}
								placeholder={'E-mail'}
								value={email}
								onChange={handleEmailChange}
								error={!isEmailCorrect}
							>

							</OutlinedInput>
						</Grid>
						<Grid item xs={12} md={2}>
							<SettingTypography>
								Новый пароль
							</SettingTypography>
						</Grid>
						<Grid item xs={12} md={10}>
							<OutlinedInput
								sx={{width: '100%'}}
								size={"small"}
								placeholder={'Введите пароль'}
							>
							</OutlinedInput>
						</Grid>
					</Grid>
				</SettingsBox>
			</Grid>


			<Grid item xs={12} lg={4}>
				<Typography variant={"h4"}>
					Привязанные аккаунты
				</Typography>

				<SettingsBox>
					<Grid container spacing={3}>
						{linkedAccounts.map((account, index) => (
							<Grid item xs={12}>
								<LinkedAccount
									type={account.type}
									isLinked={account.contain}
								/>
							</Grid>
						))}

					</Grid>
				</SettingsBox>

			</Grid>

			<Snackbar
				open={openAlerts}
				autoHideDuration={3000}
				onClose={handleAlertClose}
				anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
			>
				<Alert
					variant={'filled'}
					onClose={handleAlertClose}
					severity={"success"}
					sx={{ width: '100%' }}
				>
					Настройки расписания сохранены
				</Alert>
			</Snackbar>
		</Grid>
	</>
  )
}

export default ProfilePage;