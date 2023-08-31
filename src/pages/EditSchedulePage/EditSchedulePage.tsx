import React, {useContext, useEffect, useRef, useState} from 'react';
import {Box, Button, Grid, Typography} from "@mui/material";
import {SCHEDULE_ENTITY} from "../../models/enums/SCHEDULE_ENTITY";
import ScheduleEditDialog from "../../components/Dialogs/ScheduleEditDialog/ScheduleEditDialog";
import {ScheduleModalContext} from "../../context";
import ScheduleDatePicker from "../../components/ScheduleDatePicker/ScheduleDatePicker";
import dayjs, {Dayjs} from "dayjs";
import '../../components/ScheduleFileLoader/ScheduleFileLoader.css'
import ScheduleService from "../../api/services/ScheduleService";
import schedule from "../../store/schedule";
import ScheduleDayTable from "../../components/ScheduleDayTable/ScheduleDayTable";
import {ScheduleEntityType} from "../../models/enums/ScheduleEntityType";
import {observer} from "mobx-react-lite";
import LoadedSchedule from "../../components/LoadedSchedule/LoadedSchedule";
import ScheduleFileLoader from "../../components/ScheduleFileLoader/ScheduleFileLoader";
import {HashLink} from 'react-router-hash-link'
import {Link} from "react-router-dom";
import Bookmarks from "../../components/Bookmarks/Bookmarks";

/*export const loader = async () => {
	await ScheduleService.fetchSavedSchedule();
	return null;
}*/

const EditSchedulePage = observer(() => {

	const [scheduleType, setScheduleType] = useState<SCHEDULE_ENTITY>(SCHEDULE_ENTITY.GROUP);
	const [selectedIndex, setSelectedIndex] = useState<number>(1);
	const [date, setDate] = useState(dayjs())

	const handleHover = () => {

	}

	useEffect(() => {

		/*(async () => {

		})()*/

	}, [selectedIndex])

	console.log('editPage')

	useEffect(() => {

		(async () => {
			console.log('date changed')
			const localeDate = date.toISOString().split('T')[0]
			schedule.setEditDate(date)

			await schedule.fetchSavedSchedule(localeDate);

			console.log(schedule.newSchedule)

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


			{schedule.newSchedule.type !== 'NONE' && <Box sx={{
				display: 'flex',
				justifyContent: 'end'
			}}>
				<Button variant={'contained'}>
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
						top: 0,
						overflow: 'hidden',
					}}
				>
					{schedule.editedSchedules.map(item => (
						<Bookmarks item={item}/>
					))}
				</Box>

				<LoadedSchedule newSchedule={schedule.newSchedule}/>

			</Box>
		</Box>
	);
});

export default EditSchedulePage;