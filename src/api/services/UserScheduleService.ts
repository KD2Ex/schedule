import $api from "../http";
import {UserScheduleResponse} from "../../models/response/UserScheduleResponse";


export default class UserScheduleService {
	static async getCurrentData() {
		const response = await $api.get<UserScheduleResponse>('/schedule/current_data')
		console.log(response.data);
		return response.data.response;
	}
}