import React, {useState} from 'react';
import {Box, Button, Divider, TextField, Typography} from "@mui/material";
import ContainedButton from "../styled/ContainedButton";
import {Link, useNavigate} from "react-router-dom";
import user from "../../store/user";
import {isEmailValid} from "../../utils/validators";
import alerts from "../../store/alerts";

const SignupForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const navigate = useNavigate()

    const handleSignup = async () => {

        if (password !== repeatPassword) {
            alerts.openErrorAlert('Пароли не совпдаают')
        } else if (!isEmailValid(email)) {
            alerts.openErrorAlert('Некорректный Email')
        } else {
            console.log('signup')
            try {
                await user.signup(email, password)
                alerts.openSuccessAlert('Вы успешно зарегистрированы')
                navigate('/')
            } catch (e) {
                alerts.openErrorAlert(e.message);
            }

        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid',
                borderRadius: '0.5em',
                padding: 4,
                flexDirection: 'column',
                gap: 2,
                width: '350px',
                borderColor: (theme) => theme.palette.primary.pale
            }}
        >



            <TextField
                size={'small'}
                label={'Email'}
                autoComplete={'off'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                    width: '100%'
                }}
            />
            <TextField
                size={'small'}
                label={'Пароль'}
                autoComplete={'chrome-off'}
                type={'password'}
                id={'field1'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                    width: '100%'
                }}
                inputProps={{
                    autoComplete: 'new-password',
                }}
            />
            <TextField
                size={'small'}
                type={'password'}
                label={'Повторите пароль'}
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                sx={{
                    width: '100%'
                }}
                inputProps={{
                    autoComplete: 'new-password',
                }}
            />

            <Button
                variant={'contained'}
                onClick={handleSignup}
                sx={{
                    width: '100%'
                }}
            >
                Зарегистрироваться
            </Button>

            <Divider
                sx={{
                    width: '100%',
                    mt: 1
                }}
            />

            <Typography>

                Уже зарегистрированы? {' '}
                <Typography
                    component={Link}
                    to={'/login'}
                    sx={{
                        textDecoration: 'none',
                        color: (theme) => theme.palette.text.primary,
                        fontWeight: 600
                    }}
                >
                    Войти

                </Typography>
            </Typography>

        </Box>
    );
};

export default SignupForm;