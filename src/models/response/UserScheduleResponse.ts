import {ScheduleType} from "../enums/ScheduleType";


export interface UserScheduleResponse {
	messages: string[],
	response: {
		firstWeek: boolean,
		entityId: number,
		type: ScheduleType,
	}
}