import {ScheduleEntityType} from "../models/enums/ScheduleEntityType";
import group from "../store/group";
import {AutocompleteOption} from "../models/interfaces/IAutocompleteOption";
import teacher from "../store/teacher";
import rooms from "../store/rooms";


export const setLoadedOption = async (type: ScheduleEntityType, entityId: number) => {
	switch (type) {
		case ScheduleEntityType.GROUP: {
			if (group.groups.length === 0) {
				await group.fetchGroups();
			}
			return ({label: group.groups.find((group) => group.id === entityId).fullName, id: entityId} as AutocompleteOption)
		}
		case ScheduleEntityType.TEACHER: {
			if (teacher.teachers.length === 0) {
				await teacher.fetchTeachers();
			}
			return ({label: teacher.teachers.find((teacher) => teacher.id === entityId).fullName, id: entityId} as AutocompleteOption)
		}
		case ScheduleEntityType.ROOM: {
			if (rooms.rooms.length === 0) {
				await teacher.fetchTeachers();
			}
			return ({label: rooms.rooms.find((room) => room.id === entityId).fullName, id: entityId} as AutocompleteOption)

		}
	}
}