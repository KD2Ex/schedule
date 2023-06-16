import React, {useContext, useEffect, useRef, useState} from 'react';
import {Box, Button, Grid} from "@mui/material";
import {SCHEDULE_ENTITY} from "../../models/enums/SCHEDULE_ENTITY";
import ScheduleEditDialog from "../../components/Dialogs/ScheduleEditDialog/ScheduleEditDialog";
import {ScheduleModalContext} from "../../context";
import ScheduleDatePicker from "../../components/ScheduleDatePicker/ScheduleDatePicker";
import dayjs from "dayjs";
import 'filepond/dist/filepond.min.css';
import {FilePond} from 'react-filepond';
import './EditSchedulePage.css'
import ScheduleService from "../../api/services/ScheduleService";
import schedule from "../../store/schedule";
import ScheduleDayTable from "../../components/ScheduleDayTable/ScheduleDayTable";
import {ScheduleEntityType} from "../../models/enums/ScheduleEntityType";
import {observer} from "mobx-react-lite";
import LoadedSchedule from "../../components/LoadedSchedule/LoadedSchedule";

/*export const loader = async () => {
	await ScheduleService.fetchSavedSchedule();
	return null;
}*/

const EditSchedulePage = observer(() => {

	const [scheduleType, setScheduleType] = useState<SCHEDULE_ENTITY>(SCHEDULE_ENTITY.GROUP);
	const [selectedIndex, setSelectedIndex] = useState<number>(1);
	const [files, setFiles] = useState([]);
	const [date, setDate] = useState(dayjs())



	const filePond = useRef(null);

	useEffect(() => {



		/*(async () => {

		})()*/

	}, [selectedIndex])

	console.log('editPage')

	useEffect(() => {

		(async () => {
			console.log('date changed')
			const localeDate = date.toISOString().split('T')[0]

			await schedule.fetchSavedSchedule(localeDate);

			console.log(schedule.newSchedule)

		})()

	}, [date])

	useEffect(() => {



		// @ts-ignore
		console.log(filePond.current._pond.setOptions({
			server: {
				url: 'https://kkep.su/api2/schedule/update',
				// @ts-ignore
				process: async (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
					const formData = new FormData();
					formData.append('file', file);
					formData.append('date', date.toISOString().split('T')[0]);
					console.log(formData.entries())
					console.log(date.toISOString())
					console.log(formData);
					console.log(await ScheduleService.updateSchedule(formData)
						.then(response => {
							load(response.data)
						}))
					console.log('process')
					setFiles([file])


				}
			}
		}))
	}, [date])


	return (
		<Box>

			<ScheduleDatePicker
				date={date}
				setDate={setDate}
			/>

			<FilePond
				files={files}
				allowMultiple={false}
				onupdatefiles={setFiles}
				ref={filePond}
			/>


			<Box sx={{
				display: 'flex',
				justifyContent: 'end'
			}}>
				<Button variant={'contained'}>
					Сохранить и отправить
				</Button>
			</Box>

			<LoadedSchedule newSchedule={schedule.newSchedule}/>




		</Box>
	);
});

export default EditSchedulePage;