import {makeAutoObservable, runInAction} from "mobx";
import axios from "axios";
import {LessonType} from "../models/enums/LessonType";
import {ScheduleEntityType} from "../models/enums/ScheduleEntityType";
import UserScheduleService from "../api/services/UserScheduleService";
import ScheduleService from "../api/services/ScheduleService";
import {IUploadedSchedule} from "../models/interfaces/IUploadedSchedule";
import dayjs, {Dayjs} from "dayjs";

class Schedule {
	weekSchedule: any = [];
	newSchedule: IUploadedSchedule = {};
	currentData: any = {};
	firstPair: number = 0;
	lastPair: number = 4;
	isLoading: boolean = false;
	editDate: Dayjs = dayjs();
	editedSchedules: string[] = []
	showedLessons: number[] = []
	hiddenLessons: number[] = []
	editableSchedule = []
	error: any;

	mockSchedule: any = [

	]

	constructor() {
		makeAutoObservable(this);
	}

	addEditedSchedule(group: string) {

		if (!this.editedSchedules.find(item => item === group)) {
			this.editedSchedules.push(group)
		}
	}

	setEditDate(date: Dayjs) {
		this.editDate = date;
	}

	setEditableSchedule(schedule) {
		console.log(schedule)
		this.editableSchedule = schedule
	}

	getFirstPair(schedule) {
		let minPair = 1;
		if (schedule[0]?.hasOwnProperty('pairs')) {
			schedule?.forEach(day => {
				if (day.pairs.length === 0) return;
				day.pairs[0].number < minPair ? minPair = day.pairs[0].number : null
			})
		} else {
			schedule.forEach(item => {

				if (item[0].number < minPair) {
					minPair = item[0].number;
				}

			})
		}

		return minPair;
	}

	getLastPair(schedule) {
		let maxPairs = 0;

		if (schedule[0]?.hasOwnProperty('pairs')) {
			schedule?.forEach(day => {
				if (day.pairs.length === 0) return;
				if (day.pairs[day.pairs.length - 1].number > maxPairs) {
					maxPairs = day.pairs[day.pairs.length - 1].number
				}
			})
		} else {
			schedule.forEach(item => {

				if (item[item.length - 1].number > maxPairs) {
					maxPairs = item[item.length - 1].number;
				}
			})
		}


		return maxPairs;
	}

	hideLesson(id: number) {
		//this.newSchedule.hideLessons.push(id);
		this.hiddenLessons.push(id)
		if (!!this.showedLessons.find(item => item === id)) {
			console.log('wtf')
			this.showedLessons = this.showedLessons.filter(item => item !== id);
		}
	}

	showLesson(id: number) {
		//this.newSchedule.hideLessons = this.newSchedule.hideLessons.filter(item => item !== id);
		this.showedLessons.push(id)
		if (!!this.hiddenLessons.find(item => item === id)) {
			this.hiddenLessons = this.hiddenLessons.filter(item => item !== id);
		}
	}

	updateHiddenLessons() {

		const newSchedule = [...new Set(this.newSchedule.hideLessons
			.concat(this.hiddenLessons)
			.filter(item => !this.showedLessons.includes(item)))];

		console.log(newSchedule)

		this.newSchedule.hideLessons = newSchedule;
	}

	rejectEditing() {
		this.hiddenLessons = [];
		this.showedLessons = [];
	}

	clearSchedule() {
		this.weekSchedule = [];
	}

	clearNewSchedule() {
		this.newSchedule = {
			lessons: [],
			type: 'NONE',
			hideLessons: []
		}
	}

	async fetchSchedule(date, replaced, type, entity) {
		if (!this.isLoading) {
			this.isLoading = true;
			const newSchedule = await ScheduleService.fetchSchedule(date, replaced, type, entity);
			this.weekSchedule = newSchedule
			console.log(newSchedule)
			this.firstPair = this.getFirstPair(newSchedule);
			this.lastPair = this.getLastPair(newSchedule);

			console.log(this.firstPair)
			console.log(this.lastPair)
		}
	}

	async fetchSavedSchedule(date: string) {
		const schedule = await ScheduleService.fetchSavedSchedule(date);
		console.log(schedule)
		this.firstPair = this.getFirstPair(schedule.lessons);
		this.lastPair = this.getLastPair(schedule.lessons);
		console.log(this.firstPair)
		console.log(this.lastPair)
		this.newSchedule = schedule;
	}

	async setIsLoading(value: boolean) {
		this.isLoading = value;
	}

	async fetchCurrentData() {
		if (!this.isLoading) {
			this.isLoading = true;
			this.currentData = await UserScheduleService.getCurrentData()
		}

	}

	getDate(week: number) {

		let date: string = '';

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
		return date;
	/*	const result = date.split('-')?.map((item: string) => Number(item));
		if (result) {

			if (result[2] < 30) {
				result[2] += 1;

			}
			console.log(result)

			console.log(new Date([...result]))
			return new Date([...result]).toISOString()
		}

		return null*/

	}

	setError(error: any) {
		this.error = error;
	}

	removeError() {
		this.error = null;
	}

}

export default new Schedule();