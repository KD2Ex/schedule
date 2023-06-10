import React, {FC} from 'react';
import {TableCell, TableRow, Typography} from "@mui/material";
import {replacedStyle} from "./TableRowsMuiStyles";

interface ScheduleRowEmptyProps {
	number: number;
	isReplaced: boolean;
}

const RowEmpty: FC<ScheduleRowEmptyProps> = ({number, isReplaced}) => {
	return (
		<TableRow sx={  (isReplaced ? {  ...replacedStyle } : null) }>
			<TableCell component="th" scope='row' sx={{px: 1, textAlign: 'center'}} >
				{number}
			</TableCell>
			<TableCell size='small'>
			</TableCell>
			<TableCell size='small' sx={{py:0}}>
				<Typography sx={{fontStyle: 'italic',  fontSize: '1em'}}>
					Нет занятия
				</Typography>
			</TableCell>
			<TableCell size='small'>
			</TableCell>
		</TableRow>
	);
};

export default RowEmpty;