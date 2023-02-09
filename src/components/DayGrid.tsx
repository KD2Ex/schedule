import React from 'react'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';


interface DayGridProps {
    xsNum: number,
    mdNum: number,
    lNum: number,
    columns: GridColDef[],
    rows: GridRowsProp,
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

const DayGrid: React.FC<DayGridProps> = ({xsNum, mdNum, lNum, columns, rows, isSelected, dayNumber: titleDay}) => {


    const bgColor = isSelected === true ? "primary.main" : "white";
    const fontColor = isSelected === true ? "white" : "primary.main";

    {console.log('123');
    }
  return (
    <Grid2 xs={xsNum} sm={xsNum} md={mdNum} lg={lNum}>
        
        <Box sx={{width: "fit-content", height: 25, 
            border: "1px solid", 
            borderColor:"primary.main",
            borderRadius: "4px 4px 0px 0px", 
            borderBottom: "0px",
            backgroundColor: bgColor}}>
            <Typography sx={{color: fontColor, px: 1, fontWeidht: 'light    '}} >
                {WEEK_DAYS[titleDay]}
            </Typography>
            
        </Box>
      <DataGrid autoHeight 
                rows={rows} 
                columns={columns} 
                hideFooter 
                disableColumnMenu
                
                sx={{m:0, border: "1px solid", borderColor: "primary.main", borderRadius: "0px, 4px,4px, 4px"}} />
    </Grid2>
  )
}

export default DayGrid