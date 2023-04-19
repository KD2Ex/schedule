import $api from "../http";
import {UserScheduleResponse} from "../../models/response/UserScheduleResponse";


export default class UserScheduleService {
	static async getUserSchedule() {
		const response = await $api.get<UserScheduleResponse>('/schedule/current_data')
		console.log(response.data.response);
		return response.data.response;
	}
}