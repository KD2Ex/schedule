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
		alerts.setIsLoading(true);
		if (localStorage.getItem('token')) {
			config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
		}
		alerts.setIsLoading(false);
		return config;

	}
)

$api.interceptors.response.use(
	(config) => {
		schedule.removeError();
		console.log(config)
		return config;
	},
	async (error) => {

		let errorMessage = error;

		console.log(error)
		const originalRequest = error.config;
		originalRequest._isRetry = true;
		if (error.response.status == 401 && error.config && !error.config._isRetry) {
			try {
				const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true});
				localStorage.setItem('token', response.data.response.accessToken);
				return $api.request(originalRequest);
			} catch (e) {
				console.log('Не авторизован')
			}
		}

		if (error.config.url === '/auth/login') {
			errorMessage = 'Неправильная почта или пароль'
		}

		schedule.setError(error);
		alerts.openErrorAlert(`Ошибка: ${errorMessage}`)
		throw error;
		//return Promise.reject(error);
	}
)


export default $api;
