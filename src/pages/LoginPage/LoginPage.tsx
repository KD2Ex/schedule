import React, {useContext, useState} from 'react';
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import {NavBarButton} from "../../components/UI/NavBarButton/NavBarButton";
import {AuthContext} from "../../context";
import {Link, redirect, useNavigate} from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";

const LoginPage = () => {

	const navigate = useNavigate();


	return (
		<Box sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>

			<Typography variant={'h5'}>
				Авторизация
			</Typography>
			<LoginForm/>

		</Box>

	);
};

export default LoginPage;