import React, {FC} from 'react';
import {replacedStyle} from "./TableRowsMuiStyles";
import {TableCell, TableRow, Typography} from "@mui/material";
import Css from './TableRowsStyles.module.css'
import TooltippedCell from "../styled/TooltippedCell";

interface RowFirst {
	cells: string[][],
	replaces: boolean[]
}

const ScheduleRowFirst: FC<RowFirst> = ({cells, replaces}) => {
	console.log(cells)


	return (
		<>
			<TableRow
				sx={  (replaces[0] ? {
					...replacedStyle,

				} : null)
			}
			>
				<TableCell
					sx={{
						borderRight: '1px solid rgba(255,255,255,0.2)'
					}}
					rowSpan={2}
				>
					{cells[0][0]}
				</TableCell>
				<TooltippedCell
					sx={{
						py: 0,
						px: 1,
						height: '26.5px'
					}}
				>

					{cells[0][1]}

				</TooltippedCell>
				<TooltippedCell sx={{px: 1, pr:2, py: 0}} >

					{cells[0][2]}

				</TooltippedCell>
				<TooltippedCell sx={{py: 0, px: 1}}>
					{cells[0][3]}
				</TooltippedCell>
			</TableRow>

			<TableRow sx={  (replaces[0] ? {  ...replacedStyle } : {height: '26.5px'}) }>
				<TableCell sx={{py: 0, px: 1, textAlign: 'center'}} >
				</TableCell>
				<TableCell sx={{py:0, }}>
					<Typography sx={{fontStyle: 'italic',  fontSize: '1em'}}>
						Нет занятия
					</Typography>
				</TableCell>
				<TableCell sx={{py:0}}>

				</TableCell>

			</TableRow>

		</>
	);
};

export default ScheduleRowFirst;