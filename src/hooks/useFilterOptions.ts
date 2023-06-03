import {useEffect} from "react";
import {SCHEDULE_ENTITY} from "../models/enums/SCHEDULE_ENTITY";
import teacher from "../store/teacher";
import group from "../store/group";
import room from "../store/rooms";
import {AutocompleteOption} from "../models/interfaces/IAutocompleteOption";


export const useFilterOptions = (filterType: SCHEDULE_ENTITY, setState: any) => {

	let options: AutocompleteOption[] = [];

	(async () => {

		switch (filterType) {
			case SCHEDULE_ENTITY.TEACHER:
				await teacher.fetchTeachers();

				teacher.teachers.sort(function (a, b) {
					if (a.fullName > b.fullName) {
						return 1;
					}
					if (a.fullName < b.fullName) {
						return -1;
					}
					return 0;
				})

				teacher.teachers.map(teacher => {
					options.push({id: teacher.id, label: teacher.fullName})
				})

				break;
			case SCHEDULE_ENTITY.GROUP:
				await group.fetchGroups();

				group.groups.sort(function (a, b) {
					return Number(a.fullName.split('-')[0]) - Number(b.fullName.split('-')[0]);
				})

				group.groups.map(group => {
					options.push({
						id: group.id,
						label: group.fullName,
					})
				})

				break;
			case SCHEDULE_ENTITY.ROOM:
				await room.fetchRooms();

				room.rooms.sort(function (a, b) {
					return +a.fullName - +b.fullName
				})

				room.rooms.map(room => {
					options.push({id: room.id, label: room.fullName})
				})
				break;
		}
		//setFilterOptions(options);
		setState(options);
	})();

}