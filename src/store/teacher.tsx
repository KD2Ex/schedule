import {makeAutoObservable} from "mobx";
import axios from "axios";
import ITeacher from "../models/ITeacher";
import {getTeacherFullName} from "../utils/stringFormatters";


class Teacher {
	teachers: ITeacher[] = []

	constructor() {
		makeAutoObservable(this);
	}

	async fetchTeachers() {
		//const result = axios.get('');
		this.teachers = [
			{id: 1, firstName: 'Наталья', lastName: 'Тесленко', surname: 'Федоровна'},
			{id: 2, firstName: 'Наталья', lastName: 'Головко', surname: 'Федоровна'},
			{id: 3, firstName: 'Наталья', lastName: 'Т', surname: 'Федоровна'},
			{id: 4, firstName: 'Наталья', lastName: 'Тесленк', surname: 'Федоровна'},
			{id: 5, firstName: 'Наталья', lastName: 'Теслео', surname: 'Федоровна'},
			{id: 6, firstName: 'Наталья', lastName: 'Тенко', surname: 'Федоровна'},
			// {id: 3, firstName: 'Наталья', lastName: 'Тесленко', surname: 'Федоровна', label: ''},
			// {id: 4, firstName: 'Наталья', lastName: 'Тесленко', surname: 'Федоровна', label: ''},
			// {id: 5, firstName: 'Наталья', lastName: 'Тесленко', surname: 'Федоровна', label: ''},
		]

		this.teachers.map(teacher => {
			//teacher.label = `${teacher.lastName} ${teacher.firstName[0]}. ${teacher.surname[0]}.`
		})
	}

	getTeachersHeaders(): string[] {
		const result = this.teachers.map(teacher =>
			getTeacherFullName(teacher)
		)
		return result;
	}

}

export default new Teacher();