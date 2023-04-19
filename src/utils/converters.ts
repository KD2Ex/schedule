import {FILTER_TYPES} from "../models/enums/FilterType";
import {ScheduleType} from "../models/enums/ScheduleType";


export const scheduleTypeConvert = (filterType: FILTER_TYPES) => {

	switch (filterType) {
		case FILTER_TYPES.GROUPS:{
			return ScheduleType.GROUP;
		}
		case FILTER_TYPES.TEACHERS:{
			return ScheduleType.TEACHER;
		}
		case FILTER_TYPES.ROOMS:{
			return ScheduleType.ROOM;
		}
	}

}


export const scheduleTypeToFilterValue = (type: ScheduleType) => {
	switch (type) {
		case ScheduleType.GROUP:{
			return FILTER_TYPES.GROUPS;
		}
		case ScheduleType.TEACHER:{
			return FILTER_TYPES.TEACHERS;
		}
		case ScheduleType.ROOM:{
			return FILTER_TYPES.ROOMS;
		}
	}
}