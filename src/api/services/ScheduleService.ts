import axios from "axios";
import {ScheduleType} from "../../models/enums/ScheduleType";
import $api from "../http";


export const fetchSchedule = async (weekNumber: number, isReplacement: boolean, type: ScheduleType, id: number) => {
	const firstWeek: boolean = weekNumber === 1;

	try {
		const result = await $api.get(`/schedule`, {
			params: {
				firstWeek: firstWeek,
				replacement: isReplacement,
				type: type,
				entityId: id,
			}
		})
		console.log(result.data.response.days)

		return result.data.response.days;
	} catch (e) {
		console.log(e.message)
		return [];
	}
}