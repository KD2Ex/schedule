import ILesson from "./ILesson";
import {LessonType} from "../enums/LessonType";


export default interface IPair {
	number: number,
	lessons: ILesson[],
	type: LessonType,
}