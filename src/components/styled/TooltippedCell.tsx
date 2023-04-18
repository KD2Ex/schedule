import {styled, TableCell, TableCellProps, Tooltip, tooltipClasses, TooltipProps, Zoom} from "@mui/material";
import React, {FC} from 'react';
import Css from "../ScheduleRows/TableRowsStyles.module.css";


// const ScheduleTooltip = styled(Tooltip)<TooltipProps> ( ({theme}) => ({
// 	[`& .${tooltipClasses.tooltip}`]: {
// 		backgroundColor: '#725050'
// 	}
// }))

const ScheduleTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: theme.palette.secondary.main,
		fontSize: 15,
	},
	[`& .${tooltipClasses.arrow}`]: {
		color: theme.palette.primary.main,
	},
}));

interface TooltippedCellProps {
	children: JSX.Element
}

const TooltippedCell: FC<TooltippedCellProps> = ({children, ...props}) => {
	return (
		<ScheduleTooltip enterDelay={500} TransitionComponent={Zoom} arrow placement={'bottom-start'} title={children}>
			<TableCell {...props}>
				<div className={Css.textContainer}>
					{children}
				</div>
			</TableCell>
		</ScheduleTooltip>
	);
};

export default TooltippedCell;