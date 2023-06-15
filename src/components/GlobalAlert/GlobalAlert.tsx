import React, {FC, useEffect, useState} from 'react';
import {Alert, Snackbar} from "@mui/material";
import {IAlert} from "../../models/interfaces/IAlert";

interface GlobalAlertProps {
    alert: IAlert
}

const GlobalAlert: FC<GlobalAlertProps> = ({alert}) => {
    const [open, setOpen] = useState(false);

    const handleAlertClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        if (alert.message !== 'Success!') {
            setOpen(true);
        }
    }, [alert])

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleAlertClose}
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        >
            <Alert
                variant={'filled'}
                onClose={handleAlertClose}
                severity={alert.severity}
                sx={{ width: '100%' }}
            >
                {alert.message}
            </Alert>
        </Snackbar>
    );
};

export default GlobalAlert;