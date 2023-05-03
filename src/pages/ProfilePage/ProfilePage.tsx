import React, {useEffect, useState} from 'react'
import styles from './ProfilePage.module.css'
import './ProfilePage.css'
import {Alert, Autocomplete, Box, Grid, OutlinedInput, Snackbar, TextField, Typography, useTheme} from "@mui/material";
import ProfileButton from "../../components/styled/ProfileButton";
import {AutocompleteOption} from "../../models/IAutocompleteOption";
import {useFilterOptions} from "../../hooks/useFilterOptions";
import {FILTER_TYPES} from "../../models/enums/FilterType";
import TypeButtons from "../../components/TypeButtons";
import {SettingsBox} from "../../components/styled/SettingsBox";
import {isEmailValid} from "../../utils/validators";
import {SettingTypography} from "../../components/styled/SettingTypography";

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


	const handleAlertClose = () => {
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

  return (
    <div className={styles.wrapper}>

        <Box>
            <Typography sx={{marginBottom: 2}} variant={'h3'} fontWeight={700}>
                Настройки
            </Typography>

            <Typography variant={'h5'}  fontWeight={400}>
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

		</Box>


		<Typography variant={'h5'}>
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
						sx={{width: {xs: 240, md: 315}}}
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

		<Typography variant={'h5'}>
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
						error={isEmailCorrect}
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


		<Snackbar
			open={openAlerts}
			autoHideDuration={3000}
			onClose={handleAlertClose}
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

    </div>
  )
}

export default ProfilePage;