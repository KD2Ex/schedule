import {makeAutoObservable} from "mobx";
import {IUser} from "../models/IUser";
import AuthService from "../api/services/AuthService";
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../api/http";
import {VK_AUTH_URL} from "../api/http/urls";


class User {
	user = {} as IUser;
	isAuth = false;


	constructor() {
		makeAutoObservable(this)
	}

	setAuth(isAuth: boolean) {
		this.isAuth = isAuth;
	}

	setUser(user: IUser) {
		this.user = user;
	}

	async login(email: string, password: string) {
		try {
			const response = await AuthService.login(email, password);
			localStorage.setItem('token', response.data.accessToken);
			this.setAuth(true);
			this.setUser({id: '1', email:'qwer@mail.ru', isAcitvated: true});
		} catch (e) {
			console.log(e.response?.data?.message);
		}
	}

	async checkAuth() {
		try {
			//const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
			//console.log()
			//localStorage.setItem('token', response.data.accessToken);
			this.setAuth(true);
			this.setUser('');
		} catch (e) {
			console.log()
		}
	}

	async loginWithServices(url: string) {
		try {
			await window.location.replace(url);
			//window.open(url)
			console.log(window.location.toString());
			//localStorage.setItem('token', )
			this.setAuth(true);
			this.setUser({id: '1', email:'qwer@mail.ru', isAcitvated: true});

		} catch (e) {

		}
	}

	// getLoggedUser()

	logout() {
		this.setAuth(false);
		localStorage.clear();
	}

}

export default new User();