import axios from 'axios';
import alerts from "../../store/alerts";
import user from "../../store/user";
import {actions, errorsList} from "./data";

export const API_URL = 'https://dev.kkep.su/api';

const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL
})

$api.interceptors.request.use(
	async (config) => {


		//console.log(config)
		//console.log(new Date(Number(localStorage.getItem('expiry'))))
		//console.log(new Date())
		let refreshRequest = true;

		const originalRequest = config;

		if (new Date(Number(localStorage.getItem('expiry'))) <= new Date()
			&& config.url !== '/auth/refresh'
		) {
			console.log('refresh')

			//originalRequest._isRetry = true;

		/*	try {
				const response = await $api.post(`/auth/refresh`, {
					refreshToken: localStorage.getItem('refreshToken')
				});
				localStorage.setItem('token', response.data.response.accessToken);
				localStorage.setItem('expiry', response.data.response.expiry);
				localStorage.setItem('refreshToken', response.data.response.refreshToken);
				alerts.setIsLoading(false);
				//originalRequest.method = 'get'
				return $api.request(originalRequest);
			} catch (e) {
				console.log('Не авторизован')

				user.logout()

			}*/


			/*
			if (config && !config._isRetry) {
				originalRequest._isRetry = true;
				try {
					const response = await $api.post(`/auth/refresh`, {
						refreshToken: localStorage.getItem('refreshToken')
					});
					localStorage.setItem('token', response.data.response.accessToken);
					localStorage.setItem('expiry', response.data.response.expiry);
					localStorage.setItem('refreshToken', response.data.response.refreshToken);
					alerts.setIsLoading(false);

					return $api.request(originalRequest);
				} catch (e) {
					console.log(e)
					console.log('Не авторизован')
				}
			}
*/


		}

		alerts.setIsLoading(true);
		if (localStorage.getItem('token')) {
			config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
		}


	/*	if (!actions.find(item => item.url === config.url)) {
			return config;
		}*/

		//console.log(config.url)
		const permitCheck = actions.find(item => item.url === config.url);


		console.log(permitCheck)

		if (permitCheck) {
			if (user.permissions.find(item => item === permitCheck.permission)) {
				console.log('aprovved')
				return config;
			} else {
				console.log('declined')
				throw new axios.Cancel('Canceled')
				//return false
			}
		}

		return config;

	}, (error) => {
		return Promise.reject(error)
	}
)

$api.interceptors.response.use(
	(config) => {
		console.log(config.config.url)
		console.log(config)
		alerts.setIsLoading(false);
		return config;
	},
	async (error) => {

		if (error.code == "ERR_CANCELED") {
			alerts.setIsLoading(false);
			alerts.openErrorAlert(`Недостаточно прав`)
			return Promise.reject(error)

		}

		let errorMessage = error;

		console.log(error)

		/*const refreshResponse = RefreshToken(error);

		if (refreshResponse) {
			return refreshResponse
		}*/
		const originalRequest = error.config;


		if (error.response.status == 401 && error.config && !error.config._isRetry) {
			originalRequest._isRetry = true;

			try {
				const response = await $api.post(`/auth/refresh`, {
						refreshToken: localStorage.getItem('refreshToken')
				});
				localStorage.setItem('token', response.data.response.accessToken);
				localStorage.setItem('expiry', response.data.response.expiry);
				localStorage.setItem('refreshToken', response.data.response.refreshToken);
				alerts.setIsLoading(false);

				return $api.request(originalRequest);
			} catch (e) {
				console.log('Не авторизован')

				user.logout()
				window.location.replace('/schedule ')
			}
		}

		if (error.response.status === 400) {
			errorMessage = errorsList.find((item) => {
				return item.url === error.config.url
			})?.status.find(item => item.code === error.response.data.code)?.message
		}
		if (error.config.url === '/auth/login' && (error.response.status === 404 || error.response.status === 400) ) {
			errorMessage = 'Неправильная почта или пароль'
		}
		alerts.setIsLoading(false);

		console.log(errorMessage)

		alerts.openErrorAlert(`Ошибка: ${errorMessage}`)
		throw error;
		//return Promise.reject(error);
	},
)

/*

async function RefreshToken(config) {
	const originalRequest = config.config;

	console.log(config)
	if (config.response.status == 401 && config.config && !config.config._isRetry) {
		originalRequest._isRetry = true;

		try {
			const response = await $api.post(`/auth/refresh`, {
				refreshToken: localStorage.getItem('refreshToken')
			});
			localStorage.setItem('token', response.data.response.accessToken);
			localStorage.setItem('expiry', response.data.response.expiry);
			localStorage.setItem('refreshToken', response.data.response.refreshToken);
			alerts.setIsLoading(false);

			return $api.request(originalRequest);
		} catch (e) {
			console.log(e)
			console.log('Не авторизован')
		}
	}

}
*/


export default $api;
