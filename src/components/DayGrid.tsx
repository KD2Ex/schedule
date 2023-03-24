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
	isReplacementEnabled: boolean,
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
		 dayNumber: titleDay,
		 isReplacementEnabled
	}) => {

	const bgColor = isSelected ? "primary.main" : "background.default";
	const fontColor = isSelected ? "primary.contrastText" : "primary.main";



	return (
		<Grid2 xs={xsNum} sm={xsNum} md={mdNum} lg={lNum} xl={xlNum} sx={{mb: {xs: 2, md: 0}}}>

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
				<Table sx={{ tableLayout: 'auto'}}>
					<TableHead>
						<TableRow sx={{borderBottom: "1px solid primary.main"}}>

							{columns.map((value, index) => (
								<TableCell sx={{ fontSize: '18px', whiteSpace: 'nowrap'}} key={index}>{value}</TableCell>
							))}

						</TableRow>
					</TableHead>

					<TableBody >
						{rows.map((row) => (
							<TableRow
								key={row.id}
								sx={ row.replacementDate && isReplacementEnabled ? {  boxShadow: 'inset 0px 0px 50px 12px rgba(3, 29, 96, 1)' } : null}
								>
								<TableCell component="th" scope='row' sx={{flex: 1}}>
									{row.subjNumber}
								</TableCell>
								<TableCell sx={{maxWidth: 0, flex: 1}} size='small'>{row.teacher}</TableCell>
								<TableCell  sx={{maxWidth: 0, flex: 3}} size='small'>{row.subject}</TableCell>
								<TableCell sx={{ flex: 1}} size='small'>{row.room}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Grid2>
	)
}

export default DayGrid