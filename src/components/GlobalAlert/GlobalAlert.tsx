import React, {FC, useEffect, useState} from 'react';
import {Alert, Snackbar} from "@mui/material";
import {IAlert} from "../../models/interfaces/IAlert";
import alerts from "../../store/alerts";
import {observer} from "mobx-react-lite";

interface GlobalAlertProps {
}

const GlobalAlert: FC<GlobalAlertProps> = () => {
    const [open, setOpen] = useState(false);

    const handleAlertClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        // алерт, как и модалка, открывается при перезагрузке странице,
        // поэтому идет проверка на определенное дефолтное значение, во избежание
        // пустых алертов/модалок после загрузки сайта
        if (alerts.alert.message !== 'Success!') {
            setOpen(true);
        }
    }, [alerts.alert])

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
                severity={alerts.alert.severity}
                sx={{ width: '100%' }}
            >
                {alerts.alert.message}
            </Alert>
        </Snackbar>
    );
};

export default observer(GlobalAlert);