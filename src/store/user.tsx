import {makeAutoObservable} from "mobx";
import {IUser} from "../models/interfaces/IUser";
import AuthService from "../api/services/AuthService";
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../api/http";
import {REDIRECT_URL, VK_AUTH_URL} from "../api/http/urls";
import UserService from "../api/services/UserService";
import alerts from "./alerts";
import {SocialType} from "../models/types/SocialType";
import {ISocial} from "../models/interfaces/ISocial";
import {ILinkedSchedule} from "../models/interfaces/ILinkedSchedule";
import AdminService from "../api/services/AdminService";


class User {
	user = {} as IUser;
	profile = {} as IUser;
	isAuth = false;
	isPretendedToAuth = false;
	uuid = '';
	permissions: any = [];


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
			localStorage.setItem('expiry', response.data.response.expiry);
			this.setAuth(true);
			return {result: true, code: 200};
			//this.setUser({id: '1', email:'qwer@mail.ru', isAcitvated: true});
		} catch (e) {

			return {result: false, code: e.code};
		}
	}

	async signup(email: string, password: string) {

		const response = await AuthService.signup(email, password)

	}

	async checkAuth() {
		try {
			//const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
			//console.log()
			//localStorage.setItem('token', response.data.accessToken);
			if (localStorage.getItem('token')) {
				this.setAuth(true);
				this.setPretendingToAuth(false);

				const response = await UserService.getPermissions();
				this.permissions = response.permissions;
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
			this.profile.linkedSocial[0].contain = false;
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
				uuid: response.uuid,
				firstName: response.name,
				lastName: response.surname,
				patronymic: response.patronymic
			});

	}

	async updateFullname(name: string, surname: string, patronymic: string) {
		const response = await UserService.updateFullname(name, surname, patronymic);
	}

	async getAllUsers(value: string, size: number, page: number) {
		const response = await AdminService.getAllUsers(value, size, page);

		console.log(response)
		return response
	}

}

export default new User();