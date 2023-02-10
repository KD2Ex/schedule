import React, {useState} from 'react'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import {Stack, Autocomplete, TextField} from '@mui/material'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {Typography} from '@mui/material'
import NavBar from '../components/NavBar'
import DayGrid from '../components/DayGrid';

enum FILTER_TYPES {
  GROUPS = 'Группы',
  TEACHERS = 'Преподаватели',
  ROOMS = 'Аудитории',
}


function  ShedulePage() {

  const [week, setWeek] = useState(1);
  const [isReplaceActive, setIsReplaceActive] = useState(true);
  const [filterType, setFilterType] = useState(FILTER_TYPES.GROUPS);
  const [filterValue, setFilterValue] = useState< string | null>(null);

  const date = new Date();
  const currentDay = date.getDay() - 1;

  const weekRows = [[
    [
      {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
        {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        {id: 3, subjNumber: "3", teacher: "Шостак Н. И.",subject: 'Инструментальные средста разработки', room: "104"},
        {id: 4, subjNumber: "4", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
    ],
    [
      {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
        {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        {id: 3, subjNumber: "3", teacher: "Шостак Н. И.",subject: 'Инструментальные средста разработки', room: "104"},
        {id: 4, subjNumber: "4", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
    ],
    [
      {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
        {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        {id: 3, subjNumber: "3", teacher: "Шостак Н. И.",subject: 'Инструментальные средста разработки', room: "104"},
        {id: 4, subjNumber: "4", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
    ],
    [
      {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
        {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        {id: 3, subjNumber: "3", teacher: "Шостак Н. И.",subject: 'Инструментальные средста разработки', room: "104"},
        {id: 4, subjNumber: "4", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
    ],
    [
      {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
        {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        {id: 3, subjNumber: "3", teacher: "Шостак Н. И.",subject: 'Инструментальные средста разработки', room: "104"},
        {id: 4, subjNumber: "4", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
    ],
    [
      {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
        {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        {id: 3, subjNumber: "3", teacher: "Шостак Н. И.",subject: 'Инструментальные средста разработки', room: "104"},
        {id: 4, subjNumber: "4", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
    ],
  ],
  [
    [
      {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "460"},
        {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        {id: 3, subjNumber: "2", teacher: "Шостак Р. А.",subject: 'Разработка программных модулей', room: "105"},
        {id: 4, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
    ],
    [
      {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
        {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        {id: 3, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        {id: 4, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
    ],
    [
      {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
        {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        {id: 3, subjNumber: "2", teacher: "йцукйцук Р. А.",subject: 'Разработка программных модулей', room: "105"},
        {id: 4, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
    ],
    [
      {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
        {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        {id: 3, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        {id: 4, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
    ],
    [
      {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
        {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        {id: 3, subjNumber: "2", teacher: "йцукйцук Р. А.",subject: 'Разработка программных модулей', room: "105"},
        {id: 4, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
    ],
    [
      {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
        {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        {id: 3, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        {id: 4, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
    ],
  ]]

  const weekRows2 = [
    [
      {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "460"},
        {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        {id: 3, subjNumber: "2", teacher: "Шостак Р. А.",subject: 'Разработка программных модулей', room: "105"},
        {id: 4, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
    ],
    [
      {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
        {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        {id: 3, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        {id: 4, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
    ],
    [
      {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
        {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        {id: 3, subjNumber: "2", teacher: "йцукйцук Р. А.",subject: 'Разработка программных модулей', room: "105"},
        {id: 4, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
    ],
    [
      {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
        {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        {id: 3, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        {id: 4, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
    ],
    [
      {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
        {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        {id: 3, subjNumber: "2", teacher: "йцукйцук Р. А.",subject: 'Разработка программных модулей', room: "105"},
        {id: 4, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
    ],
    [
      {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
        {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        {id: 3, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        {id: 4, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
    ],
  ]


    const columns: GridColDef[] = [
        {field: 'subjNumber', headerName: 'Пара', flex: 1},
        {field: 'teacher', headerName: 'Преподаватель', flex: 2},
        {field: 'subject', headerName: 'Дисциплина', flex: 3},
        {field: 'room', headerName: 'Аудитория', flex: 1},
    ]

  const objects = [
    '4-Д9-4ИСП',
    '3-Д9-4ИНС'
  ]

  const handleWeekChange = (weekNumber: number) => {
    setWeek(weekNumber);
    console.log(week);
  }

  const handleReplacementChange = (value: boolean) => {
    setIsReplaceActive(value);
  }

  const handleFilterTypeChange = (value: FILTER_TYPES) => {
    setFilterType(value);
  }

  return (
    <>
      <NavBar/>
      <Stack spacing={{lg: 2, md: 1, sm: 0}} direction='row' sx={{ml: '85px', mr: '100px', mt: '25px', flexWrap: 'wrap'}}>
        <Grid2 xs={2}>
          <ButtonGroup variant='outlined' >
            <Button disabled>Неделя</Button>
            <Button 
              variant={week === 1 ? 'contained' : 'outlined'}
              onClick={() => handleWeekChange(1)}
              >I</Button>
            <Button
              variant={week === 2 ? 'contained' : 'outlined'}
              onClick={() => handleWeekChange(2)}>II</Button>
          </ButtonGroup>
        </Grid2>
        
        <Grid2 xs={2}>
          <ButtonGroup variant='outlined' >
            <Button disabled>Замены</Button>
            <Button 
              variant={isReplaceActive === true ? 'contained' : 'outlined'}
              onClick={() => handleReplacementChange(true)}
              >Да</Button>
            <Button
              variant={isReplaceActive === false ? 'contained' : 'outlined'}
              onClick={() => handleReplacementChange(false)}>Нет</Button>
          </ButtonGroup>
        </Grid2>

        <Grid2 xs={4}>
          <ButtonGroup variant='outlined' >
            <Button disabled>Тип</Button>
            <Button 
              variant={filterType === FILTER_TYPES.GROUPS ? 'contained' : 'outlined'}
              onClick={() => handleFilterTypeChange(FILTER_TYPES.GROUPS)}
              >
                Группы
            </Button>
            <Button
              variant={filterType === FILTER_TYPES.TEACHERS ? 'contained' : 'outlined'}
              onClick={() => handleFilterTypeChange(FILTER_TYPES.TEACHERS)}>
                Преподаватели
            </Button>
            <Button
              variant={filterType === FILTER_TYPES.ROOMS ? 'contained' : 'outlined'}
              onClick={() => handleFilterTypeChange(FILTER_TYPES.ROOMS)}>
                Аудитории
            </Button>
          </ButtonGroup>
        </Grid2>

        <Grid2 xs={4}>

          <Autocomplete 
            value={filterValue}
            size='small'
            options={objects}
            renderInput={(params) => <TextField {...params} label={filterType}/> }
            onChange={(event: any, newValue: string | null) => {
                setFilterValue((state) => state = newValue );
                  
            }}
            />
          </Grid2>

      </Stack>

      <Grid2 container spacing={6} sx={{mx: 8, my: 2}}>
          

          {filterValue !== null ? weekRows[objects.findIndex((item) => item === filterValue)].map((item, index) => (
            <DayGrid xsNum={12} 
                     key={index}
                   mdNum={6} 
                   lNum={6}
                   xlNum={4}
                   columns={columns} 
                   rows={item}
                   isSelected={index === currentDay ? true : false}
                   dayNumber={index}/>   
          )) : null}

      </Grid2>
    </>
  )
}

export default ShedulePage


