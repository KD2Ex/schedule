import React, {useContext, useEffect, useRef, useState} from 'react';
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import {SCHEDULE_ENTITY} from "../../models/enums/SCHEDULE_ENTITY";
import ScheduleDatePicker from "../../components/ScheduleDatePicker/ScheduleDatePicker";
import '../../components/ScheduleFileLoader/ScheduleFileLoader.css'
import schedule from "../../store/schedule";
import {observer} from "mobx-react-lite";
import LoadedSchedule from "../../components/LoadedSchedule/LoadedSchedule";
import ScheduleFileLoader from "../../components/ScheduleFileLoader/ScheduleFileLoader";
import Bookmarks from "../../components/Bookmarks/Bookmarks";
import PromptDialog from "../../components/PromptDialog/PromptDialog";
import dayjs from "dayjs";

/*export const loader = async () => {
	await ScheduleService.fetchSavedSchedule();
	return null;
}*/

const EditSchedulePage = observer(() => {

	const [scheduleType, setScheduleType] = useState<SCHEDULE_ENTITY>(SCHEDULE_ENTITY.GROUP);
	const [selectedIndex, setSelectedIndex] = useState<number>(1);
	const [save, setSave] = useState(false);
	const [open, setOpen] = useState(false)
	const [date, setDate] = useState()


	const handleSave = async () => {
		console.log('save is pending')
		console.log(date.toISOString())
		await schedule.saveSchedule(date.toISOString().split('T')[0], schedule.newSchedule.hideLessons);
		setSave(false)
	}

	const handleClose = (value: boolean) => {
		setOpen(false)
		setSave(value);
	}

	const handleOpen = () => {
		setOpen(true);
	}

	useEffect(() => {

		/*(async () => {

		})()*/

	}, [selectedIndex])

	useEffect(() => {

		(async () => {
			if (save) {
				await handleSave();
			}

		})()

	}, [save])

	console.log('editPage')

	useEffect(() => {

		(async () => {
			if (date) {
				console.log('date changed')


				const newDate = dayjs(date).hour(12)
				const localeDate = newDate.toISOString().split('T')[0]
				schedule.setEditDate(date)
				console.log(localeDate)
				await schedule.fetchSavedSchedule(localeDate);

				console.log(schedule.newSchedule)

				/*schedule.newSchedule.lessons.sort((a, b) => {
					return Number(a[0].lessons[0].group.split(/[а-я]/ig)[0])
					- Number(b[0].lessons[0].group.split(/[а-я]/ig)[0])
				})*/
			}

		})()

	}, [date])

	useEffect(() => {

		console.log(schedule.newSchedule)

		return () => {
			console.log('unmount')
			schedule.clearNewSchedule();
		}
	}, [])



	return (
		<Box>

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 1
				}}
			>

				<Typography
					variant={'h4'}
					sx={{
						fontWeight: 'bold'
					}}
				>
					Редактирование расписания
				</Typography>
				<Typography
					sx={{
						mb: 2
					}}
				>
					Выберите дату, а затем загрузите файл с расписанием в формате .xls <br/>
					После проверки и скрытия пар нажмите кнопку"Сохранить и отправить" для загрзки расписания в общий доступ
				</Typography>

				<ScheduleDatePicker
					date={date}
					setDate={setDate}
				/>


				{date
					? <ScheduleFileLoader
						date={date}
					/>
					: null
				}

			</Box>


			{schedule.newSchedule.type !== 'NONE' && date && <Box sx={{
				display: 'flex',
				justifyContent: 'end'
			}}>
				<Button
					variant={'outlined'}
					onClick={handleOpen}
				>
					Сохранить и отправить
				</Button>
			</Box>}

			<Box
				sx={{
					display: 'flex',
					height: '100%',
					gap: 1,
					transition: '1s'
				}}
			>
				<Box
					sx={{
						position: 'sticky',
						height: '100%',
						top: '100px',
						overflow: 'hidden',

					}}
				>
					{schedule.editedSchedules.map((item, index) => (
						<Bookmarks item={item} key={index} />
					))}
				</Box>

				<LoadedSchedule newSchedule={schedule.newSchedule}/>

			</Box>

			<PromptDialog
				open={open}
				onClose={handleClose}
			/>

		</Box>
	);
});

export default EditSchedulePage;