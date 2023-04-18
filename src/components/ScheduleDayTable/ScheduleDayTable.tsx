import React from 'react'
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import ScheduleDayHeader from "../UI/ScheduleDayHeader/ScheduleDayHeader";
import Css from './ScheduleDayTable.module.css'
import IScheduleDay from "../../models/IScheduleDay";
import {LessonType} from "../../models/enums/LessonType";
import {FILTER_TYPES} from "../../models/enums/FilterType";
import IPair from "../../models/IPair";
import ScheduleRowDouble from "../ScheduleRows/ScheduleRowDouble";
import ScheduleRowEmpty from "../ScheduleRows/ScheduleRowEmpty";
import ScheduleRowOne from "../ScheduleRows/ScheduleRowOne";
import ScheduleRowFirst from "../ScheduleRows/ScheduleRowFirst";
import ScheduleRowSecond from "../ScheduleRows/ScheduleRowSecond";

interface DayGridProps {
	rows: IScheduleDay,
	columns: string[],
	isSelected: boolean,
	dayNumber: number,
	isReplacementEnabled: boolean,
	filterType: FILTER_TYPES;
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
		dayNumber,
		isReplacementEnabled,
		filterType,
		maxPairNumber,
		minPairNumber,
	}) => {



	const tableRowDefault = (cells, isReplacement: boolean, isSmall: boolean) => {
		return <TableRow
			sx={  (isReplacement ? {  ...tableRowStyle } : null)}
		>
			<TableCell sx={{px: 1, textAlign: 'center', py: isSmall ? 0 : 2}}>
				{cells[0][0]}
			</TableCell>
			<TableCell component="th" scope="row" sx={{px: 1 }} size='small'>
				{/*<div className={Css.textContainer}>

				</div>*/}
				{cells[0][1]}
			</TableCell>
			<TableCell component="th" scope="row" sx={{px: 1, pr:2, py: 0}} size='small'>
				{/*<div className={Css.textContainer}>
				</div>*/}
				{cells[0][2]}

			</TableCell>
			<TableCell sx={{px: 1}} size='small'>
				{cells[0][3]}
			</TableCell>
		</TableRow>
	}

	const tableRowDouble = (cells, firstReplacement: boolean, secondReplacement: boolean) => {
		return <>

			<TableRow
				sx={  (firstReplacement ? {  ...tableRowStyle } : null)}
			>
				<TableCell sx={{p: 1, py: 0, textAlign: 'center'}} rowSpan={2}>
					{cells[0][0]}
				</TableCell>
				<TableCell component="th" scope="row"   sx={{ py: 0, px: 1}} size='small'>
					<div className={Css.textContainer}>
					</div>
					{cells[0][1]}

				</TableCell>
				<TableCell component="th" scope="row"  sx={{ px: 1}} size='small'>
					<div className={Css.textContainer}>
					</div>
					{cells[0][2]}

				</TableCell>
				<TableCell  sx={{ py: 0, px: 1}} size='small'>
					{cells[0][3]}
				</TableCell>
			</TableRow>


			<TableRow
				sx={  (secondReplacement ? {  ...tableRowStyle } : null)}
			>
				<TableCell component="th" scope="row"   sx={{py: 0, px: 1}}>
					<div className={Css.textContainer}>
					</div>
					{cells[1][0]}

				</TableCell>
				<TableCell component="th" scope="row"    sx={{ py: 0, px: 1}} size='small'>
					<div className={Css.textContainer}>
					</div>
					{cells[1][1] || "Нет пары"}

				</TableCell>
				<TableCell  sx={{ py: 0, px:1}} size='small'>
					{cells[1][2]}
				</TableCell>

			</TableRow>

		</>
	}

	const tableRowEmpty = (number: number, isSmall: boolean) => {
		return <TableRow
			//key={pair.number}
			//sx={  (pair.lessons[0]?.replacement && isReplacementEnabled ? {  boxShadow: 'inset 0px 0px 50px 12px rgba(3, 29, 96, 1)' } : null)}
		>
			<TableCell component="th" scope='row' sx={{px: 1, textAlign: 'center', py: isSmall ? 0 : 2}} >
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
	}


	const getTableRow = (pair: IPair) => {

		const cells: string[][] = [[pair.number.toString()], []];

		pair.lessons.forEach((lesson, index) => {
			console.log(index)
			switch (filterType) {
				case FILTER_TYPES.GROUPS: {
					cells[index].push(pair.lessons[index].teacher);
					cells[index].push(pair.lessons[index].subject);
					cells[index].push(pair.lessons[index].room);
					break;
				}
				case FILTER_TYPES.TEACHERS: {
					cells[index].push(pair.lessons[index].group);
					cells[index].push(pair.lessons[index].subject);
					cells[index].push(pair.lessons[index].room);
					break;
				}
				case FILTER_TYPES.ROOMS: {
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
				return (<ScheduleRowFirst cells={cells} replacings={[replacings[0], true ]}/>)
			}
			case LessonType.SECOND: {
				return (<ScheduleRowSecond cells={cells} replacings={[true, replacings[0]]}/>)

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
		<Grid2 xs={12} md={6} lg={4} sx={{mb: {xs: 2, md: 0}}} component={Paper}>

			<ScheduleDayHeader isSelected={isSelected} dayNumber={dayNumber}/>

			<TableContainer  sx={{border: "1px solid", borderColor: "primary.pale", borderRadius: "0px 4px 4px 4px" }}>
				<Table sx={{ tableLayout: 'fixed'}}>
					<TableHead>
						<TableRow sx={{borderBottom: "1px solid primary.main",}}>

							<TableCell sx={{width: {xs: '7%', sm: '8%'}, px: 1, pr: 0, textAlign: 'center'}}>{columns[0]}</TableCell>
							<TableCell sx={{width: '25%', px: 1}}>{columns[1]}</TableCell>
							<TableCell sx={{width: {xs: '40%', sm: '60%'}, px: 1}}>{columns[2]}</TableCell>
							<TableCell sx={{width: '11%', px: 0}}>{columns[3]}</TableCell>

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