import {ScheduleEntityType} from "../../models/enums/ScheduleEntityType";
import $api from "../http";


export const fetchEntities = async (type: ScheduleEntityType) => {
	console.log('fetch')
	const result = await $api.get(`/schedule/entities`, {
		params: {
			type: type
		}
	}).catch((reason) => {
		console.log(reason)
		return [];
	})
	console.log(result)

	// if (type === ScheduleEntityType.ROOM) {
	// 	result.data.response.entities = result.data.response.entities.filter((item) => )
	// }

	return result.data.response.entities;

}