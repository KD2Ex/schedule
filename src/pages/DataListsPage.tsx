import React, {useEffect, useState} from 'react';
import {
	DataGrid,
	GridCellEditStopParams,
	GridColDef,
	GridRowModel, GridValidRowModel,
	GridValueGetterParams,
	MuiEvent
} from "@mui/x-data-grid";
import {Box} from "@mui/material";
import TypeButtons from "../components/TypeButtons";
import toggleStyles from "../styles/toggleButtons.module.css";
import {FILTER_TYPES} from "../models/enums/FilterType";
import {observer} from "mobx-react-lite";
import group from "../store/group";
import {IGroup} from "../models/IGroup";
import rooms from "../store/rooms";
import teacher from "../store/teacher";

const DataListsPage = observer( () => {

	const [filterType, setFilterType] = useState<FILTER_TYPES>(FILTER_TYPES.GROUPS);
	const [filterOptions, setFilterOptions] = useState<string[]>([]);
	const [filterValue, setFilterValue] = useState<string>('');
	const [open, setOpen] = useState<boolean>(false);
	const loading = open && filterOptions?.length === 0;

	const [rows, setRows] = useState<any>(group.groups);
	const [columns, setColumns] = useState<any>([]);

	const getGroupLabel = (params: GridValueGetterParams) => {
		return `${params.row.number || ''}-Д9-${params.row.course}${params.row.spec}`
	}

	const groupsColumns:  GridColDef[] = [
		{ field: 'groupNumber', headerName: 'Номер группы', flex: 1 },
		{ field: 'spec', headerName: 'Специальность', flex: 2, editable: true},
		{ field: 'course', headerName: 'Курс', flex: 1},
		{ field: 'label', headerName: 'Шифр', flex: 1},
	];

	const roomsColumns:  GridColDef[] = [
		{ field: 'id', headerName: 'ID', flex: 1 },
		{ field: 'number', headerName: 'Номер аудитории', flex: 2, editable: true},
	];

	const teachersColumns:  GridColDef[] = [
		{ field: 'id', headerName: 'ID', flex: 1 },
		{ field: 'lastName', headerName: 'Фамилия', flex: 2, editable: true},
		{ field: 'firstName', headerName: 'Имя', flex: 2, editable: true},
		{ field: 'surname', headerName: 'Отчество', flex: 2, editable: true},
		{ field: 'label', headerName: 'Тест', flex: 2, editable: true},
	];



	useEffect(() => {


		( async () => { switch (filterType) {
			case FILTER_TYPES.GROUPS: {
				await group.fetchGroups();

				setColumns(groupsColumns)
				setRows(group.groups)
				break;
			}
			case FILTER_TYPES.ROOMS: {
				await rooms.fetchRooms();

				setColumns(roomsColumns)
				setRows(rooms.rooms)
				break;
			}
			case FILTER_TYPES.TEACHERS: {
				await teacher.fetchTeachers();

				setColumns(teachersColumns)
				setRows(teacher.teachers)
				break;
			}
		} } )()

	}, [filterType])

/*
	const saveChanges = (params: GridCellEditStopParams, event: MuiEvent) => {
		console.log(params.value);
		console.log(event);
	}*/


	const saveChanges = (newRow: GridValidRowModel, oldRow: GridValidRowModel) => {
		console.log(newRow);
		console.log(oldRow);

		console.log('hi')
		return new Promise();
	}
	return (
		<Box>

			<TypeButtons
				filterType={filterType}
				setFilterType={setFilterType}
				exclusive
				size='small'
				className={toggleStyles.toggleButton}
			/>

			<Box sx={{height: '400px', py: '1rem', flex: 1}}>

				<DataGrid
					columns={columns}
					rows={rows}
					//onCellEditStop={saveChanges}
					processRowUpdate={saveChanges}
					/>
			</Box>

		</Box>
	);
});

export default DataListsPage;