import ILesson from "./ILesson";
import IPair from "./IPair";
import {UploadedScheduleType} from "../types/UploadedScheduleType";


export interface IUploadedSchedule {
    hideLessons: number[],
    lessons: IPair[][],
    type: UploadedScheduleType,
}
