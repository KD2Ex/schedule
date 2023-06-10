import React, {FC} from 'react';
import {TableCell, TableRow, TableRowProps} from "@mui/material";
import {replacedStyle, rowOneStyle} from "../TableRowsMuiStyles";
import TooltippedCell from "../../styled/TooltippedCell";
import styles from './RowOne.module.css'
import {useEmptyRow} from "../../../hooks/useEmptyRow";

interface TableRowOneProps {
	row?: string[];
	isReplaced: boolean;
	isEmpty: boolean
}


const RowOne: FC<TableRowOneProps> = ({row, isReplaced, isEmpty}) => {


/*	let styles = {
		'& td': {
			px: 1,
		}
	}*/

	const styles = isReplaced ? {...rowOneStyle, ...replacedStyle} : {...rowOneStyle}

	return (
		<TableRow
			sx={styles}
		>
			{isEmpty
				? useEmptyRow(row[0])/*row.map((item, index) => {
					if (index === 0) {
						return (
							<TooltippedCell>
								{item}
							</TooltippedCell>
						)
					}
					if (index === 2) {
						return (
							<TableCell sx={{
								fontStyle: 'italic',
							}}>
								Нет занятия
							</TableCell>
						)
					}
					return (
						<TableCell/>
					)
				})*/
				: row.map((item, index, array) => (
					<TooltippedCell key={index}>
						{item}
					</TooltippedCell>
				))
			}
			{/*<TableCell>
				{cells[0][0]}
			</TableCell>
			<TooltippedCell>
				{cells[0][1]}
			</TooltippedCell>
			<TooltippedCell  >
				{cells[0][2]}
			</TooltippedCell>
			<TooltippedCell>
				{cells[0][3]}
			</TooltippedCell>*/}
		</TableRow>
	);
};

export default RowOne;