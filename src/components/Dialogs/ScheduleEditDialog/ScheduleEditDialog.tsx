import React, {FC, memo, useContext, useEffect, useMemo, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Modal, Typography, useTheme} from "@mui/material";
import IScheduleDay from "../../../models/interfaces/IScheduleDay";
import ScheduleDayTable from "../../ScheduleDayTable/ScheduleDayTable";
import {IScheduleEntity} from "../../../models/interfaces/IScheduleEntity";
import {ScheduleEntityType} from "../../../models/enums/ScheduleEntityType";
import {SCHEDULE_ENTITY} from "../../../models/enums/SCHEDULE_ENTITY";
import schedule from "../../../store/schedule";
import {ScheduleModalContext} from "../../../context";
import {observer} from "mobx-react-lite";

interface ScheduleEditDialogProps {

}

const ScheduleEditDialog: FC<ScheduleEditDialogProps> = observer(() => {

    const [open, setOpen] = useState(false);


    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {

        setOpen(true);

    }, [JSON.stringify(schedule.editableSchedule)])


    if (!schedule.editableSchedule) {
        console.log(schedule.editableSchedule)

        return (<></>)
    }

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
                    Расписание группы {schedule.editableSchedule[0]?.lessons[0].group} на {new Date( 1000).toLocaleDateString()}
                </Typography>
            </DialogTitle>

            <DialogContent>
                {schedule.editableSchedule &&  <ScheduleDayTable
                    rows={schedule.editableSchedule}
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
});

export default ScheduleEditDialog;