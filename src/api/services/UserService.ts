import axios, {AxiosResponse} from "axios";
import {AuthResponse} from "../../models/response/AuthResponse";
import $api from "../http";
import {ProfileResponse} from "../../models/response/ProfileResponse";
import {SocialType} from "../../models/types/SocialType";
import {ScheduleEntityType} from "../../models/enums/ScheduleEntityType";
import {UserResponse} from "../../models/response/UserResponse";
import {REDIRECT_URL} from "../http/urls";

export default class UserService {

	static async getProfileInfo(): Promise<ProfileResponse> {
		const user = await $api.get<AxiosResponse<ProfileResponse>>('/profile/me');
		return user.data.response;
	}

	static async setLinkedSchedule(type: ScheduleEntityType, entityId: number) {
		return $api.post('/profile/update/linked_schedule', {type, entityId})
	}

	static async updateEmail(mail: string) {
		return $api.post('/profile/update/mail', {
			mail,
			redirectUrl: REDIRECT_URL
		})
	}

	static async updateFullname(name: string, surname: string, patronymic: string) {
		return $api.post('/profile/update/fullname', {
			name,
			surname,
			patronymic
		})
	}

	static async updateMailing(type: SocialType) {
		return $api.post('/profile/update/mailing', {type})
	}

	static async updatePassword(oldPassword: string, newPassword: string) {
		/*let response = null;
		let responseError = null;
		try {
			response = $api.post('/profile/update/password', {oldPassword, newPassword})
				.catch(function (error) {
					console.log(error.response.data.code)
					responseError = error;
				})
			if (responseError !== null) {
				return responseError
			}
		} catch (e) {

		}*/
		return $api.post('/profile/update/password', {oldPassword, newPassword})
	}

	static async removeLinkedNetwork(type: SocialType) {
		console.log(type)
		return $api.post('/profile/update/remove_linked_network', {type: type})
	}

	static async getPermissions() {
		const response = await $api.get('/user/permissions/me');
		console.log(response.data.response.permissions)
		return response.data.response;
	}

	static async getRoles() {
		const response = await $api.get('/user/roles/available');

		return response.data.response
	}



}