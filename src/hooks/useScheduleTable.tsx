import IScheduleDay from "../models/interfaces/IScheduleDay";
import IPair from "../models/interfaces/IPair";
import {SCHEDULE_ENTITY} from "../models/enums/SCHEDULE_ENTITY";
import {LessonType} from "../models/enums/LessonType";
import RowOne from "../components/ScheduleRows/RowOne/RowOne";
import RowDouble from "../components/ScheduleRows/RowDouble";
import React from "react";

export const getTableRow = (pair: IPair, type, isReplaced) => {


    const cells: string[][] = [[pair.number.toString()], []];



    pair.lessons?.forEach((lesson, index) => {
        console.log(lesson.teacher)
        switch (type) {
            case SCHEDULE_ENTITY.GROUP: {
                cells[index].push(pair.lessons[index].teacher);
                cells[index].push(pair.lessons[index].subject);
                cells[index].push(pair.lessons[index].room);
                break;
            }
            case SCHEDULE_ENTITY.TEACHER: {
                cells[index].push(pair.lessons[index].group);
                cells[index].push(pair.lessons[index].subject);
                cells[index].push(pair.lessons[index].room);
                break;
            }
            case SCHEDULE_ENTITY.ROOM: {
                cells[index].push(pair.lessons[index].teacher);
                cells[index].push(pair.lessons[index].subject);
                cells[index].push(pair.lessons[index].group);
                break;
            }
        }
    })
    console.log(cells)
    let replaces: boolean[] = [false, false];

    /*if (isReplaced) {
        replaces = [
            pair?.lessons[0]?.replacement,
            pair?.type === LessonType.DOUBLE && pair?.lessons[1]?.replacement
        ]

    }
*/
    switch (pair?.type) {
        case LessonType.EMPTY:
        case LessonType.ONE: {
            return (
                <RowOne
                    row={cells[0]}
                    isReplaced={replaces[0]}
                     isEmpty={pair?.type === LessonType.EMPTY}
                 />
            )
        }
        case LessonType.DOUBLE:
        case LessonType.FIRST: {
            return(
                <RowDouble
                    firstRow={cells[0]}
            secondRow={cells[1]}
            replaces={replaces}
            />
        )
        }
        case LessonType.SECOND: {
            return(
                <RowDouble
                    firstRow={cells[1]}
                secondRow={cells[0]}
                replaces={replaces}
            />
        )
        }
    }
}

export const useScheduleTable = (row, type, isReplaced) => {

    return getTableRow(row, type, isReplaced)

}