import React, {useEffect, useState} from 'react';
import {Box, Button, Container, Grid, List, ListItemButton, ListItemText} from "@mui/material";
import Css from './EditSchedulePage.module.css';
import ScheduleDayDataGrid from "../../components/ScheduleDayDataGrid/ScheduleDayDataGrid";
import {getColumns} from "../../utils/stringFormatters";
import {SCHEDULE_ENTITY} from "../../models/enums/SCHEDULE_ENTITY";
import IScheduleDay from "../../models/interfaces/IScheduleDay";
import {fetchSchedule} from "../../api/services/ScheduleService";
import {scheduleTypeConvert} from "../../utils/converters";

const EditSchedulePage = () => {

	const [scheduleType, setScheduleType] = useState<SCHEDULE_ENTITY>(SCHEDULE_ENTITY.GROUP);
	const [selectedIndex, setSelectedIndex] = useState<number>(1);
	const [schedule, setSchedule] = useState<IScheduleDay[]>([])

	const rows: IScheduleDay = {
		number: 1,
		pairs: [

		]
	}

	useEffect(() => {

		(async () => {
			(async () => {
				const newSchedule = await fetchSchedule(1, true, scheduleTypeConvert(scheduleType), selectedIndex);
				setSchedule(newSchedule);
			})();
		})()

	}, [selectedIndex])

	return (
		<Box>

			<Container className={Css.topMenuContainer}>

				<Button variant={"outlined"}>
					Загрузить расписание из файла
				</Button>
				<Button variant={"outlined"}>
					Загрузить стандартное расписание
				</Button>

			</Container>

			<Grid container sx={{border: '1px solid white'}}>

				<Grid item xs={4}>

					<List>
						<ListItemButton >
							<ListItemText primary={"Group"}/>
						</ListItemButton>
					</List>

				</Grid>

				<Grid item xs={8}>
					<ScheduleDayDataGrid isToday={true} date={new Date()} rows={schedule[0]} columns={getColumns(scheduleType)} />
				</Grid>

			</Grid>

		</Box>
	);
};

export default EditSchedulePage;