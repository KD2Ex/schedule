import {makeAutoObservable, runInAction} from "mobx";
import axios from "axios";
import {LessonType} from "../models/enums/LessonType";
import {ScheduleEntityType} from "../models/enums/ScheduleEntityType";
import {runInNewContext} from "vm";
import UserScheduleService from "../api/services/UserScheduleService";
import {fetchSchedule} from "../api/services/ScheduleService";

class Schedule {
	weekSchedule: any = [];
	currentData: any = {};
	firstPair: number = 0;
	lastPair: number = 4;
	isLoading: boolean = false;

	constructor() {
		makeAutoObservable(this);
	}

	getFirstPair() {
		let minPair = 1;
		this.weekSchedule.forEach(day => {
			if (day.pairs.length === 0) return;
			day.pairs[0].number === 0 ? minPair = 0 : null
		})

		return minPair;
	}

	getLastPair() {
		let maxPairs = 0;
		this.weekSchedule.forEach(day => {
			if (day.pairs.length === 0) return;
			day.pairs[day.pairs.length - 1].number > maxPairs ? maxPairs = day.pairs[day.pairs.length - 1].number : null
		})
		console.log(maxPairs)
		return maxPairs;
	}

	clearSchedule() {
		this.weekSchedule = [];
	}

	async fetchSchedule(date, replaced, type, entity ) {
		if (!this.isLoading) {
			this.isLoading = true;
			const newSchedule = await fetchSchedule(date, replaced, type, entity);
			this.weekSchedule = newSchedule
			this.firstPair = this.getFirstPair();
			this.lastPair = this.getLastPair();
		}
	}

	async setIsLoading(value: boolean) {
		this.isLoading = value;
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
		if (!this.isLoading) {
			this.isLoading = true;
			this.currentData = await UserScheduleService.getCurrentData()			
		}

	}

	getDate(week: number) {

		let date: number[] = [];

		if (this.currentData.firstWeek) {
			switch (week) {
				case 1: {
					date = this.currentData.currentWeek
					console.log(date)
					break;
				}
				case 2: {
					date = this.currentData.nextWeek;
					break;
				}
				default: {
					date = this.currentData.previousWeek;
					break;
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

			if (result[2] < 30) {
				result[2] += 1;

			}
			console.log(result)

			console.log(new Date([...result]))
			return new Date([...result]).toISOString()
		}

		return null

	}

}

export default new Schedule();