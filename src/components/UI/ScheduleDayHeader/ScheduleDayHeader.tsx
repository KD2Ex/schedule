import React, {FC} from 'react';
import {Box, Typography} from "@mui/material";
import {WEEK_DAYS} from "../../../models/enums/WeekDays";

interface ScheduleDayHeaderProps {
	isSelected: boolean,
	dayNumber: number,
}

const weekDays = [
	WEEK_DAYS.MONDAY,
	WEEK_DAYS.TUESDAY,
	WEEK_DAYS.WEDNESDAY,
	WEEK_DAYS.THURSDAY,
	WEEK_DAYS.FRIDAY,
	WEEK_DAYS.SATURDAY,
	WEEK_DAYS.SUNDAY,
]

const ScheduleDayHeader: FC<ScheduleDayHeaderProps> = ({isSelected, dayNumber}) => {

	const bgColor = isSelected ? "primary.main" : "background.default";
	const fontColor = isSelected ? "primary.contrastText" : "primary.main";

	return (
		<Box sx={{
			width: "fit-content",
			height: 25,
			border: "1px solid",
			borderColor:"primary.pale",
			borderRadius: "4px 4px 0px 0px",
			borderBottom: "0px",
			backgroundColor: bgColor}}>
			<Typography sx={{color: fontColor, px: 1,}} >
				{weekDays[dayNumber]}
			</Typography>

		</Box>
	);
};

export default ScheduleDayHeader;