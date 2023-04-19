import React, {useContext, useState} from 'react';
import {Box, Button, Container, TextField, Typography, useTheme} from "@mui/material";
import {NavBarButton} from "../../components/UI/NavBarButton/NavBarButton";
import {AuthContext} from "../../context";
import {Link, redirect, useNavigate} from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import kkeplogo from "../../styles/logos/kkep.svg";
import kkeplogoWhite from "../../styles/logos/kkep_white.svg";

const LoginPage = () => {

	const navigate = useNavigate();

	const theme = useTheme();

	return (
		<Box sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
			<img src={theme.palette.mode === 'light' ? kkeplogo : kkeplogoWhite} style={{width: '160px', margin: 16}}/>

			<Typography variant={'h5'}  sx={{mb:2, fontWeight: 'light'}} fontWeight={600}>
				Вход в портал ККЭП
			</Typography>

			<LoginForm/>

		</Box>

	);
};

export default LoginPage;