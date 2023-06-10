import ScheduleDayTable from "../components/ScheduleDayTable/ScheduleDayTable";
import { LessonType } from "../models/enums/LessonType";
import { emptyDay } from "../pages/SchedulePage/data";
import schedule from "../store/schedule";

export const fillDays = () => {
    const scheduleDaysCount = [];

    for (let i = schedule.firstPair; i < schedule.lastPair; i++) {
        emptyDay.pairs.push(
            {number: i, lessons: [], type: LessonType.EMPTY}
        )
    }

    for(let i = schedule.weekSchedule.length; i < 6; i++) {
        scheduleDaysCount.push(<ScheduleDayTable
            key={i}
            rows={emptyDay}
            isSelected={i === currentDay}
            isReplacementEnabled={isReplaceActive}
            filterType={filterType}
            maxPairNumber={schedule.lastPair}
            minPairNumber={schedule.firstPair}
        />)
    }
    return scheduleDaysCount;
}