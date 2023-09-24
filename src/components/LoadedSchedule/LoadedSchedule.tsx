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
            <Grid item container spacing={2} xs>

                {newSchedule?.lessons?.map((group, index) => (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                        <ScheduleDayTable
                            //key={group[0].lessons[0].id}
                            rows={group}
                            isSelected={false}
                            isReplacementEnabled={true}
                            header={group[0].lessons[0].group}
                            filterType={
                                {
                                    value: ScheduleEntityType.GROUP,
                                    title: SCHEDULE_ENTITY.GROUP
                                }
                            }
                            minPairNumber={schedule.firstPair}
                            maxPairNumber={schedule.lastPair}
                            clickable={true}

                        />
                    </Grid>


                ))}
            </Grid>
        </>


    );
});

export default LoadedSchedule;