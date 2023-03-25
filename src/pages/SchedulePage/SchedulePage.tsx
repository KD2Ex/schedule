import React, {FC, useContext, useEffect, useState} from 'react'
import {
	Stack,
	Autocomplete,
	TextField,
	ToggleButtonGroup,
	ToggleButton,
	Box, Container, Button
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {Typography} from '@mui/material'
import DayGrid from '../../components/DayGrid/DayGrid';
import {observer} from "mobx-react-lite";
import room from "../../store/rooms";
import group from "../../store/group";
import teacher from "../../store/teacher";
import schedule from "../../store/schedule";
import {getMode} from "../../themes";
import {ColorModeContext} from "../../context/index";
import toggleStyles from '../../styles/toggleButtons.module.css'
import {FILTER_TYPES} from '../../models/enums/FilterType'
import TypeButtons from "../../components/TypeButtons";
import {getTeacherFullName} from "../../utils/stringFormatters";
import {Link} from "react-router-dom";
import { GridValidRowModel } from '@mui/x-data-grid';


interface AutocompleteOption {
	id: number;
	label: string;
}


const SchedulePage = observer(() => {

	const [week, setWeek] = useState(1);
	const [isReplaceActive, setIsReplaceActive] = useState(true);
	const [filterValue, setFilterValue] = useState<AutocompleteOption | null>(null);
	const [filterOptions, setFilterOptions] = useState<AutocompleteOption[]>([]);
	const [filterType, setFilterType] = useState<FILTER_TYPES>(FILTER_TYPES.TEACHERS);

	const [open, setOpen] = useState(false);
	const loading = open && filterOptions?.length === 0;

	const date = new Date();
	const currentDay = date.getDay() - 1;

	useEffect(() => {

		if (!loading) {
			return undefined;
		}

		(async () => {

			let options: AutocompleteOption[] = [];

			switch (filterType) {
				case FILTER_TYPES.TEACHERS:
					await teacher.fetchTeachers();

					teacher.teachers.map(teacher => {
						options.push({id: teacher.id, label: getTeacherFullName(teacher)})
					})

					break;
				case FILTER_TYPES.GROUPS:
					await group.fetchGroups();

					group.groups.map(group => {
						options.push({
							id: group.id,
							label: `${group.groupNumber}-${group.commercial ? 'КД9' : 'Д9'}-${group.course}${group.spec}`
						})
					})

					break;
				case FILTER_TYPES.ROOMS:
					await room.fetchRooms();

					room.rooms.map(room => {
						options.push({id: room.id, label: room.number.toString()})
					})


					break;
			}
			setFilterOptions(options);
		})();

		console.log(room);


	}, [loading])

	useEffect(() => {
		if (!open) {
			setFilterOptions([]);
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
	}, [filterValue, isReplaceActive])


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
		switch (filterType) {
			case FILTER_TYPES.GROUPS:
				return ['Пара', 'Преподаватель', 'Дисциплина', 'Ауд.'];
			case FILTER_TYPES.TEACHERS:
				return ['Пара', 'Группа', 'Дисциплина', 'Аудитория'];
			case FILTER_TYPES.ROOMS:
				return ['Пара', 'Группа', 'Преподаватель', 'Дисциплина'];
		}
	}

	//console.log(changeMode)
	return (
		<>
			<Container sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				gap: 1,
				flexWrap: 'wrap',
				mt: '2rem'
			}}>

				<TypeButtons
					filterType={filterType}
					setFilterType={setFilterType}
					exclusive
					size='small'
					className={toggleStyles.toggleButton}
				/>

				{/*<ToggleButtonGroup
					size='small'
					onChange={handelTypeAlignment}
					value={filterType}
					exclusive
					className={toggleStyles.toggleButton}
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
				</ToggleButtonGroup>*/}

				<ToggleButtonGroup
					size='small'
					onChange={handleWeekChange}
					value={week}
					exclusive
				>
					<ToggleButton value="Неделя" disabled>
						Неделя
					</ToggleButton>
					<ToggleButton value={1}>
						I
					</ToggleButton>
					<ToggleButton value={2}>
						II
					</ToggleButton>
				</ToggleButtonGroup>
				<ToggleButtonGroup
					size="small"
					aria-label="Small sizes"
					onChange={handleReplacementAlignment}
					value={isReplaceActive}
					exclusive
				>
					<ToggleButton value="Замены" disabled>
						Замены
					</ToggleButton>
					<ToggleButton value={true}>
						Да
					</ToggleButton>
					<ToggleButton value={false}>
						Нет
					</ToggleButton>
				</ToggleButtonGroup>


				<Autocomplete
					value={filterValue}
					size='small'
					open={open}
					sx={{width: {xs: 240, md: 300}}}
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
						label={` ${filterType}`}
						InputProps={{
							...params.InputProps,
						}}
					/>)}
					onChange={(event: any, newValue: AutocompleteOption | null) => {
						setFilterValue(newValue);
					}}
				/>

			</Container>

			<Grid2 container spacing={{xs: 0, md: 3}} sx={{mx: 0, my: 2}}>

				{filterValue !== null && schedule.weekSchedule !== null ? schedule.weekSchedule.map((item: readonly GridValidRowModel[], index: React.Key | null | undefined) => (
					<DayGrid
						// xsNum={12}
						// 	 mdNum={6}
						// 	 lNum={6}
						// 	 xlNum={4}
							 key={index}
							 columns={getColumns(filterType)}
							 rows={item}
							 isSelected={index === currentDay}
							 dayNumber={Number(index)}
							 isReplacementEnabled={isReplaceActive}
					/>
				)) : null}

			</Grid2>

			<Button
				variant={'outlined'}
				component={Link}
				to={'/schedule/edit'}
			>
				Редактировать
			</Button>
		</>
	)
});

export default SchedulePage;


