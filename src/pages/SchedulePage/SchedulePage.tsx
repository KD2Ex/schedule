import React, {useEffect, useState} from 'react'
import {
	Autocomplete, Box, Checkbox, FormControlLabel, FormGroup, TextField, ToggleButton,
	ToggleButtonGroup, Tooltip
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import ScheduleDayTable from '../../components/ScheduleDayTable/ScheduleDayTable';
import {observer} from "mobx-react-lite";
import room from "../../store/rooms";
import {SCHEDULE_ENTITY} from '../../models/enums/SCHEDULE_ENTITY'
import TypeButtons from "../../components/TypeButtons";
import {getColumns} from "../../utils/stringFormatters";
import {ScheduleEntityType} from "../../models/enums/ScheduleEntityType";
import {fetchSchedule} from "../../api/services/ScheduleService";
import IScheduleDay from "../../models/interfaces/IScheduleDay";
import UserScheduleService from "../../api/services/UserScheduleService";
import {AutocompleteOption} from "../../models/interfaces/IAutocompleteOption";
import schedule from "../../store/schedule";
import compareEntity, {CompareObject} from "../../utils/compareFunctions/compareEntity";
import {IScheduleEntity} from "../../models/interfaces/IScheduleEntity";
import switchFetching from "../../utils/switchFetching";
import IPair from "../../models/interfaces/IPair";
import {LessonType} from "../../models/enums/LessonType";
import { ScheduleTooltip } from '../../components/styled/TooltippedCell';


export const loader = async () => {
	console.log('loader')
	return null
}

const SchedulePage = observer(() => {

	const [week, setWeek] = useState(2);
	const [isReplaceActive, setIsReplaceActive] = useState(true);
	const [filterValue, setFilterValue] = useState<AutocompleteOption | null>(null);
	const [scheduleEntities, setScheduleEntities] = useState<AutocompleteOption[]>([]);
	const [scheduleEntityType, setScheduleEntityType] = useState<IScheduleEntity>(
		{value: ScheduleEntityType.TEACHER, title: SCHEDULE_ENTITY.TEACHER}
	);
	const [scheduleDays, setScheduleDays] = useState<IScheduleDay[]>([]);
	const [open, setOpen] = useState(false);
	const [isPrevWeek, setIsPrevWeek] = useState(false);
	const loading = open && scheduleEntities?.length === 0;

	const date = new Date();
	const currentDay = date.getDay() - 1;

	const emptyDay = {
		number: 0,
		pairs: [] as IPair[],
		date: new Date(),
	}

	useEffect(() => {

		if (!loading) {
			return undefined;
		}

		(async () => {
			let options: AutocompleteOption[] = [];
			let entities: CompareObject[] = await switchFetching(scheduleEntityType.value)

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

		const ISODate = schedule.getDate(isPrevWeek ? 0 : week)

		if (filterValue !== null) {
			(async () => {

				console.log(ISODate)
				const newSchedule = await fetchSchedule(ISODate, isReplaceActive, scheduleEntityType.value, filterValue.id);
				setScheduleDays(newSchedule);
			})();
		}


	}, [filterValue, isReplaceActive, week, isPrevWeek])

	useEffect(() => {
/*
		if (!isPrevWeek) {
			setWeek(schedule.currentData.firstWeek ? 1 : 2)
		}*/

	}, [isPrevWeek])

	useEffect(() => {


		(async () => {
			await schedule.fetchCurrentData();

			const userData = await UserScheduleService.getCurrentData();
			console.log(userData)

			setWeek(userData.firstWeek ? 1 : 2);
			if (userData.type) {
				setScheduleEntityType({value: userData.type, title: SCHEDULE_ENTITY[userData.type]});
			}


			let entity = await switchFetching(userData.type);

			setFilterValue({label: entity.find((item) => item.id === userData.entityId)?.fullName, id: userData.entityId} as AutocompleteOption)

		})()


	}, [])


	const handleWeekChange = (event: React.MouseEvent<HTMLElement>, newWeek: number) => {
		if (newWeek !== null) {
			setIsPrevWeek(false)
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

		for (let i = getMinPairNumber(); i < getMaxPairsNumber(); i++) {
			emptyDay.pairs.push(
				{number: i, lessons: [], type: LessonType.EMPTY}
			)
		}

		for(let i = scheduleDays.length; i < 6; i++) {
			scheduleDaysCount.push(<ScheduleDayTable
				key={i}
				columns={getColumns(scheduleEntityType.title)}
				rows={emptyDay}
				isSelected={i === currentDay}
				/*dayNumber={Number(i)}*/
				isReplacementEnabled={isReplaceActive}
				filterType={scheduleEntityType}
				maxPairNumber={maxPairsNumber}
				minPairNumber={minPairNumber}
			/>)
		}
		return scheduleDaysCount;
	}

	const isScheduleEmpty = () => {
		let isEmpty = true;
		scheduleDays.map((item) => {
			if (item.pairs.length !== 0) isEmpty = false;
		})
		return isEmpty;
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
					filterType={scheduleEntityType}
					setFilterType={setScheduleEntityType}
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
					<ToggleButton
						value={1}
						sx={{
						}}
					>
						1

					</ToggleButton>
					{/*<Tooltip  leaveDelay={200} value={1}
							  title={
						<FormControlLabel
						sx={{
							m: 0,

						}}
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
						label={'Прошлая неделя'}
						labelPlacement={"start"}
						/>
					}>


					</Tooltip>*/}


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
						label={` ${scheduleEntityType.title}`}
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

			</Box>


			<Grid2 container spacing={{xs: 0, md: 3}} sx={{mx: 0, my: 2}}>
				{filterValue !== null && !isScheduleEmpty() ?  scheduleDays.map((item: IScheduleDay, index: React.Key | null | undefined) => (
					<ScheduleDayTable
						key={index}
						columns={getColumns(scheduleEntityType.title)}
						rows={item}
						isSelected={new Date(item.date * 1000).toLocaleDateString() === new Date().toLocaleDateString()}
						isReplacementEnabled={isReplaceActive}
						filterType={scheduleEntityType}
						maxPairNumber={maxPairsNumber}
						minPairNumber={minPairNumber}
					/>
				)) : null}


				{filterValue !== null && !isScheduleEmpty() && fillDays()}
				{filterValue !== null && isScheduleEmpty() && <h1 style={{
					display: 'flex',
					margin: 'auto',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100%'
				}}>Пар нет!</h1>}


			</Grid2>




		</>
	)
});

export default SchedulePage;


