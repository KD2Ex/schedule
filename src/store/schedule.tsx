import {makeAutoObservable, runInAction} from "mobx";
import axios from "axios";
import {LessonType} from "../models/enums/LessonType";
import {ScheduleType} from "../models/enums/ScheduleType";
import {runInNewContext} from "vm";
import UserScheduleService from "../api/services/UserScheduleService";

class Schedule {
	weekSchedule: any = [];
	currentData: any = {};

	constructor() {
		makeAutoObservable(this);
	}

	async fetchWeekSchedule(weekNumber: number, isReplacement: boolean, type: ScheduleType, id: number) {

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

	async fetchCurrentData() {
		this.currentData = await UserScheduleService.getCurrentData()
	}

}

export default new Schedule();