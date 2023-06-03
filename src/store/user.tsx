import {makeAutoObservable} from "mobx";
import {IUser} from "../models/interfaces/IUser";
import AuthService from "../api/services/AuthService";
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../api/http";
import {VK_AUTH_URL} from "../api/http/urls";


class User {
	user = {} as IUser;
	isAuth = false;
	isPretendedToAuth = false;


	constructor() {
		makeAutoObservable(this)
	}

	setPretendingToAuth(pretending: boolean) {
		this.isPretendedToAuth = pretending;
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
			console.log(response)
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
			if (localStorage.getItem('token')) {
				this.setAuth(true);
				this.setPretendingToAuth(false);
			}

			//this.setUser('');
		} catch (e) {
			console.log()
		}
	}

	async loginWithServices(url: string) {
		try {
			await window.location.replace(url);
			console.log(window.location.toString());
			//window.open(url)
			//localStorage.setItem('token', )
			/*this.setAuth(true);
			this.setUser({id: '1', email:'qwer@mail.ru', isAcitvated: true});*/

		} catch (e) {

		}
	}

	// getLoggedUser()

	logout() {
		this.setAuth(false);
		this.setPretendingToAuth(false);
		localStorage.clear();
	}

	loginPretending() {
		this.setPretendingToAuth(true);
	}

}

export default new User();