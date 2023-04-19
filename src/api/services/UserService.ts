import axios, {AxiosResponse} from "axios";
import {AuthResponse} from "../../models/response/AuthResponse";
import $api from "../http";

export default class UserService {
	static async getLoggedUser() {
		const user = await $api.get('/user/me');
		console.log(user);
	}
}