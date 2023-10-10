import ILesson from "./ILesson";
import IPair from "./IPair";
import {UploadedScheduleType} from "../types/UploadedScheduleType";
import {IGroupSchedule} from "./IGroupSchedule";


export interface IUploadedSchedule {
    groups: IGroupSchedule[],
    hideLessons: number[],
    type: UploadedScheduleType,
}
