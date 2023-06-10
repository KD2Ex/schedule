import React, {FC} from 'react';
import {TableCell, TableRow} from "@mui/material";
import {replacedStyle, rowDoubleStyle, rowOneStyle} from "./TableRowsMuiStyles";
import Css from './TableRowsStyles.module.css'
import TooltippedCell from "../styled/TooltippedCell";
import {useEmptyRow} from "../../hooks/useEmptyRow";

interface ScheduleRowDoubleProps {
	firstRow: string[],
	secondRow: string[],
	replaces: boolean[],
}

const RowDouble: FC<ScheduleRowDoubleProps> = ({firstRow, secondRow, replaces}) => {

	const styles = replaces[0] ? {...rowDoubleStyle, ...replacedStyle} : {...rowDoubleStyle}

	return (
		<>
			<TableRow
				sx={styles}
			>
				{
					firstRow.length !== 0
						? (firstRow.map((item, index, array) => (
					<TooltippedCell key={index} rowSpan={index === 0 ? 2 : 1}>
						{item}
					</TooltippedCell>)))
						: useEmptyRow(secondRow[0], true)
				}

			</TableRow>


			<TableRow
				sx={styles}
			>
				{
					secondRow.length !== 0
						? secondRow
							.slice(firstRow.length !== 0 ? 0 : 1)
							.map((item, index, array) => (
							<TooltippedCell key={index} sx={index === 0 && {
								px: '8px !important',
								borderRight: 'none !important',
								textAlign: 'start !important'
							}}>
								{item}
							</TooltippedCell>))
						: useEmptyRow()
				}

			</TableRow>

		</>
	);
};

export default RowDouble;