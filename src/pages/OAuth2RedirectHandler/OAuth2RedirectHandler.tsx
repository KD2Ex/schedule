import React, {useEffect} from 'react';
import {useLocation, useNavigate, Navigate} from 'react-router-dom';

import user from '../../store/user';
import jwtDecode from "jwt-decode";
import UserService from "../../api/services/UserService";
import schedule from "../../store/schedule";

const OAuth2RedirectHandler = () => {

	const location = useLocation();
	const navigation = useNavigate();

	function getUrlParameter(name: string) {
		name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');


		const results = regex.exec(location.search);
		return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	}


	useEffect(() => {
		console.log(window.location.toString().split('=')[1]);
		localStorage.setItem('token',window.location.toString().split('=')[1])
		user.setAuth(true);

	}, [])
/*
	const func = async () => {
		await UserService.getLoggedUser();
	}*/

	return (
		<Navigate to={"/schedule"}/>
	);
};

export default OAuth2RedirectHandler;