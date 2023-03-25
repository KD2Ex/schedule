import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Grid} from "@mui/material";
import teacher from "../../store/teacher";
import ScheduleDayDataGrid from "../../components/ScheduleDayDataGrid/ScheduleDayDataGrid";
import {GridColumns} from "@mui/x-data-grid";
import schedule from "../../store/schedule";
import subject from "../../store/subject";
import rooms from "../../store/rooms";
import moment from "moment";

const ScheduleEditPage = observer(() => {


	useEffect(() => {

		(async function f() {
			if (teacher.teachers.length === 0) {
				await teacher.fetchTeachers();
				console.log(teacher.getTeachersHeaders());
			}

			await subject.fetchSubjects();
			await schedule.fetchWeekSchedule();
			await rooms.fetchRooms();
			console.log(schedule.weekSchedule[0])

		})()



	}, [])


	const columns: GridColumns = [
		{
			field: 'subjNumber',
			headerName: 'Пара',
			flex: 1,
		},
		{
			field: 'teacher',
			headerName: 'Преподаватель',
			flex: 2,
			type: 'singleSelect',
			valueOptions: [...teacher.getTeachersHeaders()],
			editable: true
		},
		{
			field: 'subject',
			headerName: 'Предмет',
			flex: 3,
			type: 'singleSelect',
			valueOptions: [...subject.getSubjectsNames()],
			editable: true
		},
		{
			field: 'room',
			headerName: 'Аудитории',
			flex: 1,
			type: 'singleSelect',
			valueOptions: [...rooms.getRoomsNumbers()],
			editable: true,
		},
		{
			field: 'replacementDate',
			headerName: 'Замена',
			flex: 2,
			editable: true,
			renderCell: params => moment(params.row.replacementDate).format('DD.MM.YYYY')
		},
	].map(column => ({...column, sortable: false}))

	return (
		<>
			Выберите тип

			<Grid container spacing={2}>

				{schedule.weekSchedule.map(item =>
					<ScheduleDayDataGrid isToday={false} date={new Date()} rows={item} columns={columns}/>
				)}
			</Grid>



			<Button variant={'outlined'}>
				Загрузить файл с расписанием
			</Button>
		</>
	);
});

export default ScheduleEditPage;