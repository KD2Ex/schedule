import React from 'react';
import {Box, Typography, useTheme} from "@mui/material";
import kkeplogo from "../../styles/logos/kkep.svg";
import kkeplogoWhite from "../../styles/logos/kkep_white.svg";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignupForm from "../../components/SignupForm/SignupForm";

const SignupPage = () => {
    const theme = useTheme()

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <img
                    src={theme.palette.mode === 'light' ? kkeplogo : kkeplogoWhite} style={{width: '160px', margin: 16}}/>
                <Typography
                    variant={'h5'}
                    sx={{
                        mb:2,
                        fontWeight: 'light'
                    }}
                    fontWeight={600}>
                    Вход в портал ККЭП
                </Typography>


               <SignupForm/>


            </Box>
        </>
    );
};

export default SignupPage;