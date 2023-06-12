import React, {useEffect, useState} from 'react'
import styles from './ProfilePage.module.css'
import './ProfilePage.css'
import {
	Alert,
	Autocomplete, Box,
	Button, Divider,
	Grid,
	OutlinedInput,
	Snackbar,
	TextField,
	Typography,
	useTheme
} from "@mui/material";
import ProfileButton from "../../components/styled/ProfileButton";
import {AutocompleteOption} from "../../models/interfaces/IAutocompleteOption";
import {useFilterOptions} from "../../hooks/useFilterOptions";
import {SCHEDULE_ENTITY} from "../../models/enums/SCHEDULE_ENTITY";
import TypeButtons from "../../components/TypeButtons";
import {SettingsBox} from "../../components/styled/SettingsBox";
import {isEmailValid} from "../../utils/validators";
import {SettingTypography} from "../../components/styled/SettingTypography";
import UserService from "../../api/services/UserService";
import {scheduleTypeConvert} from "../../utils/converters";
import user from "../../store/user";
import {useNavigate} from "react-router-dom";
import LinkedAccount from "../../components/LinkedAccount/LinkedAccount";
import {ISocial} from "../../models/interfaces/ISocial";
import {ScheduleEntityType} from "../../models/enums/ScheduleEntityType";
import {observer} from "mobx-react-lite";
import {setLoadedOption} from "../../utils/setLoadedOption";
import {ProfileResponse} from "../../models/response/ProfileResponse";
import {AlertType} from "../../models/types/AlertType";
import {IScheduleEntity} from "../../models/interfaces/IScheduleEntity";

const ProfilePage = observer(() =>  {

	const [isMailingActive, setIsMailingActive] = useState(false);
	const [isAccountLinked, setIsAccountLinked] = useState(false);
	const [openList, setOpenList] = useState(false);
	const [openAlerts, setOpenAlerts] = useState(false);
	const [filterOptions, setFilterOptions] = useState<AutocompleteOption[]>([]);
	const [filterType, setFilterType] = useState<IScheduleEntity>({title: SCHEDULE_ENTITY.GROUP, value: ScheduleEntityType.GROUP});
	const [filterValue, setFilterValue] = useState<AutocompleteOption | null>(null);
	const [email, setEmail] = useState('');
	const [profile, setProfile] = useState<ProfileResponse>({});
	const [linkedAccounts, setLinkedAccounts] = useState<ISocial[]>([]);
	const [emailEditing, setEmailEditing] = useState(false);
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [alertStatus, setAlertStatus] = useState<AlertType>('success');
	const [alertMessage, setAlertMessage] = useState('Успешно!');
	const [uuid, setUuid] = useState('');
	const isEmailCorrect = isEmailValid(email);

	const loading = openList && filterOptions?.length === 0;


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
				const profile = await UserService.getProfileInfo();
				const user = await UserService.getUserInfo();
				setProfile(profile);
				console.log(profile.mail)
				setEmail(profile.mail)
				if (profile.linkedSchedule.contain) {
					const newFilterType = profile.linkedSchedule.linkedEntityType;
					setFilterType({value: newFilterType, title: SCHEDULE_ENTITY[newFilterType]})
					setFilterValue(await setLoadedOption(profile.linkedSchedule.linkedEntityType, profile.linkedSchedule.linkedEntityId))
				}
				setLinkedAccounts(profile.linkedSocial);
			}
		)()

		window._vkWidget = window._vkWidget || {};
		window._vkWidget.key = 'uniqueVkWidget';
		window._vkWidget.language = 'ru';
		const s = document.createElement('script');
		s.type = 'text/javascript';
		s.async = true;
		s.src = 'https://vk.com/js/api/openapi.js?168';
		const t = document.getElementsByTagName('script')[0];
		t.parentNode.insertBefore(s, t);
	}, [])

	useEffect(() => {

		if (!loading) {
			return undefined;
		}

		useFilterOptions(filterType.title, setFilterOptions)

	}, [loading])

	useEffect(() => {
		if (!openList) {
			setFilterOptions([]);
		}

	}, [openList])

	useEffect(() => {

		if (filterValue !== null) {

		}

	}, [filterValue])

	const handleOldPasswordChange = (event) => {
		setOldPassword(event.target.value)
	}

	const handleNewPasswordChange = (event) => {
		setNewPassword(event.target.value)
	}

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

	const handleVerifyUser = () => {

	}

	const handleUuidChange = (e) => {
		setUuid(e.target.value);
	}

	const handleLinkSchedule = async () => {
		await UserService.setLinkedSchedule(ScheduleEntityType.TEACHER, -1);
		if (filterValue !== null) {
			await UserService.setLinkedSchedule(filterType.value, filterValue?.id);
		} else {
			//await UserService.setLinkedSchedule(ScheduleEntityType.TEACHER, -1);
		}
		setAlertMessage('Настройки профиля обновлены');
		setAlertStatus("success")
		setOpenAlerts(true);
	}

	const handleClearLinkedSchedule = () => {
		setFilterValue(null);
	}

	const handleEnableEmailEditing = async () => {
		setEmailEditing(prev => !prev);
		if (emailEditing) {
			await UserService.updateEmail(email);
		}
	}

	const handlePasswordChange = async () => {
		if (oldPassword !== '' && newPassword !== '') {
			try {
				await UserService.updatePassword(oldPassword, newPassword).then(response => {

					setAlertStatus("success")
					setAlertMessage("Пароль успешно сменен")
					setOldPassword('');
					setNewPassword('');

				}).catch(error => {
					console.log(error.response.data.code)
					const code = error.response.data.code;
					switch (code) {
						case 1: {
							setAlertStatus("warning");
							setAlertMessage("Введите старый пароль")
							break;
						}
						case 2: {
							setAlertStatus("warning");
							setAlertMessage("Введите новый пароль")
							break;
						}
						case 3: {
							setAlertStatus("error");
							setAlertMessage("Действующий пароль не совпадает с введенным")
							break;
						}case 4: {
							setAlertStatus("warning");
							setAlertMessage("Пароли совпадают")
							break;
						}
					}
				}).finally(() => {
					setOpenAlerts(true)
				});

			}
			catch (e) {
				console.log(e.message)
			}
		}
	}




  return (
  	<>
		<Typography sx={{marginBottom: 2}} variant={'h3'} fontWeight={700}>
			Настройки
		</Typography>

		<Grid container spacing={2}>

			<Grid item xs={12} lg={8} sx={{'h4': {marginBottom: 1}}}>
{/*
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

				</SettingsBox>*/}



				<Typography variant={'h4'}>
					Расписание
				</Typography>

				<SettingsBox>


					<Grid container spacing={2}>

						<Grid item container  md={6} lg={8} xl={6} xs={12} spacing={2}>

							<Grid item xs={12}>
								<Typography sx={{
									fontSize: 18,
								}}>
									Выберите, какое расписание вы хотите получать:
								</Typography>
							</Grid>


							<Grid item xs={12} md={4}>

								<SettingTypography>
									Тип расписания
								</SettingTypography>

							</Grid>
							<Grid item xs={12} md={8} sx={{justifyContent:'flex-start', display: 'flex'}}>
								<TypeButtons
									filterType={filterType}
									setFilterType={setFilterType}
									setFilterValue={setFilterValue}
									exclusive
									size='small'

								/>
							</Grid>


							<Grid item xs={12} md={4}>

								<SettingTypography>
									Сущность
								</SettingTypography>

							</Grid>
							<Grid item xs={12} md={8} sx={{
								display: 'flex',
								justifyContent: 'flex-start'
							}}>

								<Autocomplete
									value={filterValue}
									size='small'
									open={openList}
									sx={{
										width: {xs: 295, sm: 315},

									}}
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
										label={` ${filterType.title}`}
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

						<Grid item>
							<Divider sx={{
								width: '100%',
								height: '100%',
							}} orientation={'vertical'}
							/>
						</Grid>


						<Grid item container xs={12} md={5} lg={3} spacing={2}>


							<Grid item >
								<Typography sx={{
									fontSize: 18,
								}}>
									Рассылка
								</Typography>
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

						<Grid item xs={12} sx={{gap: 2, display: 'flex', justifyContent: 'flex-end'}}>
							<Button
								variant={'contained'}
								sx={{width: '180px', bgcolor: theme.palette.secondary.main, color: 'white',
									border:`1px solid ${theme.palette.primary.pale}`,
									'&:hover': {bgcolor: theme.palette.secondary.hover}
								}}

								onClick={handleLinkSchedule}

							>
								Сохранить
							</Button>
							<Button
								variant={'outlined'}
								sx={{width: '100px'}}
								onClick={handleClearLinkedSchedule}
							>
								Очистить
							</Button>
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
								disabled={!emailEditing}
								endAdornment={
									<Button onClick={handleEnableEmailEditing}>
										Изменить
									</Button>
								}
							>

							</OutlinedInput>
						</Grid>
						<Grid item xs={12} md={2}>
							<SettingTypography>
								Старый пароль
							</SettingTypography>
						</Grid>
						<Grid item xs={12} md={10}>
							<OutlinedInput
								sx={{width: '100%'}}
								size={"small"}
								placeholder={'Введите пароль'}
								value={oldPassword}
								onChange={handleOldPasswordChange}
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
								value={newPassword}
								onChange={handleNewPasswordChange}
							>
							</OutlinedInput>
						</Grid>


						<Grid item xs={12} sx={{display: 'flex', justifyContent: 'flex-end'}}>
							<ProfileButton
								onClick={handlePasswordChange}
							>
								Сменить пароль
							</ProfileButton>
						</Grid>

					</Grid>
				</SettingsBox>
			</Grid>


			<Grid item xs={12} lg={4}>
				<Typography variant={"h4"} sx={{marginBottom: 1}}>
					Подтверждение
				</Typography>
				<SettingsBox sx={{
					display: 'flex',
					gap: 2
				}}>
					<TextField
						variant={'outlined'}
						sx={{width: '100%'}}
						size={"small"}
						placeholder={'Введите UUID'}
						value={uuid}
						onChange={handleUuidChange}
					/>
					<ProfileButton
						onClick={handleVerifyUser}
					>
						Подтвердить
					</ProfileButton>
				</SettingsBox>

				<Typography variant={"h4"} sx={{marginBottom: 1}}>
					Привязанные аккаунты
				</Typography>

				<SettingsBox>
					<Grid container spacing={3}>
						{linkedAccounts.map((account, index) => (
							<Grid item xs={12} key={index}>
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
					severity={alertStatus}
					sx={{ width: '100%' }}
				>
					{alertMessage}
				</Alert>
			</Snackbar>
		</Grid>
	</>
  )
})

export default ProfilePage;