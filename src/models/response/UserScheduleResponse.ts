import {ScheduleEntityType} from "../enums/ScheduleEntityType";


export interface UserScheduleResponse {
	messages: string[],
	response: {
		firstWeek: boolean,
		entityId: number,
		type: ScheduleEntityType,
		previousWeek: number[],
		currentWeek: number[],
		nextWeek: number[],
	}
}