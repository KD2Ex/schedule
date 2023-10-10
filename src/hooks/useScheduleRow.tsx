import IScheduleDay from "../models/interfaces/IScheduleDay";
import IPair from "../models/interfaces/IPair";
import {SCHEDULE_ENTITY} from "../models/enums/SCHEDULE_ENTITY";
import {LessonType} from "../models/enums/LessonType";
import RowOne from "../components/ScheduleRows/RowOne/RowOne";
import RowDouble from "../components/ScheduleRows/RowDouble";
import React from "react";
import {TableCell, TableRow} from "@mui/material";
import {replacedStyle, rowDoubleStyle, rowOneStyle} from "../components/ScheduleRows/TableRowsMuiStyles";
import schedule from "../store/schedule";

export const useScheduleRow = (pair: IPair, filterType, key: number, editable: boolean, isReplacementEnabled: boolean) => {

    const cells: string[][] = [[pair.number.toString()], []];

    if (pair.lessons[0].empty) {

    }

    pair.lessons.forEach((lesson, index) => {
        switch (filterType.title) {
            case SCHEDULE_ENTITY.GROUP: {
                cells[index]?.push(pair.lessons[index].teacher);
                cells[index]?.push(pair.lessons[index].subject);
                cells[index]?.push(pair.lessons[index].room);
                break;
            }
            case SCHEDULE_ENTITY.TEACHER: {
                cells[index]?.push(pair.lessons[index].group);
                cells[index]?.push(pair.lessons[index].subject);
                cells[index]?.push(pair.lessons[index].room);
                break;
            }
            case SCHEDULE_ENTITY.ROOM: {
                cells[index]?.push(pair.lessons[index].teacher);
                cells[index]?.push(pair.lessons[index].subject);
                cells[index]?.push(pair.lessons[index].group);
                break;
            }
        }
    })


    let replaces: boolean[] = [false, false];

    if (isReplacementEnabled) {
        replaces = [
            pair.lessons[0]?.replacement,
            pair.type === LessonType.DOUBLE && pair.lessons[1]?.replacement
        ]

    }




    switch (pair?.type) {
        case LessonType.EMPTY:
        case LessonType.ONE: {
            return (
                <RowOne
                    id={pair.lessons[0]?.id}
                    editable={editable}
                    key={key}
                    row={cells[0]}
                    isReplaced={replaces[0]}
                    isEmpty={pair?.type === LessonType.EMPTY}
                />

            )
        }
        case LessonType.DOUBLE:
        case LessonType.FIRST: {
            return(
                <
                    RowDouble
                    editable={editable}
                    key={key}
                    firstRow={cells[0]}
                    secondRow={cells[1]}
                    replaces={replaces}
                    ids={[pair.lessons[0]?.id, pair.lessons[1]?.id]}
                    empty={[
                        pair.lessons[0]?.empty,
                        pair.lessons[1]?.empty,
                    ]}
                />
            )
        }
        case LessonType.SECOND: {
            return(
                <RowDouble
                    editable={editable}
                    key={key}
                    firstRow={cells[1]}
                    secondRow={cells[0]}
                    replaces={replaces}
                    ids={[pair.lessons[0]?.id, pair.lessons[1]?.id]}
                />
            )
        }
    }
}

