import {makeAutoObservable, runInAction} from "mobx";
import axios from "axios";
import {LessonType} from "../models/enums/LessonType";
import {ScheduleEntityType} from "../models/enums/ScheduleEntityType";
import {runInNewContext} from "vm";
import UserScheduleService from "../api/services/UserScheduleService";

class Schedule {
	weekSchedule: any = [];
	currentData: any = {};

	constructor() {
		makeAutoObservable(this);
	}

	async fetchWeekSchedule(weekNumber: number, isReplacement: boolean, type: ScheduleEntityType, id: number) {

		const firstWeek: boolean = weekNumber === 1;
		const result = await axios.get(`http://91.223.199.62:8080/api/schedule`, {
			params: {
				firstWeek: firstWeek,
				replacement: isReplacement,
				type: type,
				entityId: id,
			}
		}).catch((reason) => {
			console.log(reason)
		})
		console.log(result.data.response)
		this.weekSchedule = result.data.response;

		/*runInAction(() => {
		})*/
		console.log(this.weekSchedule)
	}

	async fetchCurrentData() {
		this.currentData = await UserScheduleService.getCurrentData()
	}

	getDate(week: number) {

		let date: number[] = [];

		if (this.currentData.firstWeek) {
			switch (week) {
				case 1: {
					date = this.currentData.currentWeek
					break;
				}
				case 2: {
					date = this.currentData.nextWeek;
					break;
				}
				default: {
					date = this.currentData.previousWeek;
				}
			}
		} else {
			switch (week) {
				case 1: {
					date = this.currentData.nextWeek
					break;
				}
				case 2: {
					date = this.currentData.currentWeek;
					break;
				}
				default: {
					date = this.currentData.previousWeek;
				}
			}
		}

		const result = date?.filter((item: number) => true);

		if (result) {
			result[2] += 1;
			return new Date([...result]).toISOString()
		}

		return null

	}

}

export default new Schedule();