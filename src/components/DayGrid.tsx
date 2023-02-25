import React from 'react'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, TableContainer } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';


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



const DayGrid: React.FC<DayGridProps> = ({xsNum, mdNum, lNum, xlNum, rows, columns, isSelected, dayNumber: titleDay}) => {


    const bgColor = isSelected === true ? "primary.main" : "white";
    const fontColor = isSelected === true ? "white" : "primary.main";
    

  return (
    <Grid2 xs={xsNum} sm={xsNum} md={mdNum} lg={lNum} xl={xlNum}>
        
        <Box sx={{width: "fit-content", height: 25, 
            border: "1px solid", 
            borderColor:"primary.pale",
            borderRadius: "4px 4px 0px 0px", 
            borderBottom: "0px",
            backgroundColor: bgColor}}>
            <Typography sx={{color: fontColor, px: 1, fontWeidht: 'bold'}} >
                {WEEK_DAYS[titleDay]}
            </Typography>
            
        </Box>


        <TableContainer sx={{border: "1px solid", borderColor: "primary.pale", borderRadius: "0px 4px 4px 4px" }} component={Paper} >
          <Table component={Paper}>
            <TableHead>
              <TableRow sx={{borderBottom: "1px solid primary.main"}}>

                {columns.map((value, index) => (
                  <TableCell key={index}>{value}</TableCell>
                ))}
                
              </TableRow>
            </TableHead>

            <TableBody >
              {rows.map((row) => (
                <TableRow 
                  key={row.id}
                  sx={{}}>
                    <TableCell component="th" scope='row'>
                      {row.subjNumber}
                    </TableCell>
                    <TableCell sx={{flexWrap: 'nowrap'}}  size='small'>{row.teacher}</TableCell>
                    <TableCell size='small'>{row.subject}</TableCell>
                    <TableCell size='small'>{row.room}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>



    </Grid2>
  )
}

export default DayGrid