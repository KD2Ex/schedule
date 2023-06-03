import {IScheduleEntity} from "../models/interfaces/IScheduleEntity";
import teacher from "../store/teacher";
import {ScheduleEntityType} from "../models/enums/ScheduleEntityType";
import group from "../store/group";
import room from "../store/rooms";


export default async function switchFetching(switchValue: ScheduleEntityType) {

    let result;

    switch (switchValue) {

        case ScheduleEntityType.TEACHER:
            await teacher.fetchTeachers();
            result = teacher.teachers;
            break;
        case ScheduleEntityType.GROUP:
            await group.fetchGroups();
            result = group.groups;
            break;
        case ScheduleEntityType.ROOM:
            await room.fetchRooms();
            result = room.rooms;
            break;
    }

    return result;

}