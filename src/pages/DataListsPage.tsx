import React, {useEffect, useState} from 'react';
import {
	DataGrid,
	GridCellEditCommitParams,
	GridCellEditStopParams,
	GridColDef,
	GridRowModel,
	GridValidRowModel
} from "@mui/x-data-grid";
import {Box} from "@mui/material";
import TypeButtons from "../components/TypeButtons";
import {FILTER_TYPES} from "../models/enums/FilterType";
import {observer} from "mobx-react-lite";
import group from "../store/group";
import rooms from "../store/rooms";
import teacher from "../store/teacher";
import {formatTeacherFullName, getGroupLabel} from "../utils/stringFormatters";
import {createLogger} from "vite";

const DataListsPage = observer( () => {

	const [filterType, setFilterType] = useState<FILTER_TYPES>(FILTER_TYPES.GROUPS);
	const [filterOptions, setFilterOptions] = useState<string[]>([]);
	const [filterValue, setFilterValue] = useState<string>('');
	const [open, setOpen] = useState<boolean>(false);
	const loading = open && filterOptions?.length === 0;

	const [rows, setRows] = useState<any>(group.groups);
	const [columns, setColumns] = useState<any>([]);

	const groupsColumns:  GridColDef[] = [
		{ field: 'groupNumber', headerName: 'Номер группы', flex: 1 },
		{ field: 'spec', headerName: 'Специальность', flex: 2, editable: true},
		{ field: 'course', headerName: 'Курс', flex: 1},
		{ field: 'label', headerName: 'Шифр', flex: 1, valueGetter: getGroupLabel},
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
		{ field: 'label', headerName: 'Тест', flex: 2, editable: true, valueGetter: formatTeacherFullName},
	];


	useEffect(() => {


		( async () => {
			switch (filterType) {
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
		} }
		)()

		console.log('effect')

	}, [filterType])

/*
	const saveChanges = (params: GridCellEditStopParams, event: MuiEvent) => {
		console.log(params.value);
		console.log(event);
	}*/


	const processRowUpdate = (params: GridCellEditCommitParams, ) => {

		const newObj = {...params.row, [`${params.field}`]: params.value }
		console.log(newObj)

		switch (filterType) {
			case FILTER_TYPES.GROUPS: {
				group.editGroup(newObj)
				break;
			}
		}
	}

	const saveChanges = (newRow: GridValidRowModel, oldRow: GridValidRowModel) => {
		console.log(newRow);
		console.log(oldRow);

		console.log('hi')
	}
	return (
		<Box>

			<TypeButtons
				filterType={filterType}
				setFilterType={setFilterType}
				exclusive
				size='small'
			/>

			<Box sx={{height: '400px', py: '1rem', flex: 1}}>

				<DataGrid
					columns={columns}
					rows={rows}
					//onCellEditStop={processRowUpdate}
					onCellEditCommit={processRowUpdate}
					//processRowUpdate={processRowUpdate}

				/>
			</Box>

		</Box>
	);
});

export default DataListsPage;