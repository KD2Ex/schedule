import React, {FC, useEffect, useState} from 'react';
import {Box, TableCell, TableRow} from "@mui/material";
import {replacedStyle, rowDoubleStyle, rowOneStyle} from "./TableRowsMuiStyles";
import Css from './TableRowsStyles.module.css'
import TooltippedCell from "../styled/TooltippedCell";
import {useEmptyRow} from "../../hooks/useEmptyRow";
import CheckBoxCell from "../CheckBoxCell/CheckBoxCell";
import schedule from "../../store/schedule";
import {observer} from "mobx-react-lite";

interface ScheduleRowDoubleProps {
	firstRow: string[],
	secondRow: string[],
	replaces: boolean[],
	editable: boolean,
	ids: number[],
	empty: boolean[]
}

const RowDouble: FC<ScheduleRowDoubleProps> =
	({
		 firstRow,
		 secondRow,
		 replaces,
		 editable,
		 ids,
		empty
	}) => {

	const [secondHidden, setSecondHidden] = useState(false);
	const [firstHidden, setFirstHidden] = useState(false);
	const styles = replaces[0] ? {...rowDoubleStyle, ...replacedStyle} : {...rowDoubleStyle}

	const handleCheck = (isFirst: boolean) => {

		if (isFirst) {

			if (firstHidden) {
				schedule.showLesson(ids[0])
			} else {
				schedule.hideLesson(ids[0])
			}
			setFirstHidden(prev => !prev)

		} else {
			if (secondHidden) {
				schedule.showLesson(ids[1])
			} else {
				schedule.hideLesson(ids[1])
			}

			setSecondHidden(prev => !prev)
		}

	}

	useEffect(() => {

		setFirstHidden(!!schedule.newSchedule.hideLessons?.find(item => item === ids[0]))
		setSecondHidden(!!schedule.newSchedule.hideLessons?.find(item => item === ids[1]))


	}, [JSON.stringify(schedule.newSchedule?.hideLessons)])


	return (
		<>

			<TableRow
				sx={{
					...styles,
					opacity: firstHidden ? 0.5 : 1
				}}
			>
				{
					editable && (
						<>
							<CheckBoxCell
								rowSpan={2}
								double
								handleCheck={handleCheck}
								value={firstHidden}
								value2={secondHidden}
								disabled={!replaces[0] || firstRow.length === 0}
								disabled2={!replaces[1] || secondRow.length === 0}
							/>
						</>


					)
				}

				{
					//firstRow.length !== 0
					!empty[0]
						? (firstRow.map((item, index, array) => (
					<TooltippedCell
						key={index}
						rowSpan={index === 0 ? 2 : 1}
						sx={{textAlign: index === 0 && 'center'}}
					>
						{item}
					</TooltippedCell>)))
						: useEmptyRow(firstRow[0], true)
				}

			</TableRow>


			<TableRow
				sx={{
					...styles,
					opacity: secondHidden ? 0.5 : 1
				}}
			>
				{
					//secondRow.length !== 0
					!empty[1]
						? secondRow
							.slice(firstRow.length !== 0 ? 0 : 1)
							.map((item, index, array) => (
							<TooltippedCell
								key={index}
								sx={index === 0 ? {
								px: '8px !important',
								borderRight: 'none !important',
								textAlign: 'start !important'
							} : {}}
							>
								{item}
							</TooltippedCell>))
						: useEmptyRow()
				}

			</TableRow>

		</>
	);
};

export default observer(RowDouble);