import axios, {AxiosResponse} from "axios";
import {AuthResponse} from "../../models/response/AuthResponse";
import $api from "../http";
import {UserResponse} from "../../models/response/UserResponse";

export default class UserService {
	static async getProfileInfo(): Promise<UserResponse> {
		const user = await $api.get<AxiosResponse<UserResponse>>('/profile/me');
		console.log(user.data);
		return user.data;
	}
}