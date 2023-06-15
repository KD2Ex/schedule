import React, {useContext, useEffect, useState} from 'react';
import {Box, Button, Container, Grid, List, ListItemButton, ListItemText} from "@mui/material";
import Css from './EditSchedulePage.module.css';
import ScheduleDayDataGrid from "../../components/ScheduleDayDataGrid/ScheduleDayDataGrid";
import {getColumns} from "../../utils/stringFormatters";
import {SCHEDULE_ENTITY} from "../../models/enums/SCHEDULE_ENTITY";
import IScheduleDay from "../../models/interfaces/IScheduleDay";
import {fetchSchedule} from "../../api/services/ScheduleService";
import {scheduleTypeConvert} from "../../utils/converters";
import schedule from "../../store/schedule";
import ScheduleDayTable from "../../components/ScheduleDayTable/ScheduleDayTable";
import {ScheduleEntityType} from "../../models/enums/ScheduleEntityType";
import ScheduleEditDialog from "../../components/Dialogs/ScheduleEditDialog/ScheduleEditDialog";
import {ScheduleModalContext} from "../../context";

const EditSchedulePage = () => {

	const [scheduleType, setScheduleType] = useState<SCHEDULE_ENTITY>(SCHEDULE_ENTITY.GROUP);
	const [selectedIndex, setSelectedIndex] = useState<number>(1);

	/*const rows: IScheduleDay = {
		number: 1,
		pairs: [

		]
	}*/

	const {scheduleModalOpen, setScheduleModalOpen, selectedSchedule} = useContext(ScheduleModalContext);


	useEffect(() => {

		(async () => {

		})()

	}, [selectedIndex])

	return (
		<Box>


			<Box sx={{
				display: 'flex',
				justifyContent: 'end'
			}}>
				<Button variant={'contained'}>
					Сохранить и отправить
				</Button>
			</Box>

			<Grid container spacing={2}>
				{schedule.weekSchedule.map(item => (
					<Grid item xs={4}>
						<ScheduleDayTable
							rows={item}
							isSelected={false}
							isReplacementEnabled={false}
							filterType={{value: ScheduleEntityType.GROUP, title: SCHEDULE_ENTITY.GROUP}}
							maxPairNumber={schedule.lastPair}
							minPairNumber={schedule.firstPair}
							clickable
						/>
					</Grid>
				))}
				{schedule.weekSchedule.map(item => (
					<Grid item xs={4}>
						<ScheduleDayTable
							rows={item}
							isSelected={false}
							isReplacementEnabled={false}
							filterType={{value: ScheduleEntityType.GROUP, title: SCHEDULE_ENTITY.GROUP}}
							maxPairNumber={schedule.lastPair}
							minPairNumber={schedule.firstPair}
							clickable
						/>
					</Grid>
				))}
			</Grid>



			<ScheduleEditDialog
				open={scheduleModalOpen}
				setOpen={setScheduleModalOpen}
				scheduleDay={selectedSchedule}
			/>

		</Box>
	);
};

export default EditSchedulePage;