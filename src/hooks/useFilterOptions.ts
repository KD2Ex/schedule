import {useEffect} from "react";
import {FILTER_TYPES} from "../models/enums/FilterType";
import teacher from "../store/teacher";
import group from "../store/group";
import room from "../store/rooms";
import {AutocompleteOption} from "../models/IAutocompleteOption";


export const useFilterOptions = (filterType: FILTER_TYPES, setState: any) => {

	let options: AutocompleteOption[] = [];

	(async () => {

		switch (filterType) {
			case FILTER_TYPES.TEACHERS:
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
			case FILTER_TYPES.GROUPS:
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
			case FILTER_TYPES.ROOMS:
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