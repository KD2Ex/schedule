import React, {FC} from 'react';
import {TableCell, TableRow} from "@mui/material";
import {tableRowStyle} from "./TableRowsMuiStyles";
import Css from './TableRowsStyles.module.css'
import TooltippedCell from "../styled/TooltippedCell";

interface ScheduleRowDoubleProps {
	cells: string[][],
	replacings: boolean[],
}

const ScheduleRowDouble: FC<ScheduleRowDoubleProps> = ({cells, replacings}) => {
	return (
		<>
			<TableRow
				sx={  (replacings[0] ? {  ...tableRowStyle } : null)}
			>
				<TableCell sx={{p: 1, py: 0, textAlign: 'center', }} rowSpan={2}>
					{cells[0][0]}
				</TableCell>
				<TooltippedCell component="th" scope="row"   sx={{ py: 0, px: 1, height: '26.5px'}} size='small'>
					{cells[0][1]}
				</TooltippedCell>
				<TooltippedCell component="th" scope="row"  sx={{py: 0, px: 1}} size='small'>
					{cells[0][2]}
				</TooltippedCell>
				<TableCell  sx={{ py: 0, px: 1}} size='small'>
					{cells[0][3]}
				</TableCell>
			</TableRow>


			<TableRow
				sx={  (replacings[1] ? {  ...tableRowStyle } : null)}
			>

				<TooltippedCell component="th" scope="row"   sx={{py: 0, px: 1}}>

					{cells[1][0]}

				</TooltippedCell>
				<TooltippedCell sx={{ py: 0, px: 1, height: '26.5px'}} size='small'>

					{cells[1][1]}

				</TooltippedCell>
				<TooltippedCell  sx={{ py: 0, px:1}} size='small'>
					{cells[1][2]}
				</TooltippedCell>

			</TableRow>

		</>
	);
};

export default ScheduleRowDouble;