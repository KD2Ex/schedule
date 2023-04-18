import {ScheduleType} from "../../models/enums/ScheduleType";
import $api from "../http";


export const fetchEntities = async (type: ScheduleType) => {
	console.log()

	try {
		const result = await $api.get(`/schedule/entities`, {
			params: {
				type: type
			}
		})
		console.log(result.data.response)

		// if (type === ScheduleType.ROOM) {
		// 	result.data.response.entities = result.data.response.entities.filter((item) => )
		// }

		return result.data.response.entities;
	} catch (e) {
		console.log(e.message)
		return [];
	}

}