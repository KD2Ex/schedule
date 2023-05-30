import ITeacher from "../models/interfaces/ITeacher";
import {GridValueGetterParams} from "@mui/x-data-grid";
import {FILTER_TYPES} from "../models/enums/FilterType";


export const getTeacherFullName = (teacher: ITeacher) : string => {

	return `${teacher.lastName} ${teacher.firstName[0]}. ${teacher.surname[0]}.`
}

export const formatTeacherFullName = (teacher: GridValueGetterParams) : string => {
	return `${teacher.row.lastName} ${teacher.row.firstName[0]}. ${teacher.row.surname[0]}.`
}

export const getGroupLabel = (params: GridValueGetterParams) => {
	return `${params.row.groupNumber || ''}-Д9-${params.row.course}${params.row.spec}`
}

export const getColumns = (type: FILTER_TYPES) => {
	switch (type) {
		case FILTER_TYPES.GROUPS:
			return ['№', 'Преподаватель', 'Дисциплина', 'Ауд.'];
		case FILTER_TYPES.TEACHERS:
			return ['№', 'Группа', 'Дисциплина', 'Аудитория'];
		case FILTER_TYPES.ROOMS:
			return ['№',  'Преподаватель', 'Дисциплина', 'Группа'];
	}
}