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
import ContainedButton from "../../styled/ContainedButton";

interface ScheduleEditDialogProps {

}

const ScheduleEditDialog: FC<ScheduleEditDialogProps> = observer(() => {

    const [open, setOpen] = useState(false);


    const handleClose = () => {
        setOpen(false);
        schedule.rejectEditing();
        const timer = setTimeout(() => schedule.setEditableSchedule([]), 150)

    }

    const handleSave = () => {
        console.log(schedule.hiddenLessons)
        console.log(schedule.showedLessons)

        schedule.updateHiddenLessons();

        console.log(schedule.editableSchedule[0].lessons[0].group)
        schedule.addEditedSchedule(schedule.editableSchedule[0].lessons[0].group)

        setOpen(false);
        const timer = setTimeout(() => schedule.setEditableSchedule([]), 600)

    }

    useEffect(() => {

        if (schedule.editableSchedule.length !== 0) {
            setOpen(true);
        }

    }, [JSON.stringify(schedule.editableSchedule)])


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
                    Расписание группы {schedule.editableSchedule[0]?.lessons[0].group} на {schedule.editDate.toDate().toLocaleDateString()}

                </Typography>
            </DialogTitle>

            <DialogContent>
                {schedule.editableSchedule &&  <ScheduleDayTable
                    rows={schedule.editableSchedule}
                    header={schedule.editableSchedule[0]?.lessons[0].group}
                    isSelected={false}
                    isReplacementEnabled={true}
                    filterType={{value: ScheduleEntityType.GROUP, title: SCHEDULE_ENTITY.GROUP} as IScheduleEntity}
                    /*maxPairNumber={schedule.lastPair}
                    minPairNumber={schedule.firstPair}*/
                    editable
                />}

            </DialogContent>

            <DialogActions>
                <ContainedButton
                    onClick={handleSave}

                >
                    Сохранить
                </ContainedButton>
                <Button
					variant={'outlined'}
					onClick={handleClose}
				>
                    Отмена
                </Button>
            </DialogActions>

        </Dialog>
    );
});

export default ScheduleEditDialog;