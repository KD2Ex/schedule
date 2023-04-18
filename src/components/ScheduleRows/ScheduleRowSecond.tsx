import React, {FC} from 'react';
import {TableCell, TableRow, Typography} from "@mui/material";
import {tableRowStyle} from "./TableRowsMuiStyles";
import Css from './TableRowsStyles.module.css'

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

				<TableCell size='small' sx={{py:0}}>
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

				<TableCell component="th" scope="row" sx={{px: 1 }} size='small'>
					<div className={Css.textContainer}>
						{cells[0][1]}
					</div>
				</TableCell>
				<TableCell component="th" scope="row" sx={{px: 1, pr:2, py: 0}} size='small'>
					<div className={Css.textContainer}>
						{cells[0][2]}
					</div>

				</TableCell>
				<TableCell sx={{px: 1}} size='small'>
					{cells[0][3]}
				</TableCell>
			</TableRow>

		</>
	);
};

export default ScheduleRowSecond;