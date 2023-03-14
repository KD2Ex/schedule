import React from 'react';
import {DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import {Box} from "@mui/material";

const DataListsPage = () => {

	const getGroupLabel = (params: GridValueGetterParams) => {
		return `${params.row.number || ''}-Д9-${params.row.course}${params.row.spec}`
	}

	const groupsColumns:  GridColDef[] = [
		{ field: 'number', headerName: 'Номер группы', flex: 1},
		{ field: 'spec', headerName: 'Специальность', flex: 2},
		{ field: 'course', headerName: 'Курс', flex: 1},
		{ field: 'label', headerName: 'Шифр', flex: 1, valueGetter: getGroupLabel},
	];

	const groupsRows = [
		{id: 1, number: '4', spec: 'ИСП', course: '4'},
		{id: 2, number: '4', spec: 'ИСП', course: '4'},
		{id: 3, number: '4', spec: 'ИСП', course: '4'},
		{id: 4, number: '4', spec: 'ИСП', course: '4'},
		{id: 5, number: '4', spec: 'ИСП', course: '4'},
	]

	return (
		<Box>

			<Box sx={{height: '400px',py: '1rem', flex: 1}}>

				<DataGrid
					columns={groupsColumns}
					rows={groupsRows}
					/>
			</Box>

		</Box>
	);
};

export default DataListsPage;