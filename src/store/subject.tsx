import {makeAutoObservable} from "mobx";
import {ISubject} from "../models/ISubject";


class Subject {
	subjects: ISubject[] = []

	constructor() {
		makeAutoObservable(this)
	}

	async fetchSubjects() {
		this.subjects = [
			{id: 1, name: 'Элементы высшей математики'},
			{id: 2, name: 'Разработка программных модулей'},
			{id: 3, name: 'Инструментальные средста разработки'},
		]
	}

	getSubjectsNames() {
		return this.subjects.map(subj => subj.name)
	}

}

export default new Subject();