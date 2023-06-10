import React, {memo, useContext, useEffect, useMemo} from 'react'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import ScheduleDayHeader from "../UI/ScheduleDayHeader/ScheduleDayHeader";
import IScheduleDay from "../../models/interfaces/IScheduleDay";
import RowEmpty from "../ScheduleRows/RowEmpty";
import {IScheduleEntity} from "../../models/interfaces/IScheduleEntity";
import styles from "../ScheduleRows/RowOne/RowOne.module.css";
import {useScheduleRow, useScheduleTable} from "../../hooks/useScheduleRow";
import { getColumns } from '../../utils/stringFormatters';
import {ScheduleModalContext} from "../../context";

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
			console.log(scheduleModalOpen, setScheduleModalOpen,selectedSchedule,setSelectedSchedule)
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

			resultRows.push(<RowEmpty key={i} number={i} isReplaced={false}/>)
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

			resultRows.push(<RowEmpty key={i} number={i} isReplaced={false}/>)
		}

		return resultRows;
	}



	return (
		<Grid2 xs={12} md={6} lg={4} sx={{borderRadius: 1, mb: {xs: 2, md: 0}}} >

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
						bgcolor: 'rgb(44,44,45)',
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


						{rows.pairs.map((item, index) => {
							return useScheduleRow(item, filterType, index, editable);
						})}
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
		</Grid2>
	)
});

export default ScheduleDayTable