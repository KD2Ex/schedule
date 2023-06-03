import ITeacher from "../models/interfaces/ITeacher";
import {GridValueGetterParams} from "@mui/x-data-grid";
import {SCHEDULE_ENTITY} from "../models/enums/SCHEDULE_ENTITY";


export const getTeacherFullName = (teacher: ITeacher) : string => {

	return `${teacher.lastName} ${teacher.firstName[0]}. ${teacher.surname[0]}.`
}

export const formatTeacherFullName = (teacher: GridValueGetterParams) : string => {
	return `${teacher.row.lastName} ${teacher.row.firstName[0]}. ${teacher.row.surname[0]}.`
}

export const getGroupLabel = (params: GridValueGetterParams) => {
	return `${params.row.groupNumber || ''}-Д9-${params.row.course}${params.row.spec}`
}

export const getColumns = (type: SCHEDULE_ENTITY) => {
	switch (type) {
		case SCHEDULE_ENTITY.GROUP:
			return ['№', 'Преподаватель', 'Дисциплина', 'Ауд.'];
		case SCHEDULE_ENTITY.TEACHER:
			return ['№', 'Группа', 'Дисциплина', 'Аудитория'];
		case SCHEDULE_ENTITY.ROOM:
			return ['№',  'Преподаватель', 'Дисциплина', 'Группа'];
	}
}