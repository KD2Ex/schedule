import React, {memo, useContext, useEffect, useMemo} from 'react'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import ScheduleDayHeader from "../UI/ScheduleDayHeader/ScheduleDayHeader";
import IScheduleDay from "../../models/interfaces/IScheduleDay";
import RowEmpty from "../ScheduleRows/RowEmpty";
import {IScheduleEntity} from "../../models/interfaces/IScheduleEntity";
import styles from "../ScheduleRows/RowOne/RowOne.module.css";
import {getTableRow, useScheduleTable} from "../../hooks/useScheduleTable";
import { getColumns } from '../../utils/stringFormatters';
import {ScheduleModalContext} from "../../context";

interface DayGridProps {
	rows: IScheduleDay,
	isSelected: boolean,
	isReplacementEnabled: boolean,
	filterType: IScheduleEntity;
	maxPairNumber: number;
	minPairNumber: number;
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
	}) => {


		const {scheduleModalOpen, setScheduleModalOpen,selectedSchedule,setSelectedSchedule} = useContext(ScheduleModalContext);


	const handleClick = () => {

		console.log(scheduleModalOpen, setScheduleModalOpen,selectedSchedule,setSelectedSchedule)
		setSelectedSchedule(rows);
		setScheduleModalOpen(true);

	}
	/*const getTableRowN = (pair: IPair, key: number) => {

		const cells: string[][] = [[pair.number.toString()], []];

		pair.lessons.forEach((lesson, index) => {
			switch (filterType.title) {
				case SCHEDULE_ENTITY.GROUP: {
					cells[index].push(pair.lessons[index].teacher);
					cells[index].push(pair.lessons[index].subject);
					cells[index].push(pair.lessons[index].room);
					break;
				}
				case SCHEDULE_ENTITY.TEACHER: {
					cells[index].push(pair.lessons[index].group);
					cells[index].push(pair.lessons[index].subject);
					cells[index].push(pair.lessons[index].room);
					break;
				}
				case SCHEDULE_ENTITY.ROOM: {
					cells[index].push(pair.lessons[index].teacher);
					cells[index].push(pair.lessons[index].subject);
					cells[index].push(pair.lessons[index].group);
					break;
				}
			}
		})


		let replaces: boolean[] = [false, false];

		if (isReplacementEnabled) {
			replaces = [
				pair.lessons[0]?.replacement,
				pair.type === LessonType.DOUBLE && pair.lessons[1]?.replacement
			]

		}


		switch (pair?.type) {
			case LessonType.EMPTY:
			case LessonType.ONE: {
				return (
					<RowOne
						key={key}
						row={cells[0]}
						isReplaced={replaces[0]}
						isEmpty={pair?.type === LessonType.EMPTY}
					/>
				)
			}
			case LessonType.DOUBLE:
			case LessonType.FIRST: {
				return(
					<RowDouble
						key={key}
						firstRow={cells[0]}
						secondRow={cells[1]}
						replaces={replaces}
					/>
				)
			}
			case LessonType.SECOND: {
				return(
					<RowDouble
						key={key}
						firstRow={cells[1]}
						secondRow={cells[0]}
						replaces={replaces}
					/>
				)
			}
		}
	}*/


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
					'&:hover': {
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

							<TableCell sx={{width: {xs: '7%', sm: '8%'}, px: 1, pr: 0, textAlign: 'center'}}>{columns[0]}</TableCell>
							<TableCell sx={{width: '25%', px: 1}}>{columns[1]}</TableCell>
							<TableCell sx={{width: {xs: '40%', sm: '60%'}, px: 1}}>{columns[2]}</TableCell>
							<TableCell sx={{width: {xs: '15%', sm: '15%'}, px: 0}}>{columns[3]}</TableCell>

						</TableRow>
					</TableHead>

					<TableBody className={styles.tableRow}>
						{rows.pairs.length !== 0 && fillStartingPairs()}


						{rows.pairs.map((item, index) => {
							return getTableRow(item, filterType, index);
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