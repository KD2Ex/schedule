import {ScheduleEntityType} from "../../models/enums/ScheduleEntityType";
import $api from "../http";

export default class ScheduleService {
	static async fetchSchedule(startDate: string, isReplacement: boolean, type: ScheduleEntityType, id: number) {

		const result = await $api.get(`/schedule`, {
			params: {
				startDate: startDate,
				replacement: isReplacement,
				type: type,
				entityId: id,
			}
		}).catch((reason) => {
			console.log(reason)
		})
		console.log(result.data.response)
		return result.data.response.days;
	}

	static async updateSchedule(file: FormData) {


		return $api.post('/schedule/update', file, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})

		/*return $api.post('/schedule/update', {
			file: file.values().next().value,
			date: date
		}, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})*/

	}

	static async fetchSavedSchedule(date: string) {

		const response = await $api.get('/schedule/saved', {
			params: {
				date: date
			}
		})

		console.log(response.data.response)
		return response.data.response
	}
}

