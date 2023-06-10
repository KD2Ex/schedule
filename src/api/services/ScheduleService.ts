import {ScheduleEntityType} from "../../models/enums/ScheduleEntityType";
import $api from "../http";

export const fetchSchedule = async (startDate: string, isReplacement: boolean, type: ScheduleEntityType, id: number) => {

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