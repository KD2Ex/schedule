import {makeAutoObservable, runInAction} from "mobx";
import axios from "axios";
import {LessonType} from "../models/enums/LessonType";
import {ScheduleType} from "../models/enums/ScheduleType";
import {runInNewContext} from "vm";

class Schedule {
	weekSchedule: any = [];

	constructor() {
		makeAutoObservable(this);
	}


	async fetchWeekSchedule(weekNumber: number, isReplacement: boolean, type: ScheduleType, id: number) {
		/*this.weekSchedule = [
			[
				{id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Инструментальные средста разработки123123123123', room: "46", replacementDate: null, double: true},
				{id: 2,  teacher: "Тесленко Н. Ф.",subject: 'Инструментальные средста разработки123123', room: "46", replacementDate: null, double: true},
				{id: 3, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105", replacementDate: '17.02.2023', double: false},
				{id: 4, subjNumber: "3", teacher: "Шостак Н. И.",subject: 'Инструментальные средста разработки', room: "104", replacementDate: null},
				{id: 5, subjNumber: "4", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105", replacementDate: null},
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


		*/

		const firstWeek: boolean = weekNumber === 1;

		try {
			const result = await axios.get(`http://91.223.199.62:8080/api/schedule`, {
				params: {
					firstWeek: firstWeek,
					replacement: isReplacement,
					type: type,
					entityId: id,
				}
			})
			console.log(result.data.response)

			runInAction(() => {
				this.weekSchedule = result.data.response;
			})
			console.log(this.weekSchedule)
		} catch (e) {
			console.log(e.message)
		}
	}
}

export default new Schedule();