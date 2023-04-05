import React from 'react';
import {useLocation, useNavigate, Navigate} from 'react-router-dom';

import user from '../../store/user';
import jwtDecode from "jwt-decode";
import UserService from "../../api/services/UserService";

const OAuth2RedirectHandler = () => {

	const location = useLocation();
	const navigation = useNavigate();

	function getUrlParameter(name: string) {
		name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');


		const results = regex.exec(location.search);
		return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	}

	console.log(location.search.slice(7));

	user.setAuth(true);

	console.log(jwtDecode(location.search.slice(7)))

/*
	const func = async () => {
		await UserService.getLoggedUser();
	}*/


	return (
		<Navigate to={"/schedule"}/>
	);
};

export default OAuth2RedirectHandler;