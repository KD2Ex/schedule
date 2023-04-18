import {AxiosResponse} from "axios";
import {AuthResponse} from "../../models/response/AuthResponse";
import $api from "../http";

export default class AuthService {
	static async login(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>('/login', {username, password})
	}

	static async logout(): Promise<void> {
		return $api.post('/logout');
	}



}