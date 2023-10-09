import React, {useEffect, useState} from 'react';
import {Box, Button, FormControl, Grid, OutlinedInput, TextField, Typography} from "@mui/material";
import UUID from "../UUID/UUID";
import {SettingTypography} from "../styled/SettingTypography";
import ProfileButton from "../styled/ProfileButton";
import {SettingsBox} from "../styled/SettingsBox";
import {isEmailValid} from "../../utils/validators";
import UserService from "../../api/services/UserService";
import user from "../../store/user";
import alerts from "../../store/alerts";
import AccountDataField from "../AccountDataField/AccountDataField";
import {observer} from "mobx-react-lite";

const ProfileInfo = () => {


    const [email, setEmail] = useState('');
    const [emailEditing, setEmailEditing] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [nameDisabled, setNameDisabled] = useState(false);

    const isEmailCorrect = isEmailValid(email);

    useEffect(() => {

        setEmail(user.profile?.email)
        setFirstName(user.profile?.firstName)
        setLastName(user.profile?.lastName)
        setPatronymic(user.profile?.patronymic)

        if (!user.permissions.includes('profile.updating.name')) {
            setNameDisabled(true);
        }

    }, [user.profile])

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setEmail(event.target.value);
    }

    const handleEnableEmailEditing = async (e) => {
        e.preventDefault()

        setEmailEditing(prev => !prev);
        if (emailEditing) {
            await UserService.updateEmail(email);
			alerts.openInfoDialog(
				'Подтверждение смены почты',
				'На новую почту придет письмо. Перейдите по ссылке, указанной в нем, чтобы завершить смену почты'
			)
        }
    }

    const handleNameChange = (e) => {
        e.preventDefault()

        alerts.openInfoDialog(
            'Подтверждение ФИО',
            'После подтверждения аккаунта администратором, вы больше не сможете ' +
            'изменить ФИО, поэтому убедитесь что введенные данные корректны',
            user.updateFullname,
            [firstName, lastName, patronymic]
        )

    }

    const handlePasswordChange = async (e) => {

        e.preventDefault()

        if (newPassword === '') {
			alerts.openWarningAlert('Введите новый пароль для смены')
		} else if (oldPassword === newPassword) {
			alerts.openErrorAlert('Пароли совпадают')
		} else {
			try {
				await UserService.updatePassword(oldPassword, newPassword).then(response => {


					alerts.openSuccessAlert("Пароль успешно сменен")
					setOldPassword('');
					setNewPassword('');

				}).catch(error => {
					console.log(error.response.data.code)
					const code = error.response.data.code;
					switch (code) {
						case 1: {
							alerts.openWarningAlert("Введите старый пароль")
							break;
						}
						case 2: {
							alerts.openWarningAlert("Введите новый пароль")
							break;
						}
						case 3: {
							alerts.openErrorAlert("Действующий пароль не совпадает с введенным")
							break;
						}case 4: {
							alerts.openErrorAlert("Пароли совпадают")
							break;
						}
					}
				}).finally(() => {
				});

			}
			catch (e) {
				console.log(e.message)
			}
		}
    }

    return (
        <SettingsBox
		>
            <Grid
                container
                sx={{
                    display: 'flex',
					mb: 2
                }}
            >
                <UUID/>
            </Grid>
           {/* <Typography sx={{
                fontWeight: 400, fontSize: 22, marginBottom :2}}>

                Персональные данные

            </Typography>*/}
            <Grid
                container
                spacing={2}
                component={'form'}
                onSubmit={handleNameChange}
            >

                <AccountDataField
                    title={'Фамилия'}
                    placeholder={'Введите фамилию'}
                    value={lastName}
                    setValue={setLastName}
                    disabled={nameDisabled}
                />

                <AccountDataField
                    title={'Имя'}
                    placeholder={'Введите имя'}
                    value={firstName}
                    setValue={setFirstName}
                    disabled={nameDisabled}
                />

                <AccountDataField
                    title={'Отчество'}
                    placeholder={'Введите отчество'}
                    value={patronymic}
                    setValue={setPatronymic}
                    disabled={nameDisabled}
                />

                <Grid item xs={12} sx={{display: 'flex', justifyContent: 'flex-end'}}>

                    <ProfileButton
                        type={'submit'}
                        disabled={nameDisabled}
                        //onClick={handleNameChange}
                    >
                        Сохранить ФИО
                    </ProfileButton>

                </Grid>

            </Grid>


               {/* <Grid item xs={12} md={2}>
                    <SettingTypography>
                        Электронная почта
                    </SettingTypography>
                </Grid>*/}
            <Grid
                container
                spacing={2}
                sx={{
                    mt: 0
                }}
                component={'form'}
            >

                <Grid item xs={12}>
                    <TextField
                        sx={{width: '100%'}}
                        size={"small"}
                        placeholder={'E-mail'}
                        value={email}
                        label={'Email'}
                        onChange={handleEmailChange}
                        error={!isEmailCorrect}
                        disabled={!emailEditing}
                        InputProps={{



                        }}
                    />

                </Grid>

				<Grid
					item
					xs={12}
					sx={{
						display: 'flex',
						justifyContent: 'flex-end'
					}}
				>
					<Button
						variant={'outlined'}
						onClick={handleEnableEmailEditing}
					>
						Изменить
					</Button>
				</Grid>

            </Grid>

            <Grid
                container
                spacing={2}
                sx={{
                    mt: 0,
                }}
                component={'form'}
                onSubmit={handlePasswordChange}
            >


                {
                    user.profile?.containPassword ? <>

                        <AccountDataField
                            title={'Текущий пароль'}
                            placeholder={'Введите пароль'}
                            value={oldPassword}
                            setValue={setOldPassword} />

                        <AccountDataField
                            title={'Новый пароль'}
                            placeholder={'Введите пароль'}
                            value={newPassword}
                            setValue={setNewPassword} />
                    </>
                    :  <AccountDataField
                            title={'Создайте пароль'}
                            placeholder={'Введите пароль'}
                            value={newPassword}
                            setValue={setNewPassword} />
                }



                <Grid item xs={12} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <ProfileButton
                        type={'submit'}
                        //onClick={handlePasswordChange}
                    >
                        Сменить пароль
                    </ProfileButton>
                </Grid>
            </Grid>
        </SettingsBox>
    );
};

export default observer(ProfileInfo);