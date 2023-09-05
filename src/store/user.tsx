import {makeAutoObservable} from "mobx";
import {IUser} from "../models/interfaces/IUser";
import AuthService from "../api/services/AuthService";
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../api/http";
import {VK_AUTH_URL} from "../api/http/urls";
import UserService from "../api/services/UserService";
import alerts from "./alerts";
import {SocialType} from "../models/types/SocialType";


class User {
	user = {} as IUser;
	profile = {} as IUser;
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
		this.profile = user;
	}

	async login(email: string, password: string) {
		try {
			const response = await AuthService.login(email, password);
			console.log(response)
			localStorage.setItem('token', response.data.response.accessToken);
			this.setAuth(true);
			return {result: true, code: 200};
			//this.setUser({id: '1', email:'qwer@mail.ru', isAcitvated: true});
		} catch (e) {

			return {result: false, code: e.code};
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

	async unlinkSocial(type: SocialType) {
		try {
			await UserService.removeLinkedNetwork(type)
		} catch (e) {

		}
	}

	linkSocial(url: string) {

	}

	// getLoggedUser()

	logout() {
		this.setAuth(false);
		this.setPretendingToAuth(false);
		localStorage.clear();

		alerts.openWarningAlert('Вы вышли из системы')
	}

	loginPretending() {
		this.setPretendingToAuth(true);
	}

	async fetchProfile() {

		const response = await UserService.getProfileInfo()

		this.setUser(
			{
				linkedSocial: response.linkedSocial,
				email: response.mail,
				linkedSchedule: response.linkedSchedule,
				containPassword: response.containPassword,
				uuid: '1'
			});

	}

}

export default new User();