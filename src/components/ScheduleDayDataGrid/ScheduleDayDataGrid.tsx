import React, {FC, useEffect} from 'react';
import {DataGrid, GridColumns, GridEnrichedColDef, GridRowsProp, GridValidRowModel} from "@mui/x-data-grid";
import ScheduleDayHeader from "../UI/ScheduleDayHeader/ScheduleDayHeader";
import {Box, Grid} from "@mui/material";
import {observer} from "mobx-react-lite";

interface ScheduleDayDataGridProps {
	isToday: boolean,
	date: Date,
	rows: any,
	columns: GridColumns
}

const ScheduleDayDataGrid: FC<ScheduleDayDataGridProps> = observer(({isToday, date, rows, columns}) => {

	useEffect(() => {
		console.log(rows)
	}, [rows])

	return (
		<>
			<Grid item xs={12} md={6} sx={{  flex: 1}}>

				<ScheduleDayHeader isSelected={isToday} dayNumber={date.getDay()}/>
				{rows &&
					<DataGrid
						hideFooter={true}
						autoHeight
						rows={rows}
						columns={columns}
					>
					</DataGrid>
				}

			</Grid>

		</>

	);
});

export default ScheduleDayDataGrid;