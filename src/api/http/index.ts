import axios from 'axios';
import schedule from "../../store/schedule";
import alerts from "../../store/alerts";

export const API_URL = 'https://dev.kkep.su/api';

const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL
})

$api.interceptors.request.use(
	(config) => {


		//console.log(config)
		//console.log(new Date(Number(localStorage.getItem('expiry'))))
		//console.log(new Date())
		if (new Date(Number(localStorage.getItem('expiry'))) <= new Date()) {
			console.log('refresh')
		}

		alerts.setIsLoading(true);
		if (localStorage.getItem('token')) {
			config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
		}


		return config;

	}, (error) => {
	}
)

$api.interceptors.response.use(
	(config) => {
		console.log(config)
		alerts.setIsLoading(false);
		return config;
	},
	async (error) => {

		let errorMessage = error;

		console.log(error)
		const originalRequest = error.config;


		if (error.response.status == 401 && error.config && !error.config._isRetry) {
			originalRequest._isRetry = true;

			try {
				const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true});
				localStorage.setItem('token', response.data.response.accessToken);
				alerts.setIsLoading(false);

				return $api.request(originalRequest);
			} catch (e) {
				console.log('Не авторизован')
			}
		}

		if (error.config.url === '/auth/login' && error.response.status === 400) {
			errorMessage = 'Неправильная почта или пароль'
		}
		alerts.setIsLoading(false);

		alerts.openErrorAlert(`Ошибка: ${errorMessage}`)
		throw error;
		//return Promise.reject(error);
	},
)


export default $api;
