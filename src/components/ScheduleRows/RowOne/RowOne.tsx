import React, {FC} from 'react';
import {Checkbox, TableCell, TableRow, TableRowProps} from "@mui/material";
import {replacedStyle, rowOneStyle} from "../TableRowsMuiStyles";
import TooltippedCell from "../../styled/TooltippedCell";
import styles from './RowOne.module.css'
import {useEmptyRow} from "../../../hooks/useEmptyRow";
import CheckBoxCell from "../../CheckBoxCell/CheckBoxCell";

interface TableRowOneProps {
	row?: string[];
	isReplaced: boolean;
	isEmpty: boolean,
	editable: boolean
}


const RowOne: FC<TableRowOneProps> = ({row, isReplaced, isEmpty, editable}) => {


/*	let styles = {
		'& td': {
			px: 1,
		}
	}*/



	const styles = isReplaced ? {...rowOneStyle, ...replacedStyle} : {...rowOneStyle}

	return (
		<TableRow sx={styles}>
			{editable &&
				<CheckBoxCell rowSpan={1}/>
			}
			{isEmpty
				? useEmptyRow(row[0])
				: row.map((item, index, array) => (
					<TooltippedCell key={index} sx={{textAlign: index === 0 && 'center'}}>
						{item}
					</TooltippedCell>
				))
			}
		</TableRow>



	);
};

export default RowOne;