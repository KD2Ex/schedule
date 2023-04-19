import React, {FC} from 'react';
import {tableRowStyle} from "./TableRowsMuiStyles";
import {TableCell, TableRow, Typography} from "@mui/material";
import Css from './TableRowsStyles.module.css'
import TooltippedCell from "../styled/TooltippedCell";

interface ScheduleRowFirst {
	cells: string[][],
	replacings: boolean[]
}

const ScheduleRowFirst: FC<ScheduleRowFirst> = ({cells, replacings}) => {
	return (
		<>
			<TableRow
				sx={  (replacings[0] ? {  ...tableRowStyle } : null) }
			>
				<TableCell sx={{py: 0, px: 1, textAlign: 'center'}} rowSpan={2}>
					{cells[0][0]}
				</TableCell>
				<TooltippedCell component="th" scope="row" sx={{py: 0, px: 1, height: '26.5px' }} size='small'>

					{cells[0][1]}

				</TooltippedCell>
				<TooltippedCell component="th" scope="row" sx={{px: 1, pr:2, py: 0}} size='small'>

					{cells[0][2]}

				</TooltippedCell>
				<TooltippedCell sx={{py: 0, px: 1}} size='small'>
					{cells[0][3]}
				</TooltippedCell>
			</TableRow>

			<TableRow sx={  (replacings[0] ? {  ...tableRowStyle } : null) }>
				<TableCell component="th" scope='row' sx={{py: 0, px: 1, textAlign: 'center'}} >
				</TableCell>
				<TableCell size='small' sx={{py:0, height: '26.5px'}}>
					<Typography sx={{fontStyle: 'italic',  fontSize: '1em'}}>
						Нет занятия
					</Typography>
				</TableCell>
				<TableCell size='small' sx={{py:0}}>

				</TableCell>

			</TableRow>

		</>
	);
};

export default ScheduleRowFirst;