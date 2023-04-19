import {useTheme} from "@mui/material";

//rgba(5, 59, 149, 0.62)

//const color = theme.palette.mode === 'light' ? `rgba(67, 137, 255, 0.62)` :  `rgba(5, 59, 149, 0.62)`;
//const color = `rgba(0, 68, 255, 0.82)`;
//(81, 190, 255, 0.68)

export const tableRowStyle = {
	boxShadow: (theme) => `inset 0px 0px 50px 30px 
	${theme.palette.mode === 'light' ? `rgba(81, 190, 255, 0.68)` :  `rgba(5, 59, 149, 0.62)`}`

	// '& MuiTableCell-root': {
	// }
}