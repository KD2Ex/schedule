import {IGroupSchedule} from "./IGroupSchedule";
import {UploadedScheduleType} from "../types/UploadedScheduleType";


export interface IScheduleSavedResponse {
	messages: string[],
	response: {
		groups: IGroupSchedule[],
		hideLessons: number[],
		type: UploadedScheduleType
	}
}