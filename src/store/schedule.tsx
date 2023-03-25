import {makeAutoObservable} from "mobx";

class Schedule {
	weekSchedule: any = [];

	constructor() {
		makeAutoObservable(this);
	}


	async fetchWeekSchedule() {
		this.weekSchedule = [
			[
				{id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46", replacementDate: null},
				{id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105", replacementDate: '17.02.2023'},
				{id: 3, subjNumber: "3", teacher: "Шостак Н. И.",subject: 'Инструментальные средста разработки', room: "104", replacementDate: null},
				{id: 4, subjNumber: "4", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105", replacementDate: null},
			],
			[
				{id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
				{id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
				{id: 3, subjNumber: "3", teacher: "Шостак Н. И.",subject: 'Инструментальные средста разработки', room: "104"},
				{id: 4, subjNumber: "4", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
			],
			[
				{id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
				{id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
				{id: 3, subjNumber: "3", teacher: "Шостак Н. И.",subject: 'Инструментальные средста разработки', room: "104"},
				{id: 4, subjNumber: "4", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
			],
			[
				{id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
				{id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
				{id: 3, subjNumber: "3", teacher: "Шостак Н. И.",subject: 'Инструментальные средста разработки', room: "104"},
				{id: 4, subjNumber: "4", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
			],
			[
				{id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
				{id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
				{id: 3, subjNumber: "3", teacher: "Шостак Н. И.",subject: 'Инструментальные средста разработки', room: "104"},
				{id: 4, subjNumber: "4", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
			],
			[
				{id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
				{id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
				{id: 3, subjNumber: "3", teacher: "Шостак Н. И.",subject: 'Инструментальные средста разработки', room: "104"},
				{id: 4, subjNumber: "4", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
			],
		]
	}
}

export default new Schedule();