import axios from 'axios';
import schedule from "../../store/schedule";

export const API_URL = 'https://dev.kkep.su/api';

const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL
})

$api.interceptors.request.use(
	(config) => {
		if (localStorage.getItem('token')) {
			config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
		}
		return config;

	}
)

$api.interceptors.response.use(
	(response) => {
		schedule.removeError();
		return response;
	},
	(error) => {
		console.log(error)
		schedule.setError(error);
		return Promise.reject(error);
	}
)


export default $api;
