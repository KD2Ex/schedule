import {styled} from "@mui/material/styles";
import {Tooltip, tooltipClasses, TooltipProps} from "@mui/material";


export const WeekTooltip = styled( ({className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{popper: className}}/>
))(({theme}) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: theme.palette.background.contrast,
		color: 'rgb(255,255,255)',
		boxShadow: theme.shadows[1],
		fontSize: 14,
		paddingLeft: 0,
	},
}))