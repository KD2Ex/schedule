import React, {FC} from 'react';
import {TableCell, TableRow, TableRowProps} from "@mui/material";
import ILesson from "../../models/interfaces/ILesson";
import IPair from "../../models/interfaces/IPair";
import {SCHEDULE_ENTITY} from "../../models/enums/SCHEDULE_ENTITY";
import {tableRowStyle} from "./TableRowsMuiStyles";
import Css from './TableRowsStyles.module.css'
import TooltippedCell from "../styled/TooltippedCell";


interface TableRowOneProps {
	cells: string[][];
	isReplaced: boolean;
}



const ScheduleRowOne: React.FC<TableRowOneProps> = ({cells, isReplaced}) => {

	return (
		<TableRow
			sx={  (isReplaced ? {  ...tableRowStyle } : null) }
		>
			<TableCell sx={{px: 1, textAlign: 'center'}}>
				{cells[0][0]}
			</TableCell>
			<TooltippedCell sx={{px: 1 }} size='small'>
				{cells[0][1]}
			</TooltippedCell>
			<TooltippedCell  sx={{px: 1, pr:2, py: 0}} size='small'>

				{cells[0][2]}

			</TooltippedCell>
			<TooltippedCell sx={{px: 1}} size='small'>
				{cells[0][3]}
			</TooltippedCell>
		</TableRow>
	);
};

export default ScheduleRowOne;