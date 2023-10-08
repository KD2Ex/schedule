import {AxiosResponse} from "axios";
import {AuthResponse} from "../../models/response/AuthResponse";
import $api from "../http";
import {REDIRECT_URL} from "../http/urls";

export default class AuthService {
	static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>('/auth/login', {email, password})
	}

	static async logout(): Promise<void> {
		return $api.post('/logout');
	}

	static async signup(email: string, password: string) {

		console.log(email, password, REDIRECT_URL)
		return $api.post('/auth/signup', {
			email: email,
			password: password,
			redirectUrl: REDIRECT_URL
		})
	}

	static async telegramLink() {
		const response = await $api.get('/auth/telegram/link');

		return response
	}

	static async telegramLogin() {
		const response = await $api.get('/auth/telegram/login', {
			params: {
				redirectUrl: REDIRECT_URL
			}
		});

		return response
	}

}