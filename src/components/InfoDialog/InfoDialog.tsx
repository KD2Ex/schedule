import React, {FC, useEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import alerts from "../../store/alerts";

interface InfoDialogProps {
}

const InfoDialog:FC <InfoDialogProps> = () => {

    const [open, setOpen] = useState(false);


    const handleOk = () => {
        setOpen(false)
    }

    useEffect(() => {

        if (alerts.dialog.title !== '') {
            setOpen(true);

        }

    }, [alerts.dialog])

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
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

export default InfoDialog;