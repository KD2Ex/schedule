import {makeAutoObservable} from "mobx";
import {IUser} from "../models/interfaces/IUser";
import AuthService from "../api/services/AuthService";
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import $api, {API_URL} from "../api/http";
import {REDIRECT_URL, VK_AUTH_URL} from "../api/http/urls";
import UserService from "../api/services/UserService";
import alerts from "./alerts";
import {SocialType} from "../models/types/SocialType";
import {ISocial} from "../models/interfaces/ISocial";
import {ILinkedSchedule} from "../models/interfaces/ILinkedSchedule";
import AdminService from "../api/services/AdminService";

const defaultPermissions = [
	'permissions.me'
]

class User {
	user = {} as IUser;
	profile = {} as IUser;
	isAuth = false;
	uuid = '';
	permissions: string[] = [
		...defaultPermissions
	];


	constructor() {
		makeAutoObservable(this)
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
			localStorage.setItem('refreshToken', response.data.response.refreshToken);
			localStorage.setItem('expiry', response.data.response.expiry);
			this.setAuth(true);
			await this.getPermissions();
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
			}

			//this.setUser('');
		} catch (e) {
			console.log()
		}
	}

	async loginWithServices(url: string, isNew?: boolean) {
		try {

			console.log(url)

			if (isNew) {
				window.open(url, '_blank').focus();
				return
			}

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
			this.profile.linkedSocial.find(item => item.type === type)
				.contain = false;
		} catch (e) {

		}
	}

	linkSocial(url: string) {

	}

	// getLoggedUser()

	logout(alert: boolean = true) {
		this.setAuth(false);
		localStorage.clear();
		this.permissions = [...defaultPermissions];

		if (alert) {

			alerts.openWarningAlert('Вы вышли из системы')
		}
	}

	async refresh() {
		if (new Date(Number(localStorage.getItem('expiry'))) <= new Date()) {
			try {
				const response = await $api.post(`/auth/refresh`, {
					refreshToken: localStorage.getItem('refreshToken')
				});
				localStorage.setItem('token', response.data.response.accessToken);
				localStorage.setItem('expiry', response.data.response.expiry);
				localStorage.setItem('refreshToken', response.data.response.refreshToken);
				alerts.setIsLoading(false);



			} catch (e) {
				console.log('Не авторизован')

				this.logout()
			}
		}
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

	async verify(uuid: string) {
		const response = await AdminService.verifyUser(uuid);
	}

	async removeVerify(uuid: string) {
		const response = await AdminService.removeUserVerification(uuid)
	}

	async getPermissions() {

		try {
			const response = await UserService.getPermissions();
			this.permissions = response.permissions;
		} catch (e) {
			console.log(e)
		}

	}

	async updateMailing(type: SocialType) {

		try {
			const response = await UserService.updateMailing(type);

			const social = this.profile.linkedSocial.find((item) => item.type === type);

			if (social) {

				if (!social.enabledMailing) { // проверка обратна логике, потому что состояние обновляется только по
					// окончанию выполнения хэндлера
					social.enabledMailing = true;
					alerts.openSuccessAlert('Расслка успешно включена!')
				} else {
					alerts.openWarningAlert('Расслка отключена')
					social.enabledMailing = false;
				}

			}

		} catch (e) {

			//alerts.openErrorAlert('Ошибка: ' + e.message)

		}
	}

	async telegramLink() {

		await AuthService.telegramLink();


	}


	async telegramLogin() {

		//await AuthService.telegramLogin();
		window.location.replace('https://dev.kkep.su/api/auth/telegram/login');
	}



}

export default new User();