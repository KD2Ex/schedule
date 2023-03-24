import {makeAutoObservable} from "mobx";
import axios from "axios";
import ITeacher from "../models/ITeacher";


class Teacher {
	teachers: ITeacher[] = []

	constructor() {
		makeAutoObservable(this);
	}

	async fetchTeachers() {
		//const result = axios.get('');

		this.teachers = [
			{id: 1, firstName: 'Наталья', lastName: 'Тесленко', surname: 'Федоровна'},
			// {id: 2, firstName: 'Наталья', lastName: 'Тесленко', surname: 'Федоровна', label: ''},
			// {id: 3, firstName: 'Наталья', lastName: 'Тесленко', surname: 'Федоровна', label: ''},
			// {id: 4, firstName: 'Наталья', lastName: 'Тесленко', surname: 'Федоровна', label: ''},
			// {id: 5, firstName: 'Наталья', lastName: 'Тесленко', surname: 'Федоровна', label: ''},
		]

		this.teachers.map(teacher => {
			//teacher.label = `${teacher.lastName} ${teacher.firstName[0]}. ${teacher.surname[0]}.`
		})
	}

}

export default new Teacher();