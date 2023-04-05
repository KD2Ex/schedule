import {makeAutoObservable} from "mobx";
import ITeacher from "../models/ITeacher";
import {getTeacherFullName} from "../utils/stringFormatters";
import {fetchEntities} from "../api/services/EntitiesService";
import {ScheduleType} from "../models/enums/ScheduleType";


class Teacher {
	teachers: ITeacher[] = []

	constructor() {
		makeAutoObservable(this);
	}

	async fetchTeachers() {
		const result = await fetchEntities(ScheduleType.TEACHER)
		this.teachers = result;


	}

	getTeachersHeaders(): string[] {
		const result = this.teachers.map(teacher =>
			getTeacherFullName(teacher)
		)
		return result;
	}

}

export default new Teacher();