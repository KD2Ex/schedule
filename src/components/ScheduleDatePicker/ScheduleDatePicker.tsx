import React, {useEffect, useState} from 'react';
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import dayjs, {Dayjs} from "dayjs";
import 'dayjs/locale/ru'


const isSunday = (date: Dayjs) => {
    const day = date.day();

    return day === 0;
}

const ScheduleDatePicker = ({date, setDate}) => {

    useEffect(() => {
        dayjs.locale('ru')
    }, [])

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
            <DatePicker
                sx={{
                    width: '30%'
                }}
                label={'Выберите дату'}
                value={date}
                onChange={(newValue) => {
                    newValue = dayjs(newValue).hour(9)
                    console.log(newValue.toISOString())
                    setDate(newValue)

                    //console.log(newValue = dayjs(newValue).hour(12))
                }
                }
                shouldDisableDate={isSunday}
            />

    {/*        <DemoContainer components={['DatePicker']}>
            </DemoContainer>*/}
        </LocalizationProvider>
    );
};

export default ScheduleDatePicker;