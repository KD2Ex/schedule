import {ScheduleType} from "../enums/ScheduleType";


export interface ILinkedSchedule {
	contain: boolean,
	linkedEntityId: number,
	linkedEntityType: ScheduleType,
}