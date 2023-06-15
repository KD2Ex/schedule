import React, {FC, useMemo} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Modal, Typography, useTheme} from "@mui/material";
import IScheduleDay from "../../../models/interfaces/IScheduleDay";
import ScheduleDayTable from "../../ScheduleDayTable/ScheduleDayTable";
import {IScheduleEntity} from "../../../models/interfaces/IScheduleEntity";
import {ScheduleEntityType} from "../../../models/enums/ScheduleEntityType";
import {SCHEDULE_ENTITY} from "../../../models/enums/SCHEDULE_ENTITY";
import schedule from "../../../store/schedule";

interface ScheduleEditDialogProps {
    open: boolean,
    setOpen: React.Dispatch<boolean>,
    scheduleDay: IScheduleDay,
}

const ScheduleEditDialog: FC<ScheduleEditDialogProps> = ({open, setOpen, scheduleDay}) => {

    const handleClose = () => {
        setOpen(false);
    }

    if (!scheduleDay) {
        return (<></>)
    }

    console.log(open)

    const theme = useTheme()

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={'md'}
            sx={{
                '& .MuiPaper-root': {
                    bgcolor: (theme) => theme.palette.background.dialog,
                    backgroundImage: 'none',
                    border: `1px solid ${theme.palette.primary.pale}`
                }
            }}
        >

            <DialogTitle>

                <Typography variant={'h4'}>
                    Расписание группы {scheduleDay.pairs[0].lessons[0].group} на {new Date(scheduleDay.date * 1000).toLocaleDateString()}
                </Typography>
            </DialogTitle>

            <DialogContent>
                {scheduleDay &&  <ScheduleDayTable
                    rows={scheduleDay}
                    isSelected={true}
                    isReplacementEnabled={false}
                    filterType={{value: ScheduleEntityType.GROUP, title: SCHEDULE_ENTITY.GROUP} as IScheduleEntity}
                    maxPairNumber={schedule.lastPair}
                    minPairNumber={schedule.firstPair}
                    editable
                />}

            </DialogContent>

            <DialogActions>
                <Button variant={'contained'}>
                    Сохранить
                </Button>
                <Button>
                    Отмена
                </Button>
            </DialogActions>

        </Dialog>
    );
};

export default ScheduleEditDialog;