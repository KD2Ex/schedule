import React, {useContext} from 'react'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import ScheduleDayHeader from "../UI/ScheduleDayHeader/ScheduleDayHeader";
import Css from './DayGrid.module.css'
import IScheduleDay from "../../models/IScheduleDay";
import {LessonType} from "../../models/enums/LessonType";
import {FILTER_TYPES} from "../../models/enums/FilterType";
import IPair from "../../models/IPair";
import {ColorContext} from "../../context";

interface DayGridProps {
	rows: IScheduleDay,
	columns: string[],
	isSelected: boolean,
	dayNumber: number,
	isReplacementEnabled: boolean,
	filterType: FILTER_TYPES;
	maxPairsNumber: number;
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



const DayGrid: React.FC<DayGridProps> =
	({
		rows,
		columns,
		isSelected,
		dayNumber,
		isReplacementEnabled,
		filterType,
		maxPairsNumber
	}) => {



	const tableRowDefault = (cells, isReplacement: boolean) => {
		return <TableRow
			sx={  (isReplacement ? {  ...tableRowStyle } : null)}
		>
			<TableCell>
				{cells[0][0]}
			</TableCell>
			<TableCell component="th" scope="row" sx={{px: 1}} size='small'>
				{/*<div className={Css.textContainer}>

				</div>*/}
				{cells[0][1]}
			</TableCell>
			<TableCell component="th" scope="row" sx={{px: 1}} size='small'>
				{/*<div className={Css.textContainer}>
				</div>*/}
				{cells[0][2]}

			</TableCell>
			<TableCell size='small'>
				{cells[0][3]}
			</TableCell>
		</TableRow>
	}

	const tableRowDouble = (cells, firstReplacement: boolean, secondReplacement: boolean) => {
		return <>

			<TableRow
				sx={  (firstReplacement ? {  ...tableRowStyle } : null)}
			>
				<TableCell sx={{p: 2, py: 0}} rowSpan={2}>
					{cells[0][0]}
				</TableCell>
				<TableCell sx={{ py: 0, px: 1}} size='small'>
					<div className={Css.textContainer}>
						{cells[0][1]}
					</div>
				</TableCell>
				<TableCell component="th" scope="row"  sx={{ px: 1}} size='small'>
					<div className={Css.textContainer}>
						{cells[0][2]}
					</div>

				</TableCell>
				<TableCell  sx={{ py: 0}} size='small'>
					{cells[0][3]}
				</TableCell>
			</TableRow>


			<TableRow
				sx={  (secondReplacement ? {  ...tableRowStyle } : null)}
			>
				<TableCell sx={{py: 0, px: 1}}>
					{cells[1][0]}
				</TableCell>
				<TableCell  sx={{ py: 0, px: 1}} size='small'>
					{cells[1][1] || "Нет пары"}
				</TableCell>
				<TableCell  sx={{ py: 0}} size='small'>
					{cells[1][2]}
				</TableCell>

			</TableRow>

		</>
	}

	const tableRowEmpty = (number: number) => {
		return <TableRow
			//key={pair.number}
			//sx={  (pair.lessons[0]?.replacement && isReplacementEnabled ? {  boxShadow: 'inset 0px 0px 50px 12px rgba(3, 29, 96, 1)' } : null)}
		>
			<TableCell component="th" scope='row' sx={{p: 2}} rowSpan={1}>
				{number}
			</TableCell>
			<TableCell size='small'>
			</TableCell>
			<TableCell size='small'>
				<Typography sx={{fontStyle: 'italic',  fontSize: '1em'}}>
					Нет занятия
				</Typography>
			</TableCell>
			<TableCell size='small'>
			</TableCell>
		</TableRow>
	}


	const getTableRow = (pair: IPair) => {

		const cells: any[] = [[pair.number], []];

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

		switch (pair.type) {
			case LessonType.DOUBLE:{
				if (pair.lessons.length > 1) {

					return tableRowDouble(cells, isReplacementEnabled && pair.lessons[0].replacement, isReplacementEnabled && pair.lessons[1].replacement);
				}
				return tableRowDouble(cells, false,false);
			}
			case LessonType.EMPTY: {
				return tableRowEmpty(pair.number);
			}
			case LessonType.ONE: {
				return tableRowDefault(cells, isReplacementEnabled && pair.lessons[0].replacement);
			}
			case LessonType.FIRST: {
				return tableRowDouble(cells, isReplacementEnabled && pair.lessons[0].replacement, isReplacementEnabled && pair.lessons[0].replacement);
			}
		}

		/*if (pair.type === LessonType.DOUBLE) {

		}*/


	}


	const fillStartingPairs = () => {

		const firstPairNumber = rows.pairs[0].number;
		const resultRows: any[] = []


		for (let i = 1; i < firstPairNumber; i++) {

			resultRows.push(tableRowEmpty(i))
		}

		return resultRows;
	}


	const fillEndingPairs = () => {

			let lastPairNumber = 0;
			if (rows.pairs.length !== 0) {
				lastPairNumber = rows.pairs[rows.pairs.length - 1].number;
			}
			const resultRows: any[] = []

			for (let i = lastPairNumber + 1; i <= maxPairsNumber; i++) {

				resultRows.push(tableRowEmpty(i))
			}

			return resultRows;
		}


	return (
		<Grid2 xs={12}  md={6} lg={4} sx={{mb: {xs: 2, md: 0}}}>

			<ScheduleDayHeader isSelected={isSelected} dayNumber={dayNumber}/>

			<TableContainer  sx={{border: "1px solid", borderColor: "primary.pale", borderRadius: "0px 4px 4px 4px" }}>
				<Table sx={{ tableLayout: 'auto'}}>
					<TableHead>
						<TableRow sx={{borderBottom: "1px solid primary.main",}}>


							<TableCell sx={{width: '10%', px: 1.5}}>{columns[0]}</TableCell>
							<TableCell sx={{width: '23%', px: 1}}>{columns[1]}</TableCell>
							<TableCell sx={{width: 'auto', px: 1}}>{columns[2]}</TableCell>
							<TableCell sx={{width: '10%', px: 1}}>{columns[3]}</TableCell>

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

export default DayGrid