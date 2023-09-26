import React, {FC, useEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import alerts from "../../store/alerts";
import {observer} from "mobx-react-lite";

interface InfoDialogProps {
}

const InfoDialog:FC <InfoDialogProps> = () => {

    const [open, setOpen] = useState(false);

    const handleOk = async () => {

        if (alerts.dialog.callback) {
            await alerts.dialog.callback(...alerts.dialog.props);
        }

        setOpen(false)
        alerts.resetDialog();
    }

    const handleClose = () => {
        setOpen(false)
        alerts.resetDialog();
        console.log(alerts.dialog)
    }

    useEffect(() => {

        console.log(alerts.dialog)
        if (alerts.dialog.open) {
            setOpen(true);
        }

    }, [alerts.dialog])

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >

            <DialogTitle>
                {alerts.dialog.title}
            </DialogTitle>

            <DialogContent>
                {alerts.dialog.body}
            </DialogContent>

            <DialogActions>
                <Button autoFocus onClick={handleOk}>
                    Ок
                </Button>
            </DialogActions>

        </Dialog>
    );
};

export default observer (InfoDialog);