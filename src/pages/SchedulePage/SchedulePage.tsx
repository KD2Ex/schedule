import React, {useEffect, useState} from 'react'
import {
	Autocomplete, Box, Button, Checkbox, FormControlLabel, FormGroup, Skeleton, Switch, TextField, ToggleButton,
	ToggleButtonGroup, Tooltip, Typography
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import ScheduleDayTable from '../../components/ScheduleDayTable/ScheduleDayTable';
import {observer} from "mobx-react-lite";
import {SCHEDULE_ENTITY} from '../../models/enums/SCHEDULE_ENTITY'
import TypeButtons from "../../components/TypeButtons";
import {ScheduleEntityType} from "../../models/enums/ScheduleEntityType";
import IScheduleDay from "../../models/interfaces/IScheduleDay";
import {AutocompleteOption} from "../../models/interfaces/IAutocompleteOption";
import schedule from "../../store/schedule";
import {IScheduleEntity} from "../../models/interfaces/IScheduleEntity";
import switchFetching from "../../utils/switchFetching";
import ScheduleFilter from '../../components/ScheduleFilter/ScheduleFilter';
import { fillDays } from '../../utils/fillDays';
import ScheduleSkeleton from "../../components/ScheduleSkeleton/ScheduleSkeleton";
import {weekDays} from "../../models/consts/weekDays";
import {WeekTooltip} from "../../components/styled/WeekTooltip";
import { ScheduleTooltip } from '../../components/styled/TooltippedCell';
import {WhiteSwitch} from "../../components/styled/StyledSwitch";
import TooltipToggleButton from "../../components/TooltipToggleButton/TooltipToggleButton";


export const loader = async () => {
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
				console.log(ISODate)
				console.log(await schedule.fetchSchedule(
					ISODate,
					isReplaceActive,
					filterType.value,
					filterValue.id))
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

			if (schedule.currentData === null) {
				await schedule.fetchCurrentData().catch((error) => {
					console.log('err: ' + error)
				});
			}

			schedule.setIsLoading(false);

			console.log(schedule.currentData)

			
			if (schedule.currentData.type) {
				setScheduleEntityType({value: schedule.currentData.type, title: SCHEDULE_ENTITY[schedule.currentData.type]});
				let entity = await switchFetching(schedule.currentData.type);
				setFilterValue({label: entity.find((item) => item.id === schedule.currentData.entityId)?.fullName, id: schedule.currentData.entityId} as AutocompleteOption)

			}


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
		setIsPrevWeek(false)
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


				<WeekTooltip
					leaveDelay={200}
					title={
						<FormControlLabel

							control={
								<WhiteSwitch
									checked={isPrevWeek}
									disabled={!isReplaceActive}
									onChange={handlePrevWeek}

								/>
							}
							label={'Прошлая неделя'}
							labelPlacement={"start"}
						/>
					}
				>


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



						<ToggleButton
							value={1}
							sx={{
								p: 2,
								height: '8px',
								borderBottom: (theme) =>
									currentWeek === 1 && `1px solid ${theme.palette.primary.main}`
							}}
						>

							<span>1</span>


						</ToggleButton>

						<ToggleButton
							value={2}
						>
							2
						</ToggleButton>


					</ToggleButtonGroup>
				</WeekTooltip>


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


			<Grid2
				container
				spacing={{xs: 0, md: 3}}
				sx={{mx: 0, my: 1}}>

				{
					/*schedule.error &&
					<Button

						sx={{
							display: 'flex',
							margin: 'auto',
							p: 1,
							bgcolor: (theme) => theme.palette.secondary.error,
							borderRadius: 2,
							minWidth: '50%',
							alignItems: 'center',
							justifyContent: 'center',
							'&:hover': {
								backgroundColor: 'rgb(255,60,60)'
							}
						}}
					>

                        <Typography
							variant={'h6'}
						>
							{schedule.error.message}. Нажмите чтобы перезагрузить
                        </Typography>
					</Button>*/

				}

				{
					!schedule.isLoading
						? filterValue !== null
						&& !isScheduleEmpty()
					? schedule.weekSchedule.map((item: IScheduleDay, index: React.Key | null | undefined) => (
						<Grid2 key={index} xs={12} md={6} lg={4} sx={{borderRadius: 1, mb: {xs: 2, md: 0}}} >
							<ScheduleDayTable

								header={
									`
									${weekDays[new Date(item.date).getDay() - 1]} 
									${isReplaceActive ? new Date(item.date).toLocaleDateString() : ''}
									`
								}
								rows={item.pairs}
								isSelected={item.date === new Date().toISOString().split('T')[0] && isReplaceActive}
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
						: [1,2,3,4,5,6].map((item, index) => (
							<Grid2 key={item} xs={12} md={6} lg={4} sx={{borderRadius: 1, mb: {xs: 2, md: 0}}} >
								<ScheduleSkeleton/>
							</Grid2>
						))
					}



				{filterValue !== null && !isScheduleEmpty() && fillDays()}

			</Grid2>

		</>
	)
});

export default SchedulePage;


