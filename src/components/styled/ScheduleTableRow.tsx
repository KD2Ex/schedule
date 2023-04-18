import {styled, TableRow, TableRowProps} from "@mui/material";


export const ScheduleTableRow = styled(TableRow)<TableRowProps>(({theme}) => ({
	boxShadow: 'inset 0px 0px 25px 25px' +
	theme.palette.mode === 'dark' ? 'rgba(0, 68, 255, 0.82)' : 'rgba(0, 68, 255, 0.82)'
}))