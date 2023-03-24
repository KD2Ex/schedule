import ITeacher from "../models/ITeacher";
import {GridValueGetterParams} from "@mui/x-data-grid";


export const getTeacherFullName = (teacher: ITeacher) : string => {

	return `${teacher.lastName} ${teacher.firstName[0]}. ${teacher.surname[0]}.`
}

export const formatTeacherFullName = (teacher: GridValueGetterParams) : string => {
	return `${teacher.row.lastName} ${teacher.row.firstName[0]}. ${teacher.row.surname[0]}.`
}

export const getGroupLabel = (params: GridValueGetterParams) => {
	return `${params.row.groupNumber || ''}-Д9-${params.row.course}${params.row.spec}`
}