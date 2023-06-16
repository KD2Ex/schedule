import React, {useEffect, useState} from 'react';
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import 'dayjs/locale/ru'

const ScheduleDatePicker = ({date, setDate}) => {



    useEffect(() => {
        dayjs.locale('ru')
    }, [])

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
            <DatePicker
                label={'Выберите дату'}
                value={date}
                onChange={(newValue) => setDate(newValue)}
            />

    {/*        <DemoContainer components={['DatePicker']}>
            </DemoContainer>*/}
        </LocalizationProvider>
    );
};

export default ScheduleDatePicker;