import React, {FC, useEffect} from 'react';
import {TableCell, TableRow, Typography} from "@mui/material";
import {replacedStyle} from "./TableRowsMuiStyles";
import Css from './TableRowsStyles.module.css'
import TooltippedCell from "../styled/TooltippedCell";

interface ScheduleRowSecondProps {
	cells: string[][],
	replacings: boolean[];
}

const RowSecond: FC<ScheduleRowSecondProps> = ({cells, replacings}) => {

	useEffect(() => {
		console.log(cells)
	}, [])

	return (
		<>
			<TableRow sx={  (replacings[0] ? {  ...replacedStyle } : null) }>

				<TableCell size='small' rowSpan={2}>
					{cells[0][0]}
				</TableCell>
				<TableCell size='small' >
				</TableCell>

				<TableCell size='small' sx={{py:0, height: '26.5px'}}>
					<Typography sx={{fontStyle: 'italic',  fontSize: '1em'}}>
						Нет занятия1
					</Typography>
				</TableCell>

				<TableCell size='small'>
				</TableCell>

			</TableRow>

			<TableRow
				sx={  (replacings[1] ? {  ...replacedStyle } : null) }
			>

				<TooltippedCell sx={{py:0,px: 1, height: '26.5px' }} size='small'>

					{cells[0][1]}

				</TooltippedCell>
				<TooltippedCell  sx={{py:0,px: 1, pr:2, py: 0}} size='small'>
					{cells[0][2]}
				</TooltippedCell>
				<TooltippedCell sx={{py:0,px: 1}} size='small'>
					{cells[0][3]}
				</TooltippedCell>
			</TableRow>

		</>
	);
};

export default RowSecond;