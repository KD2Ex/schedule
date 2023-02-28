import {makeAutoObservable} from "mobx";
import axios from "axios";


class Teacher {
	teachers: any = []

	constructor() {
		makeAutoObservable(this);
	}

	async fetchTeachers() {
		//const result = axios.get('');

		this.teachers = [
			{id: 1, label: 'Тесленко Н. Ф.'},
		]
	}

}

export default new Teacher();