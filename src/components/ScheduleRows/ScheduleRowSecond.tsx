import React, {FC} from 'react';
import {TableCell, TableRow, Typography} from "@mui/material";
import {tableRowStyle} from "./TableRowsMuiStyles";
import Css from './TableRowsStyles.module.css'
import TooltippedCell from "../styled/TooltippedCell";

interface ScheduleRowSecondProps {
	cells: string[][],
	replacings: boolean[];
}

const ScheduleRowSecond: FC<ScheduleRowSecondProps> = ({cells, replacings}) => {
	return (
		<>


			<TableRow sx={  (replacings[0] ? {  ...tableRowStyle } : null) }>

				<TableCell size='small' rowSpan={2}>
					{cells[0][0]}
				</TableCell>
				<TableCell size='small' >
				</TableCell>

				<TableCell size='small' sx={{py:0, height: '26.5px'}}>
					<Typography sx={{fontStyle: 'italic',  fontSize: '1em'}}>
						Нет занятия
					</Typography>
				</TableCell>

				<TableCell size='small'>
				</TableCell>

			</TableRow>

			<TableRow
				sx={  (replacings[0] ? {  ...tableRowStyle } : null) }
			>

				<TooltippedCell component="th" scope="row" sx={{py:0,px: 1, height: '26.5px' }} size='small'>

					{cells[0][1]}

				</TooltippedCell>
				<TooltippedCell component="th" scope="row" sx={{py:0,px: 1, pr:2, py: 0}} size='small'>
					{cells[0][2]}
				</TooltippedCell>
				<TableCell sx={{py:0,px: 1}} size='small'>
					{cells[0][3]}
				</TableCell>
			</TableRow>

		</>
	);
};

export default ScheduleRowSecond;