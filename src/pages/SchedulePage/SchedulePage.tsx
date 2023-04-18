import React, {useEffect, useState} from 'react'
import {
	Autocomplete,
	Box,
	Button, Checkbox,
	Container, FormControlLabel, FormGroup,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Typography
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import ScheduleDayTable from '../../components/ScheduleDayTable/ScheduleDayTable';
import {observer} from "mobx-react-lite";
import room from "../../store/rooms";
import group from "../../store/group";
import teacher from "../../store/teacher";
import {FILTER_TYPES} from '../../models/enums/FilterType'
import TypeButtons from "../../components/TypeButtons";
import {getColumns, getTeacherFullName} from "../../utils/stringFormatters";
import {Link} from "react-router-dom";
import {GridValidRowModel} from '@mui/x-data-grid';
import {ScheduleType} from "../../models/enums/ScheduleType";
import {fetchSchedule} from "../../api/services/ScheduleService";
import IScheduleDay from "../../models/IScheduleDay";
import {scheduleTypeConvert} from "../../utils/converters";
import {themeObject} from "../../themes";
import {CheckOutlined, CheckRounded} from "@mui/icons-material";


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
	const [schedule, setSchedule] = useState<IScheduleDay[]>([]);

	const [open, setOpen] = useState(false);
	const loading = open && filterOptions?.length === 0;

	const date = new Date();
	const currentDay = date.getDay() - 1;

	const emptyDay = {
		number: 0,
		pairs: []
	}

	useEffect(() => {

		if (!loading) {
			return undefined;
		}

		(async () => {

			let options: AutocompleteOption[] = [];

			switch (filterType) {
				case FILTER_TYPES.TEACHERS:
					await teacher.fetchTeachers();

					teacher.teachers.sort(function(a, b) {
						if (a.fullName > b.fullName) {
							return 1;
						}
						if (a.fullName < b.fullName) {
							return -1;
						}
						return 0;
					})

					teacher.teachers.map(teacher => {
						options.push({id: teacher.id, label: teacher.fullName})
					})

					break;
				case FILTER_TYPES.GROUPS:
					await group.fetchGroups();

					group.groups.sort(function (a, b) {
						return Number(a.fullName.split('-')[0]) - Number(b.fullName.split('-')[0]);
					})

					group.groups.map(group => {
						options.push({
							id: group.id,
							label: group.fullName,
						})
					})

					break;
				case FILTER_TYPES.ROOMS:
					await room.fetchRooms();

					room.rooms.sort(function (a, b) {
						return +a.fullName - +b.fullName
					})

					room.rooms.map(room => {
						options.push({id: room.id, label: room.fullName})
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
			(async () => {
				const newSchedule = await fetchSchedule(week, isReplaceActive, scheduleTypeConvert(filterType), filterValue.id);
				setSchedule(newSchedule);
			})();
		}
	}, [filterValue, isReplaceActive, week])


	const handleWeekChange = (event: React.MouseEvent<HTMLElement>, newFilter: number) => {
		if (newFilter !== null) {
			setWeek(newFilter);
		}
		console.log(week);
	}

	const handleReplacementChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
		/*if (newFilter !== null) {
			setIsReplaceActive(newFilter);
		}*/
		setIsReplaceActive(event.target.checked);
	}

	const handelTypeAlignment = (event: React.MouseEvent<HTMLElement>, newFilter: FILTER_TYPES) => {
		if (newFilter !== null) {
			setFilterType(newFilter);
			setFilterValue(null);
		}
	}


	const getMaxPairsNumber = () => {
		let maxPairs = 0;
		schedule.forEach(day => {
			if (day.pairs.length === 0) return;
			day.pairs[day.pairs.length - 1].number > maxPairs ? maxPairs = day.pairs[day.pairs.length - 1].number : null
		})
		return maxPairs;
	}

	const getMinPairNumber = () => {
		let minPair = 1;
		schedule.forEach(day => {
			if (day.pairs.length === 0) return;
			day.pairs[0].number === 0 ? minPair = 0 : null
		})

		return minPair;
	}


	const maxPairsNumber = getMaxPairsNumber();
	const minPairNumber = getMinPairNumber();

	const fillDays = () => {
		const scheduleDays = [];

		for(let i = schedule.length; i < 6; i++) {
			scheduleDays.push(<ScheduleDayTable
				key={i}
				columns={getColumns(filterType)}
				rows={emptyDay}
				isSelected={i === currentDay}
				dayNumber={Number(i)}
				isReplacementEnabled={isReplaceActive}
				filterType={filterType}
				maxPairNumber={maxPairsNumber}
				minPairNumber={minPairNumber}
			/>)
		}
		return scheduleDays;
	}

	return (
		<>
			<Container sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				gap: 1,
				flexWrap: 'wrap',
			}}>

				<TypeButtons
					filterType={filterType}
					setFilterType={setFilterType}
					setFilterValue={setFilterValue}
					exclusive
					size='small'

				/>



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
						1
					</ToggleButton>
					<ToggleButton value={2}>
						2
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

				<FormGroup>
					<FormControlLabel
						sx={{m: 0}}
						control={
							<Checkbox
								checked={isReplaceActive}
								onChange={handleReplacementChanged}
								sx={{
									color: 'primary.main',
									'&.Mui-checked': {
										color: (theme) => theme.palette.mode === 'light' ? `${theme.palette.primary.main} ` : `${theme.palette.primary.main}`
									}
								}}
							/>
						}
						label={'С учётом замен'}
						labelPlacement={"start"}
					/>

				</FormGroup>



			</Container>



			<Grid2 container spacing={{xs: 0, md: 3}} sx={{mx: 0, my: 2}}>

				{filterValue !== null && schedule.length !== 0 ? schedule.map((item: IScheduleDay, index: React.Key | null | undefined) => (
					<ScheduleDayTable
						key={index}
						columns={getColumns(filterType)}
						rows={item}
						isSelected={index === currentDay}
						dayNumber={Number(index)}
						isReplacementEnabled={isReplaceActive}
						filterType={filterType}
						maxPairNumber={maxPairsNumber}
						minPairNumber={minPairNumber}
					/>
				)) : null}


				{filterValue !== null && fillDays()}


			</Grid2>




		</>
	)
});

export default SchedulePage;


