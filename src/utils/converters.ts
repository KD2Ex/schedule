import {SCHEDULE_ENTITY} from "../models/enums/SCHEDULE_ENTITY";
import {ScheduleEntityType} from "../models/enums/ScheduleEntityType";


export const scheduleTypeConvert = (filterType: SCHEDULE_ENTITY) => {

	switch (filterType) {
		case SCHEDULE_ENTITY.GROUP:{
			return ScheduleEntityType.GROUP;
		}
		case SCHEDULE_ENTITY.TEACHER:{
			return ScheduleEntityType.TEACHER;
		}
		case SCHEDULE_ENTITY.ROOM:{
			return ScheduleEntityType.ROOM;
		}
	}

}


export const scheduleTypeToFilterValue = (type: ScheduleEntityType) => {
	switch (type) {
		case ScheduleEntityType.GROUP:{
			return SCHEDULE_ENTITY.GROUP;
		}
		case ScheduleEntityType.TEACHER:{
			return SCHEDULE_ENTITY.TEACHER;
		}
		case ScheduleEntityType.ROOM:{
			return SCHEDULE_ENTITY.ROOM;
		}
	}
}