import axios, {AxiosResponse} from "axios";
import {AuthResponse} from "../../models/response/AuthResponse";
import $api from "../http";
import {ProfileResponse} from "../../models/response/ProfileResponse";
import {SocialType} from "../../models/types/SocialType";
import {ScheduleType} from "../../models/enums/ScheduleType";
import {UserResponse} from "../../models/response/UserResponse";

export default class UserService {

	static async getUserInfo(): Promise<UserResponse> {
		const user = await $api.get<AxiosResponse<UserResponse>>('/user/me');
		console.log(user);
		return user.data;
	}

	static async getProfileInfo(): Promise<ProfileResponse> {
		const user = await $api.get<AxiosResponse<ProfileResponse>>('/profile/me');
		console.log(user.data);
		return user.data;
	}

	static async setLinkedSchedule(type: ScheduleType, entityId: number) {
		return $api.post('/profile/update/linked_schedule', {type, entityId})
	}

	static async updateEmail(mail: string) {
		return $api.post('/profile/update/mail', {mail})
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
		return $api.post('/profile/update/remove_linked_network', {type})
	}


}