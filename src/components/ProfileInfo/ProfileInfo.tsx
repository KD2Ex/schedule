import React, {useEffect, useState} from 'react';
import {Button, Grid, OutlinedInput, Typography} from "@mui/material";
import UUID from "../UUID/UUID";
import {SettingTypography} from "../styled/SettingTypography";
import ProfileButton from "../styled/ProfileButton";
import {SettingsBox} from "../styled/SettingsBox";
import {isEmailValid} from "../../utils/validators";
import UserService from "../../api/services/UserService";
import user from "../../store/user";
import alerts from "../../store/alerts";
import AccountDataField from "../AccountDataField/AccountDataField";

const ProfileInfo = () => {


    const [email, setEmail] = useState('');
    const [emailEditing, setEmailEditing] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [patronymic, setPatronymic] = useState('');

    const isEmailCorrect = isEmailValid(email);

    useEffect(() => {
        setEmail(user.profile?.email)
    }, [])

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setEmail(event.target.value);
    }

    const handleEnableEmailEditing = async () => {
        setEmailEditing(prev => !prev);
        if (emailEditing) {
            await UserService.updateEmail(email);
        }
    }

    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value)
    }

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value)
    }

    const handleNameChange = () => {

    }

    const handlePasswordChange = async () => {
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
            <Grid container spacing={2}>


                <AccountDataField
                    title={'Фамилия'}
                    placeholder={'Введите фамилию'}
                    value={lastName}
                    setValue={setLastName}
                />

                <AccountDataField
                    title={'Имя'}
                    placeholder={'Введите имя'}
                    value={firstName}
                    setValue={setFirstName}
                />

                <AccountDataField
                    title={'Отчество'}
                    placeholder={'Введите отчество'}
                    value={patronymic}
                    setValue={setPatronymic}
                />

                <Grid item xs={12} sx={{display: 'flex', justifyContent: 'flex-end'}}>

                    <ProfileButton
                        onClick={handleNameChange}
                    >
                        Сохранить ФИО
                    </ProfileButton>

                </Grid>

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

                <AccountDataField
                    title={'Текущий пароль'}
                    placeholder={'Введите пароль'}
                    value={oldPassword}
                    setValue={setOldPassword} />

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
    );
};

export default ProfileInfo;