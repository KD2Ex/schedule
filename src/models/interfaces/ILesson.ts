

export default interface ILesson {
	group: string,
	id: number,
	replacement: boolean,
	room: string,
	subject: string,
	teacher: string,
	dateWorkOut?: Date,
}