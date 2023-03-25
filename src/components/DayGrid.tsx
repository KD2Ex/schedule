import React, {useEffect} from 'react'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, TableContainer } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import teacher from "../store/teacher";
import { WEEK_DAYS } from '../models/enums/WeekDays';
import ScheduleDayHeader from "./UI/ScheduleDayHeader/ScheduleDayHeader";

interface DayGridProps {
	// xsNum: number,
	// mdNum: number,
	// lNum: number,
	// xlNum: number,
	rows: GridRowsProp,
	columns: string[],
	isSelected: boolean,
	dayNumber: number,
	isReplacementEnabled: boolean,
}



const DayGrid: React.FC<DayGridProps> =
	({
		 // xsNum,
		 // mdNum,
		 // lNum,
		 // xlNum,
		 rows,
		 columns,
		 isSelected,
		 dayNumber,
		 isReplacementEnabled
	}) => {


	return (
		<Grid2 xs={12}  md={6} lg={4} sx={{mb: {xs: 2, md: 0}}}>

			<ScheduleDayHeader isSelected={isSelected} dayNumber={dayNumber}/>

			<TableContainer  sx={{border: "1px solid", borderColor: "primary.pale", borderRadius: "0px 4px 4px 4px" }}>
				<Table sx={{ tableLayout: 'auto'}}>
					<TableHead>
						<TableRow sx={{borderBottom: "1px solid primary.main"}}>


							<TableCell sx={{width: '10%', px: 1}}>{columns[0]}</TableCell>
							<TableCell sx={{width: '25%', px: 1}}>{columns[1]}</TableCell>
							<TableCell sx={{width: 'auto', px: 1}}>{columns[2]}</TableCell>
							<TableCell sx={{width: '10%', px: 1}}>{columns[3]}</TableCell>

						</TableRow>
					</TableHead>

					<TableBody >
						{rows.map((row) => (
							<TableRow
								key={row.id}
								sx={ row.replacementDate && isReplacementEnabled ? {  boxShadow: 'inset 0px 0px 50px 12px rgba(3, 29, 96, 1)' } : null}
								>
								<TableCell component="th" scope='row' sx={{p: 2}}>
									{row.subjNumber}
								</TableCell>
								<TableCell sx={{maxWidth: 0, flex: 1}} size='small'>{row.teacher}</TableCell>
								<TableCell  sx={{maxWidth: 0, flex: 3}} size='small'>{row.subject}</TableCell>
								<TableCell sx={{justifyContent: 'center', flex: 1}} size='small'>{row.room}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Grid2>
	)
}

export default DayGrid