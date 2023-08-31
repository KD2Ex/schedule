import $api from "../http";
import {UserScheduleResponse} from "../../models/response/UserScheduleResponse";


export default class UserScheduleService {
	static async getCurrentData() {
		try {
			const response = await $api.get<UserScheduleResponse>('/schedule/current_data')
			console.log(response);
			return response.data.response;
		} catch(e) {
			console.log(e);
		}

	}
}