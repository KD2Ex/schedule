import React, {useEffect} from 'react'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, TableContainer } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import teacher from "../../store/teacher";
import { WEEK_DAYS } from '../../models/enums/WeekDays';
import ScheduleDayHeader from "../UI/ScheduleDayHeader/ScheduleDayHeader";
import Css from './DayGrid.module.css'

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


const tableRowStyle = {
	'& MuiTableCell-root': {
		py: 0
	}
}

let doubleCount: number = 0;

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
						{rows.map((row, index, arr) => {
							//index !== 0 && arr[index - 1].subjNumber === arr[index].subjNumber
								if (row.double === true) {
									doubleCount += 1;
									return <>
										<TableRow
											key={row.id}
											sx={  (row.replacementDate && isReplacementEnabled ? {  boxShadow: 'inset 0px 0px 50px 12px rgba(3, 29, 96, 1)' } : null)}
										>
											{doubleCount === 2 ? null :
												<TableCell  sx={{p: 2, py: 0}} rowSpan={2}>
													{row.subjNumber}
												</TableCell>
											}

											<TableCell sx={{maxWidth: 0, flex: 1, py: 0}} >

												<div className={Css.textContainer}>
													{row.teacher}
												</div>
											</TableCell>
											<TableCell sx={{maxWidth: 0, flex: 3, py: 0}} component="th" scope="row">
												<div className={Css.textContainer}>
													{row.subject}
												</div>
											</TableCell>
											<TableCell sx={{justifyContent: 'center', flex: 1, py: '2.5px'}}>
												{row.room}
											</TableCell>
										</TableRow>
										{/*<TableRow
											key={row.id}
											sx={  (row.replacementDate && isReplacementEnabled ? {  boxShadow: 'inset 0px 0px 50px 12px rgba(3, 29, 96, 1)' } : null)}
										>
											<TableCell component="th" scope='row' sx={{p: 2, py: 1}} rowSpan={1}>
												{row.subjNumber}
											</TableCell>
											<TableCell sx={{maxWidth: 0, flex: 1}} size='small'>
												{row.teacher}
											</TableCell>
											<TableCell sx={{maxWidth: 0, flex: 3}} size='small'>
												{row.subject}
											</TableCell>
											<TableCell sx={{justifyContent: 'center', flex: 1}} size='small'>
												{row.room}
											</TableCell>
										</TableRow>*/}
									</>
								} else {
									doubleCount = 0;
									return <TableRow
										key={row.id}
										sx={  (row.replacementDate && isReplacementEnabled ? {  boxShadow: 'inset 0px 0px 50px 12px rgba(3, 29, 96, 1)' } : null)}
									>
										<TableCell component="th" scope='row' sx={{p: 2}} rowSpan={1}>
											{row.subjNumber}
										</TableCell>
										<TableCell sx={{maxWidth: 0, flex: 1}} size='small'>
											{row.teacher}
										</TableCell>
										<TableCell sx={{maxWidth: 0, flex: 3}} size='small'>
											{row.subject}
										</TableCell>
										<TableCell sx={{justifyContent: 'center', flex: 1}} size='small'>
											{row.room}
										</TableCell>
									</TableRow>
								}

							}
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Grid2>
	)
}

export default DayGrid