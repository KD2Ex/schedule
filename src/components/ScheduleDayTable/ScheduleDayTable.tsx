import React from 'react'
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import ScheduleDayHeader from "../UI/ScheduleDayHeader/ScheduleDayHeader";
import Css from './ScheduleDayTable.module.css'
import IScheduleDay from "../../models/interfaces/IScheduleDay";
import {LessonType} from "../../models/enums/LessonType";
import {SCHEDULE_ENTITY} from "../../models/enums/SCHEDULE_ENTITY";
import IPair from "../../models/interfaces/IPair";
import ScheduleRowDouble from "../ScheduleRows/ScheduleRowDouble";
import ScheduleRowEmpty from "../ScheduleRows/ScheduleRowEmpty";
import ScheduleRowOne from "../ScheduleRows/ScheduleRowOne";
import ScheduleRowFirst from "../ScheduleRows/ScheduleRowFirst";
import ScheduleRowSecond from "../ScheduleRows/ScheduleRowSecond";
import {IScheduleEntity} from "../../models/interfaces/IScheduleEntity";

interface DayGridProps {
	rows: IScheduleDay,
	columns: string[],
	isSelected: boolean,
	isReplacementEnabled: boolean,
	filterType: IScheduleEntity;
	maxPairNumber: number;
	minPairNumber: number;
}

//const mode = useContext(ColorContext);

//(85, 194, 252, 0.82)

//const boxShadowColor = mode === 'dark' ?  'rgba(3,29,96,0.82)' : 'rgba(65,129,255,0.82)'
const color = `rgba(0, 68, 255, 0.82)`

const tableRowStyle = {
	boxShadow: `inset 0px 0px 25px 2px ${color}`,

	// '& MuiTableCell-root': {
	// }
}



const ScheduleDayTable: React.FC<DayGridProps> =
	({
		rows,
		columns,
		isSelected,
		isReplacementEnabled,
		filterType,
		maxPairNumber,
		minPairNumber,
	}) => {


	const getTableRow = (pair: IPair) => {

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

		let replacings: boolean[] = [false, false];

		if (isReplacementEnabled) {
			replacings = [
				pair.lessons[0]?.replacement,
				pair.type === LessonType.DOUBLE && pair.lessons[1]?.replacement
			]

		}


		switch (pair.type) {
			case LessonType.DOUBLE:{
				return(<ScheduleRowDouble cells={cells} replacings={replacings}/>)
			}
			case LessonType.EMPTY: {
				return (<ScheduleRowEmpty number={pair.number} isReplaced={replacings[0]}/>)
			}
			case LessonType.ONE: {
				return (<ScheduleRowOne cells={cells} isReplaced={replacings[0]}/>)
			}
			case LessonType.FIRST: {
				return (<ScheduleRowFirst cells={cells} replacings={[replacings[0], replacings[1] ]}/>)
			}
			case LessonType.SECOND: {
				return (<ScheduleRowSecond cells={cells} replacings={[replacings[0], replacings[1]]}/>)

			}
		}

	}


	const fillStartingPairs = () => {

		const resultRows: any[] = []
		const firstPairNumber = rows.pairs[0].number;



		for (let i = minPairNumber; i < firstPairNumber; i++) {

			resultRows.push(<ScheduleRowEmpty number={i} isReplaced={false}/>)
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

			resultRows.push(<ScheduleRowEmpty number={i} isReplaced={false}/>)
		}

		return resultRows;
	}


	return (
		<Grid2 xs={12} md={6} lg={4} sx={{borderRadius: 1, mb: {xs: 2, md: 0}}} >

			<ScheduleDayHeader isSelected={isSelected} dayNumber={rows.number - 1} date={rows.date} isReplaced={isReplacementEnabled} />

			<TableContainer  sx={{border: "1px solid", borderColor: "primary.pale", borderRadius: "0px 4px 4px 4px" }}>
				<Table sx={{ tableLayout: 'fixed'}}>
					<TableHead>
						<TableRow sx={{borderBottom: "1px solid primary.main",}}>

							<TableCell sx={{width: {xs: '7%', sm: '8%'}, px: 1, pr: 0, textAlign: 'center'}}>{columns[0]}</TableCell>
							<TableCell sx={{width: '25%', px: 1}}>{columns[1]}</TableCell>
							<TableCell sx={{width: {xs: '40%', sm: '60%'}, px: 1}}>{columns[2]}</TableCell>
							<TableCell sx={{width: {xs: '15%', sm: '15%'}, px: 0}}>{columns[3]}</TableCell>

						</TableRow>
					</TableHead>

					<TableBody>
						{rows.pairs.length !== 0 && fillStartingPairs()}

						{rows.pairs.map((pair, index, arr) => {
								return getTableRow(pair)
							}
						)}

						{fillEndingPairs()}
					</TableBody>
				</Table>
			</TableContainer>
		</Grid2>
	)
}

export default ScheduleDayTable