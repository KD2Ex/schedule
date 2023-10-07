import {makeAutoObservable} from "mobx";
import ITeacher from "../models/interfaces/ITeacher";
import {getTeacherFullName} from "../utils/stringFormatters";
import {fetchEntities} from "../api/services/EntitiesService";
import {ScheduleEntityType} from "../models/enums/ScheduleEntityType";


class Teacher {
	teachers: ITeacher[] = []

	constructor() {
		makeAutoObservable(this);
	}

	async fetchTeachers() {

		if (this.teachers.length === 0) {
			const result = await fetchEntities(ScheduleEntityType.TEACHER)
			console.log(result)
			this.teachers = result.filter((item : ITeacher) => item.fullName !== '?');
		}

	}

	getTeachersHeaders(): string[] {
		const result = this.teachers.map(teacher =>
			getTeacherFullName(teacher)
		)
		return result;
	}

}

export default new Teacher();