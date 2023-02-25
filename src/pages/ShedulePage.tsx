import React, {useEffect, useState} from 'react'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import {Stack, Autocomplete, TextField, TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody, ToggleButtonGroup, ToggleButton} from '@mui/material'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {Typography} from '@mui/material'
import NavBar from '../components/NavBar'
import DayGrid from '../components/DayGrid';
import useScheduleStore from '../store/scheduleStore';
import useGroupStore from '../store/groupStore';
import useTeachersStore from './../store/teachersStore';
import useRoomsStore from './../store/roomsStore';


enum FILTER_TYPES {
  GROUPS = 'Группы',
  TEACHERS = 'Преподаватели',
  ROOMS = 'Аудитории',
}


interface Group {
    id: number,
    groupNumber: number,
    course: number,
    label: string,
}

interface Teacher {
  id: number,
  label: string,
};

interface Room {
  id: number,
  lable: string,
}


function  ShedulePage() {

  const [week, setWeek] = useState(1);
  const [isReplaceActive, setIsReplaceActive] = useState(true);
  const [filterValue, setFilterValue] = useState< Group | Teacher | Room | null>(null);
  const [filterOptions, setFilterOptions] = useState<Group[] | Teacher[] | Room[]>([]);
  const [filterType, setFilterType] = useState<FILTER_TYPES>(FILTER_TYPES.TEACHERS);
  const [open, setOpen] = useState(false);
  const loading = open && filterOptions?.length === 0;


  const date = new Date();
  const currentDay = date.getDay() - 1;

  const groups = useGroupStore(state => state.groups);
  const getGroups = useGroupStore(state => state.getGroups);

  const rooms = useGroupStore(state => state.rooms);
  const getRooms = useGroupStore(state => state.getRooms);

  const schedule = useScheduleStore(state => state.schedule);
  const getGroupSchedule = useScheduleStore(state => state.getGroupSchedule);
  const getTeacherSchedule = useScheduleStore(state => state.getTeacherSchedule);
  const getRoomSchedule = useScheduleStore(state => state.getRoomSchedule);
  const addGroup = useGroupStore(state => state.addGroup);

  const teachers = useTeachersStore(state => state.teachers);
  const getTeachers = useTeachersStore(state => state.getTeachers); 

  
  useEffect(() => {
      
        let active = true;

        if (!loading) {
          return undefined;
        }

        (async () => {

          let options: any = [];
          
          switch(filterType) {
            case FILTER_TYPES.TEACHERS:
              getTeachers();
              console.log(teachers);
              options = teachers;
              break;
            case FILTER_TYPES.GROUPS:   
              
              getGroups();
              console.log(groups);
              options = groups;
              break;
            case FILTER_TYPES.ROOMS:
              //while(rooms === null) {
                getRooms();
                console.log("rooms:" + rooms);
                
                //}
                if (rooms.length === 0) {
                  console.log('null')
                  getRooms();
                }
                options = rooms;
              break;
          }

          if (active) {
            console.log(options)
            setOptions(options);
          }
        })();

        console.log(rooms);
        

  }, [loading])

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  useEffect(() => {
    if (filterValue !== null) {
      if (filterType === FILTER_TYPES.GROUPS) {
        getGroupSchedule(filterValue.id);
      }
      if (filterType === FILTER_TYPES.TEACHERS) {
        getTeacherSchedule(filterValue.id);
      }
      if (filterType === FILTER_TYPES.ROOMS) {
        getRoomSchedule(filterValue.id);
      }
    }
  }, [filterValue])

  const setOptions = (value: any[]) => {
    setFilterOptions(value);
  }
 
  const handleWeekChange = (weekNumber: number) => {
    setWeek(weekNumber);
    console.log(week);
  }

  const handleReplacementChange = (value: boolean) => {
    setIsReplaceActive(value);
  }

  const handelAlignment = (event: React.MouseEvent<HTMLElement>, newFilter: FILTER_TYPES) => {
    if (newFilter !== null) {
      setFilterType(newFilter);
      setFilterValue(null);
    }
  }

  const getColumns = (filterType: FILTER_TYPES) => {
    switch(filterType) {
      case FILTER_TYPES.GROUPS:
        return ['Пара', 'Преподаватель', 'Дисциплина', 'Аудитория'];
      case FILTER_TYPES.TEACHERS:
        return ['Пара', 'Группа', 'Дисциплина', 'Аудитория'];
      case FILTER_TYPES.ROOMS:
        return ['Пара', 'Группа', 'Преподаватель', 'Дисциплина'];
    }
  }

  return (
    <>
      <NavBar/>
      <Button onClick={(e) => addGroup('123')}>qwer</Button>
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
        <ToggleButtonGroup 
            size='small'
            onChange={handelAlignment}
            value={filterType}
            exclusive
            >
              <ToggleButton value="Тип" disabled>
                Тип
              </ToggleButton>
              <ToggleButton value={FILTER_TYPES.GROUPS} >
                Группы
              </ToggleButton>
              <ToggleButton value={FILTER_TYPES.TEACHERS}>
                Преподаватели
              </ToggleButton>
              <ToggleButton value={FILTER_TYPES.ROOMS}>
                Аудитории
              </ToggleButton>
          </ToggleButtonGroup>
        </Grid2>

        <Grid2 xs={4}>

          <Autocomplete
            value={filterValue}
            size='small'
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
              
            }}
            loading={loading}
            options={filterOptions}
            renderInput={(params) => (<TextField 
              {...params} 
              label={filterType}
              InputProps={{
                ...params.InputProps,
              }}
              /> )}
            onChange={(event: any, newValue: Group | Teacher | null) => {
                setFilterValue((state) => state = newValue);
            }}
            />
          </Grid2>

      </Stack>

      <Grid2 container spacing={6} sx={{mx: 8, my: 2}}>
        

          {filterValue !== null && schedule !== null ? schedule.map((item, index) => (
            <DayGrid xsNum={12} 
                     key={index}
                     columns={getColumns(filterType)}
                   mdNum={12} 
                   lNum={6}
                   xlNum={4}
                   rows={item}
                   isSelected={index === currentDay ? true : false}
                   dayNumber={index}/>   
          )) : null}


      </Grid2>
    </>
  )
}

export default ShedulePage


