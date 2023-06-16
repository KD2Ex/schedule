import React, {memo} from 'react';
import {Box, Button, Grid} from "@mui/material";
import ScheduleDayTable from "../ScheduleDayTable/ScheduleDayTable";
import {ScheduleEntityType} from "../../models/enums/ScheduleEntityType";
import {SCHEDULE_ENTITY} from "../../models/enums/SCHEDULE_ENTITY";
import {observer} from "mobx-react-lite";
import alerts from "../../store/alerts";
import schedule from '../../store/schedule';

const LoadedSchedule = observer(({newSchedule}) => {

    const handleClick = () => {
        alerts.openSuccessAlert('test')

    }
    console.log(schedule)

    return (
        <>
            <Grid container spacing={2}>

                {newSchedule?.lessons?.map((group, index) => (
                    <Grid item xs={4}>
                        <ScheduleDayTable
                            key={group[0].lessons[0].id}
                            rows={group}
                            isSelected={false}
                            isReplacementEnabled={false}
                            header={group[0].lessons[0].group}
                            filterType={
                                {
                                    value: ScheduleEntityType.GROUP,
                                    title: SCHEDULE_ENTITY.GROUP
                                }
                            }
                            maxPairNumber={schedule.lastPair}
                            minPairNumber={schedule.firstPair}
                            clickable={true}
                        />
                    </Grid>


                ))}
            </Grid>
        </>


    );
});

export default LoadedSchedule;