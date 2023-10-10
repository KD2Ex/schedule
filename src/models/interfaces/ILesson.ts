

export default interface ILesson {
	empty: boolean,
	group: string,
	id: number,
	replacement: boolean,
	room: string,
	subject: string,
	teacher: string,
	dateWorkOut?: Date,
}