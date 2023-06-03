import {ScheduleEntityType} from "../enums/ScheduleEntityType";
import {SCHEDULE_ENTITY} from "../enums/SCHEDULE_ENTITY";


export interface IScheduleEntity {
    value: ScheduleEntityType,
    title: SCHEDULE_ENTITY
}