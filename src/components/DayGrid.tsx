import React from 'react'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, TableContainer } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import teacher from "../store/teacher";


interface DayGridProps {
	xsNum: number,
	mdNum: number,
	lNum: number,
	xlNum: number,
	rows: GridRowsProp,
	columns: string[],
	isSelected: boolean,
	dayNumber: number,
}
const WEEK_DAYS = [
	'Понедельник',
	'Вторник',
	'Среда',
	'Четверг',
	'Пятница',
	'Суббота',
]

const DayGrid: React.FC<DayGridProps> =
	({
		 xsNum,
		 mdNum,
		 lNum,
		 xlNum,
		 rows,
		 columns,
		 isSelected,
		 dayNumber: titleDay
	}) => {


	const bgColor = isSelected ? "primary.main" : "background.default";
	const fontColor = isSelected ? "primary.contrastText" : "primary.main";


	return (
		<Grid2 xs={xsNum} sm={xsNum} md={mdNum} lg={lNum} xl={xlNum} sx={{p: 2}}>

			<Box sx={{
				width: "fit-content",
				height: 25,
				border: "1px solid",
				borderColor:"primary.pale",
				borderRadius: "4px 4px 0px 0px",
				borderBottom: "0px",
				backgroundColor: bgColor}}>
				<Typography sx={{color: fontColor, px: 1,}} >
					{WEEK_DAYS[titleDay]}
				</Typography>

			</Box>


			<TableContainer  sx={{border: "1px solid", borderColor: "primary.pale", borderRadius: "0px 4px 4px 4px" }}>
				<Table sx={{size: 'small'}}>
					<TableHead>
						<TableRow sx={{borderBottom: "1px solid primary.main"}}>

							{columns.map((value, index) => (
								<TableCell sx={{px: 1, width: 0, fontSize: '18px'}} key={index}>{value}</TableCell>
							))}

						</TableRow>
					</TableHead>

					<TableBody >
						{rows.map((row) => (
							<TableRow
								key={row.id}
								sx={ row.replacementDate ? {  boxShadow: 'inset 0px 0px 50px 12px rgba(3, 29, 96, 1)' } : null}
								>
								<TableCell component="th" scope='row' sx={{px: 2, width:''}}>
									{row.subjNumber}
								</TableCell>
								<TableCell sx={{maxWidth: 0, px: 0}} size='small'>{row.teacher}</TableCell>
								<TableCell  sx={{maxWidth: 0, px: 1.5}} size='small'>{row.subject}</TableCell>
								<TableCell sx={{ px: 1, width:''}} size='small'>{row.room}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Grid2>
	)
}

export default DayGrid