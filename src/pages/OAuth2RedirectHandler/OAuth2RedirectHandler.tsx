import React, {useEffect} from 'react';
import {useLocation, useNavigate, Navigate, useParams, useSearchParams} from 'react-router-dom';
import user from '../../store/user';
import alerts from "../../store/alerts";

const OAuth2RedirectHandler = () => {

	const location = useLocation();
	const navigation = useNavigate();

	let [searchParams, setSearchParams] = useSearchParams();
	const query = new URLSearchParams(window.location.search);

	//searchParams.forEach((item) => console.log(item))
	console.log(searchParams.get('accessToken'))
	console.log(searchParams.get('expiry'))
	console.log(searchParams.get('refreshToken'))

	function getUrlParameter(name: string) {
		name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');


		const results = regex.exec(location.search);
		return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	}


	console.log(window.location.toString())
	console.log(window.location.toString().split('=')[1]);


	if (searchParams.get('accessToken') != null) {
		localStorage.setItem('token', searchParams.get('accessToken'))
		localStorage.setItem('refreshToken', searchParams.get('refreshToken'))
		localStorage.setItem('expiry', searchParams.get('expiry'))
		user.setAuth(true);

		alerts.openInfoAlert('Вы успешно авторизованы')

		return (
			<Navigate to={"/schedule"}/>
		);
	} else {

		alerts.openErrorAlert('Ошибка авторизации')

		return (
			<Navigate to={'/error'}/>
		)
	}

};

export default OAuth2RedirectHandler;