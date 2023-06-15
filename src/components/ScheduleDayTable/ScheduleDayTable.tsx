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

interface DayGridProps {
	rows: IScheduleDay,
	isSelected: boolean,
	isReplacementEnabled: boolean,
	filterType: IScheduleEntity;
	maxPairNumber: number;
	minPairNumber: number;
	editable?: boolean;
	clickable?: boolean;
}

const color = `rgba(0, 68, 255, 0.82)`

const ScheduleDayTable: React.FC<DayGridProps> = memo(
	({
		rows,
		isSelected,
		isReplacementEnabled,
		filterType,
		maxPairNumber,
		minPairNumber,
		editable,
		clickable
	}) => {


		const {scheduleModalOpen, setScheduleModalOpen,selectedSchedule,setSelectedSchedule} = useContext(ScheduleModalContext);


	const handleClick = () => {
		if (clickable) {
			setSelectedSchedule(rows);
			setScheduleModalOpen(true);
		}
	}

	const columns = useMemo(() => {
		return getColumns(filterType.title)
	}, [filterType])


	const fillStartingPairs = () => {

		const resultRows: any[] = []
		const firstPairNumber = rows.pairs[0].number;

		for (let i = minPairNumber; i < firstPairNumber; i++) {

			resultRows.push(
				<RowOne
					key={i}
					isReplaced={false}
					editable={editable}
					isEmpty={true}
					row={[i]}
				/>)
		}

		return resultRows;
	}


	const fillEndingPairs = () => {

		let lastPairNumber = minPairNumber - 1;
		if (rows.pairs.length !== 0) {
			lastPairNumber = rows.pairs[rows.pairs.length - 1].number;
		}
		const resultRows: any[] = []

		for (let i = lastPairNumber + 1; i <= maxPairNumber; i++) {

			resultRows.push(
				<RowOne
					key={i}
					isReplaced={false}
					editable={editable}
					isEmpty={true}
					row={[i]}
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
				dayNumber={rows.number - 1}
				date={rows.date}
				isReplaced={isReplacementEnabled}
			/>

			<TableContainer
				sx={{
					border: "1px solid",
					borderColor: "primary.pale",
					borderRadius: "0px 4px 4px 4px",

					'&:hover': clickable && {
						bgcolor: theme.palette.background.block,
						opacity: 1,
						transition: '200ms'
					}
				}}
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

					<TableBody className={styles.tableRow}>

						{rows.pairs.length !== 0 && fillStartingPairs()}



							{rows.pairs.map((item, index) => (
								useScheduleRow(item, filterType, index, editable)

								/*<TableRow
									sx={rowStyles}
								>

								</TableRow>*/
							))}
						{/*return useScheduleRow(item, filterType, index, editable);*/}


						{/*{rows.pairs.map((pair, index, arr) => {
								return getTableRowN(
									pair, index
								)
							}
						)}*/}

						{fillEndingPairs()}
					</TableBody>
				</Table>
			</TableContainer>
		</>

	)
});

export default ScheduleDayTable