import React, {memo, useContext, useEffect, useMemo} from 'react'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import ScheduleDayHeader from "../UI/ScheduleDayHeader/ScheduleDayHeader";
import IScheduleDay from "../../models/interfaces/IScheduleDay";
import RowEmpty from "../ScheduleRows/RowEmpty";
import {IScheduleEntity} from "../../models/interfaces/IScheduleEntity";
import styles from "../ScheduleRows/RowOne/RowOne.module.css";
import {useScheduleRow, useScheduleTable} from "../../hooks/useScheduleRow";
import { getColumns } from '../../utils/stringFormatters';
import {ScheduleModalContext} from "../../context";
import {replacedStyle, rowOneStyle} from "../ScheduleRows/TableRowsMuiStyles";
import RowOne from "../ScheduleRows/RowOne/RowOne";
import IPair from "../../models/interfaces/IPair";
import alerts from "../../store/alerts";
import schedule from "../../store/schedule";
import {observer} from "mobx-react-lite";
import {isEdited} from "../../utils/isEdited";

interface DayGridProps {
	rows: IPair[],
	header: string,
	isSelected: boolean,
	isReplacementEnabled: boolean,
	filterType: IScheduleEntity;
	maxPairNumber: number;
	minPairNumber: number;
	editable?: boolean;
	clickable?: boolean;
	edited?: boolean
}

const color = `rgba(0, 68, 255, 0.82)`

const ScheduleDayTable: React.FC<DayGridProps> = observer(
	({
		rows,
		header,
		isSelected,
		isReplacementEnabled,
		filterType,
		maxPairNumber,
		minPairNumber,
		editable,
		clickable,
		edited
	}) => {

/*
		if (!rows) {
			return
		}
		console.log(rows)*/

	const handleClick = () => {
		if (clickable) {
			console.log('click')
			schedule.setEditableSchedule(rows, header);
		}
	}

	const columns = useMemo(() => {
		return getColumns(filterType.title)
	}, [filterType])


	const fillStartingPairs = () => {

		const resultRows: any[] = []
		const firstPairNumber = rows[0].number;

		for (let i = minPairNumber; i < firstPairNumber; i++) {

			resultRows.push(
				<RowOne
					key={i}
					isReplaced={false}
					editable={editable}
					isEmpty={true}
					row={[i.toString()]}
				/>)
		}

		return resultRows;
	}


	const fillEndingPairs = () => {

		let lastPairNumber = minPairNumber - 1;
		if (rows.length !== 0) {
			lastPairNumber = rows[rows.length - 1].number;
		}
		const resultRows: any[] = []

		for (let i = lastPairNumber + 1; i <= maxPairNumber; i++) {

			resultRows.push(
				<RowOne
					key={i}
					isReplaced={false}
					editable={editable}
					isEmpty={true}
					row={[i.toString()]}
				/>)
		}

		return resultRows;
	}

		const rowStyles = isReplacementEnabled ? {...rowOneStyle, ...replacedStyle} : {...rowOneStyle}

		const theme = useTheme()

	return (
		<>

			<ScheduleDayHeader
				isSelected={isSelected}
				header={header}
				isReplaced={isReplacementEnabled}
			/>

			<TableContainer
				sx={{
					border: edited
						? `${theme.palette.primary.main} 2px solid`
						: `${theme.palette.primary.pale} 1px solid`,
					borderRadius: "0px 4px 4px 4px",
					transition: '200ms',
					'&:hover': clickable && {
						bgcolor: theme.palette.background.block,
						opacity: 1,
					},
					scrollMargin: '50px',
				}}
				id={rows[0]?.lessons[0]?.group}
				onClick={handleClick}
			>
				<Table
					sx={{
						tableLayout: 'fixed',
					}}
				>
					<TableHead>
						<TableRow sx={{borderBottom: "1px solid primary.main",}}>
							{editable &&
								<TableCell sx={{width: '16%'}}>Видимость</TableCell>
							}
							<TableCell sx={{width: {xs: '7%', sm: '8%'}, px: 1, pr: 0, textAlign: 'center'}}>{columns[0]}</TableCell>
							<TableCell sx={{width: '25%', px: 1}}>{columns[1]}</TableCell>
							<TableCell sx={{width: {xs: '40%', sm: '60%'}, px: 1}}>{columns[2]}</TableCell>
							<TableCell sx={{width: {xs: '15%', sm: '15%'}, px: 0}}>{columns[3]}</TableCell>

						</TableRow>
					</TableHead>

					<TableBody
						className={[styles.tableRow, styles.hidden].join(' ')}

					>

						{rows.length !== 0 && fillStartingPairs()}

							{rows.map((item, index) => (
								useScheduleRow(item, filterType, index, editable, isReplacementEnabled)

							))}

						{fillEndingPairs()}
					</TableBody>
				</Table>
			</TableContainer>
		</>

	)
});

export default ScheduleDayTable