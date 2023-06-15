import React, {useEffect, useState} from 'react'
import {
	Autocomplete, Box, Checkbox, FormControlLabel, FormGroup, Skeleton, Switch, TextField, ToggleButton,
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
import ScheduleFilter from '../../components/ScheduleFilter/ScheduleFilter';
import { emptyDay } from './data';
import { fillDays } from '../../utils/fillDays';
import ScheduleSkeleton from "../../components/ScheduleSkeleton/ScheduleSkeleton";


export const loader = async () => {
	console.log('loader')
	return null
}

const SchedulePage = observer(() => {

	const [week, setWeek] = useState(2);
	const [currentWeek, setCurrentWeek] = useState(1);
	const [isReplaceActive, setIsReplaceActive] = useState(true);
	const [filterValue, setFilterValue] = useState<AutocompleteOption | null>(null);
	const [filterType, setScheduleEntityType] = useState<IScheduleEntity>(
		{value: ScheduleEntityType.TEACHER, title: SCHEDULE_ENTITY.TEACHER}
	);
	const [isPrevWeek, setIsPrevWeek] = useState(false);

	const date = new Date();
	const currentDay = date.getDay() - 1;

	useEffect(() => {
		schedule.setIsLoading(false);


		if (filterValue !== null) {

			(async () => {
				//setIsScheduleLoading(true);

				const ISODate = schedule.getDate(isPrevWeek ? 0 : week)
				await schedule.fetchSchedule(
					ISODate,
					isReplaceActive,
					filterType.value,
					filterValue.id)
				//setIsScheduleLoading(false);
				schedule.setIsLoading(false);


			})();
		} else {
			
			schedule.clearSchedule();
			
		}

	}, [filterValue, week, isPrevWeek])


	useEffect(() => {


		(async () => {
			//setIsScheduleLoading(true);
			await schedule.fetchCurrentData();
			console.log('mount')
			schedule.setIsLoading(false);

			console.log(schedule.currentData)

			
			if (schedule.currentData.type) {
				setScheduleEntityType({value: schedule.currentData.type, title: SCHEDULE_ENTITY[schedule.currentData.type]});
			}


			let entity = await switchFetching(schedule.currentData.type);

			setFilterValue({label: entity.find((item) => item.id === schedule.currentData.entityId)?.fullName, id: schedule.currentData.entityId} as AutocompleteOption)
			setWeek(schedule.currentData.firstWeek ? 1 : 2);
			setCurrentWeek(schedule.currentData.firstWeek ? 1 : 2)
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


	const isScheduleEmpty = () => {
		let isEmpty = true;
		schedule.weekSchedule.map((item) => {
			if (item.pairs.length !== 0) isEmpty = false;
		})
		return isEmpty;
	}

	console.log('render')

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
					sx={{
						'&>:nth-child(n + 2)': {
							fontWeight: 400
						},

					}}
				>
					<ToggleButton
						value="Неделя"
						disabled>
						Неделя
					</ToggleButton>
{/*					<ToggleButton
						value={3}
					>
						Предыдущая
					</ToggleButton>*/}

					<Tooltip  leaveDelay={200} value={1}
							  title={
								  <FormControlLabel
									  sx={{
										  m: 0,

									  }}
									  control={
										  <Switch
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

						<ToggleButton
							value={1}
							sx={{
								borderBottom: (theme) =>
									currentWeek === 1 && `1px solid ${theme.palette.primary.main}`
							}}
						>
							1
						</ToggleButton>
					</Tooltip>
					<ToggleButton value={2}>
						2
					</ToggleButton>


				</ToggleButtonGroup>

				<ScheduleFilter
					filterValue={filterValue}
					setFilterValue={setFilterValue}
					filterType={filterType}
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

{/*
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
                />*/}

			</Box>


			<Grid2 container spacing={{xs: 0, md: 3}} sx={{mx: 0, my: 2}}>


			{/*	{isScheduleLoading && [1,2,3,4,5,6].map(item => (
					<Grid2 xs={12} md={6} lg={4} sx={{borderRadius: 1, mb: {xs: 2, md: 0}}} >
						<ScheduleSkeleton/>
					</Grid2>
				))}*/}

				{
					!schedule.isLoading
						? filterValue !== null
						&& !isScheduleEmpty()
					? schedule.weekSchedule.map((item: IScheduleDay, index: React.Key | null | undefined) => (
						<Grid2 xs={12} md={6} lg={4} sx={{borderRadius: 1, mb: {xs: 2, md: 0}}} >
							<ScheduleDayTable
								key={index}
								rows={item}
								isSelected={new Date(item.date * 1000).toLocaleDateString() === new Date().toLocaleDateString()}
								isReplacementEnabled={isReplaceActive}
								filterType={filterType}
								maxPairNumber={schedule.lastPair}
								minPairNumber={schedule.firstPair}
							/>
						</Grid2>
					)) : filterValue !== null && !schedule.isLoading && <h1 style={{
								display: 'flex',
								margin: 'auto',
								alignItems: 'center',
								justifyContent: 'center',
								height: '100%'
							}}>Пар нет!</h1>
						: [1,2,3,4,5,6].map(item => (
							<Grid2 xs={12} md={6} lg={4} sx={{borderRadius: 1, mb: {xs: 2, md: 0}}} >
								<ScheduleSkeleton/>
							</Grid2>
						))
					}



				{filterValue !== null && !isScheduleEmpty() && fillDays()}
			{/*	{filterValue !== null && isScheduleEmpty() && !isScheduleLoading && <h1 style={{
					display: 'flex',
					margin: 'auto',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100%'
				}}>Пар нет!</h1>}
*/}

			</Grid2>

		</>
	)
});

export default SchedulePage;


