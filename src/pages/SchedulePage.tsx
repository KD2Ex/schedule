import React, {useEffect, useState} from 'react'
import {
	Stack,
	Autocomplete,
	TextField,
	ToggleButtonGroup,
	ToggleButton,
	Box, Container
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {Typography} from '@mui/material'
import DayGrid from '../components/DayGrid';
import {observer} from "mobx-react-lite";
import room from "../store/rooms";
import group from "../store/group";
import teacher from "../store/teacher";
import schedule from "../store/schedule";



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
}

interface Room {
	id: number,
	label: string,
}


const SchedulePage = observer(() => {

	const [week, setWeek] = useState(1);
	const [isReplaceActive, setIsReplaceActive] = useState(true);
	const [filterValue, setFilterValue] = useState< Group | Teacher | Room | null>(null);
	const [filterOptions, setFilterOptions] = useState<Group[] | Teacher[] | Room[]>([]);
	const [filterType, setFilterType] = useState<FILTER_TYPES>(FILTER_TYPES.TEACHERS);

	const [open, setOpen] = useState(false);
	const loading = open && filterOptions?.length === 0;

	const date = new Date();
	const currentDay = date.getDay() - 1;

	useEffect(() => {

		let active = true;

		if (!loading) {
			return undefined;
		}

		(async () => {

			let options: any = [];

			switch(filterType) {
				case FILTER_TYPES.TEACHERS:
					await teacher.fetchTeachers();
					options = teacher.teachers;
					break;
				case FILTER_TYPES.GROUPS:
					await group.fetchGroups();
					options = group.groups;
					break;
				case FILTER_TYPES.ROOMS:
					await room.fetchRooms();
					options = room.roomCount;

					break;
			}
			if (active) {
				console.log(options)
				setOptions(options);
			}
		})();

		console.log(room);


	}, [loading])

	useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	useEffect(() => {
		if (filterValue !== null) {
			if (filterType === FILTER_TYPES.GROUPS) {
				schedule.fetchWeekSchedule().then(() => {

				})
			}
			if (filterType === FILTER_TYPES.TEACHERS) {
				schedule.fetchWeekSchedule().then(() => {

				})
				//getTeacherSchedule(filterValue.id);
			}
			if (filterType === FILTER_TYPES.ROOMS) {
				schedule.fetchWeekSchedule().then(() => {

				})
				//getRoomSchedule(filterValue.id);
			}
		}



	}, [filterValue])

	const setOptions = (value: any[]) => {
		setFilterOptions(value);
	}

	const handleWeekChange = (event: React.MouseEvent<HTMLElement>, newFilter: number) => {
		if (newFilter !== null) {
			setWeek(newFilter);
		}
		console.log(week);
	}

	const handleReplacementAlignment = (event: React.MouseEvent<HTMLElement>, newFilter: boolean) => {
		if (newFilter !== null) {
			setIsReplaceActive(newFilter);
		}
	}

	const handelTypeAlignment = (event: React.MouseEvent<HTMLElement>, newFilter: FILTER_TYPES) => {
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
			{/*<Button onClick={(e) => addGroup('123')}>qwer</Button>*/}
			{/*<Stack spacing={{lg: 2, md: 1, sm: 0}} direction='row' sx={{ml: '85px', mr: '10px', mt: '25px', flexWrap: 'wrap'}}>
			</Stack>*/}
			<Container sx={{display:'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', mt: '25px'}}>

				<Grid2 xs={4} sx={{mr: 2, mb: 2}}>
					<ToggleButtonGroup
						size='small'
						onChange={handelTypeAlignment}
						value={filterType}
						exclusive
					>

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


				<Grid2 xs={2} sx={{mr: 2, mb: 2}}>
					<ToggleButtonGroup
						size='small'
						onChange={handleWeekChange}
						value={week}
						exclusive
					>
						<ToggleButton value="Неделя" disabled>
							Неделя
						</ToggleButton>
						<ToggleButton value={1} >
							I
						</ToggleButton>
						<ToggleButton value={2}>
							II
						</ToggleButton>
					</ToggleButtonGroup>
				</Grid2>
				<Grid2 xs={2} sx={{mr: 2, mb: 2}}>
					<ToggleButtonGroup
						size='small'
						onChange={handleReplacementAlignment}
						value={isReplaceActive}
						exclusive
					>
						<ToggleButton value="Замены" disabled>
							Замены
						</ToggleButton>
						<ToggleButton value={true} >
							Да
						</ToggleButton>
						<ToggleButton value={false}>
							Нет
						</ToggleButton>
					</ToggleButtonGroup>
				</Grid2>

				<Grid2 xs={4} sx={{mr: 2, mb: 2}}>

					<Autocomplete
						value={filterValue}
						size='small'
						open={open}
						sx={{width: {xs:240, md: 300}}}
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
							setFilterValue(newValue);
						}}
					/>
				</Grid2>

			</Container>

			<Grid2 container spacing={6} sx={{mx: 0, my: 2}}>

				{filterValue !== null && schedule.weekSchedule !== null ? schedule.weekSchedule.map((item, index) => (
					<DayGrid xsNum={12}
							 key={index}
							 columns={getColumns(filterType)}
							 mdNum={6}
							 lNum={6}
							 xlNum={4}
							 rows={item}
							 isSelected={index === currentDay}
							 dayNumber={index}/>
				)) : null}

			</Grid2>
		</>
	)
});

export default SchedulePage;


