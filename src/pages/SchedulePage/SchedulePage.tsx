import React, {useEffect, useState} from 'react'
import {
	Autocomplete,
	Box,
	Button, Checkbox,
	Container, FormControlLabel, FormGroup, getRadioUtilityClass,
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
import IScheduleDay from "../../models/interfaces/IScheduleDay";
import {scheduleTypeConvert, scheduleTypeToFilterValue} from "../../utils/converters";
import {themeObject} from "../../themes";
import {CheckOutlined, CheckRounded} from "@mui/icons-material";
import UserScheduleService from "../../api/services/UserScheduleService";
import {AutocompleteOption} from "../../models/interfaces/IAutocompleteOption";
import user from "../../store/user";
import schedule from "../../store/schedule";
import compareEntity, {CompareObject} from "../../utils/compareFunctions/compareEntity";


export const loader = async () => {
	console.log('loader')
	return null
}

const SchedulePage = observer(() => {

	const [week, setWeek] = useState(1);
	const [isReplaceActive, setIsReplaceActive] = useState(true);
	const [filterValue, setFilterValue] = useState<AutocompleteOption | null>(null);
	const [scheduleEntities, setScheduleEntities] = useState<AutocompleteOption[]>([]);
	const [filterType, setFilterType] = useState<FILTER_TYPES>(FILTER_TYPES.TEACHERS);
	const [scheduleDays, setScheduleDays] = useState<IScheduleDay[]>([]);
	const [open, setOpen] = useState(false);
	const [isPrevWeek, setIsPrevWeek] = useState(false);
	const loading = open && scheduleEntities?.length === 0;

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
			let entities: CompareObject[] = []

			switch (filterType) {
				case FILTER_TYPES.TEACHERS:
					await teacher.fetchTeachers();
					entities = [...teacher.teachers];
					break;
				case FILTER_TYPES.GROUPS:
					await group.fetchGroups();
					entities = [...group.groups];
					break;
				case FILTER_TYPES.ROOMS:
					await room.fetchRooms();
					entities = [...room.rooms];
					break;
			}

			entities.sort(compareEntity);

			entities.map(item => {
				options.push({id: item.id, label: item.fullName})
			})

			setScheduleEntities(options);
		})();

		console.log(room);

	}, [loading])

	useEffect(() => {
		if (!open) {
			setScheduleEntities([]);
		}
	}, [open]);

	useEffect(() => {

		const ISODate = schedule.getDate(week)

		if (filterValue !== null) {
			(async () => {
				const newSchedule = await fetchSchedule(ISODate, isReplaceActive, scheduleTypeConvert(filterType), filterValue.id);
				setScheduleDays(newSchedule);
			})();
		}


	}, [filterValue, isReplaceActive, week])

	useEffect(() => {

		setWeek(3)

		if (!isPrevWeek) {
			setWeek(schedule.currentData.firstWeek ? 1 : 2)
		}

	}, [isPrevWeek])

	useEffect(() => {


		(async () => {
			await schedule.fetchCurrentData();

			const userData = await UserScheduleService.getCurrentData();
			console.log(userData)

			setWeek(userData.firstWeek ? 1 : 2);
			if (userData.type) {
				setFilterType(scheduleTypeToFilterValue(userData.type));
			}
			switch (userData.type) {
				case ScheduleType.GROUP: {
					if (group.groups.length === 0) {
						await group.fetchGroups();
					}
					setFilterValue({label: group.groups.find((group) => group.id === userData.entityId).fullName, id: userData.entityId} as AutocompleteOption)
					break;
				}
				case ScheduleType.TEACHER: {
					if (teacher.teachers.length === 0) {
						await teacher.fetchTeachers();
					}
					setFilterValue({label: teacher.teachers.find((teacher) => teacher.id === userData.entityId).fullName, id: userData.entityId} as AutocompleteOption)
					break;
				}
			}
		})()


	}, [])


	const handleWeekChange = (event: React.MouseEvent<HTMLElement>, newWeek: number) => {
		if (newWeek !== null) {
			setWeek(newWeek);
		}
		console.log(newWeek);
	}

	const handleReplacementChanged = (event: React.ChangeEvent<HTMLInputElement>) => {

		setIsReplaceActive(event.target.checked);
	}

	const handlePrevWeek = (event: React.ChangeEvent<HTMLInputElement>) => {

		setIsPrevWeek(event.target.checked);
	}


	const getMaxPairsNumber = () => {
		let maxPairs = 0;
		scheduleDays.forEach(day => {
			if (day.pairs.length === 0) return;
			day.pairs[day.pairs.length - 1].number > maxPairs ? maxPairs = day.pairs[day.pairs.length - 1].number : null
		})
		return maxPairs;
	}

	const getMinPairNumber = () => {
		let minPair = 1;
		scheduleDays.forEach(day => {
			if (day.pairs.length === 0) return;
			day.pairs[0].number === 0 ? minPair = 0 : null
		})

		return minPair;
	}


	const maxPairsNumber = getMaxPairsNumber();
	const minPairNumber = getMinPairNumber();

	const fillDays = () => {
		const scheduleDaysCount = [];

		for(let i = scheduleDays.length; i < 6; i++) {
			scheduleDaysCount.push(<ScheduleDayTable
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
		return scheduleDaysCount;
	}

	return (
		<>
			<Box sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				gap: 1,
				flexWrap: {xs: 'wrap', lg: 'nowrap'},
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
					disabled={isPrevWeek}
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
					options={scheduleEntities}
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

				{!schedule.currentData.firstWeek &&
                <FormControlLabel
                    sx={{m: 0}}
                    control={
						<Checkbox
							checked={isPrevWeek}
							onChange={handlePrevWeek}
							sx={{
								color: 'primary.main',
								'&.Mui-checked': {
									color: (theme) => theme.palette.mode === 'light' ? `${theme.palette.primary.main} ` : `${theme.palette.primary.main}`
								}
							}}
						/>
					}
                    label={'Показать прошлю неделю'}
                    labelPlacement={"start"}
                />
				}
			</Box>


			<Grid2 container spacing={{xs: 0, md: 3}} sx={{mx: 0, my: 2}}>
				{filterValue !== null && scheduleDays.length !== 0 ? scheduleDays.map((item: IScheduleDay, index: React.Key | null | undefined) => (
					<ScheduleDayTable
						key={index}
						columns={getColumns(filterType)}
						rows={item}
						isSelected={new Date(item.date * 1000).toLocaleDateString() === new Date().toLocaleDateString()}
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


