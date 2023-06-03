import {ScheduleEntityType} from "../enums/ScheduleEntityType";


export interface ILinkedSchedule {
	contain: boolean,
	linkedEntityId: number,
	linkedEntityType: ScheduleEntityType,
}