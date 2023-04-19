import IPair from "./IPair";


export default interface IScheduleDay {
	date: Date,
	number: number,
	pairs: IPair[]
}