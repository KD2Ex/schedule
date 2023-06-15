import React, {FC} from 'react';
import {ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps, useMediaQuery} from "@mui/material";
import {SCHEDULE_ENTITY} from "../../models/enums/SCHEDULE_ENTITY";
import {IScheduleEntity} from "../../models/interfaces/IScheduleEntity";
import {ScheduleEntityType} from "../../models/enums/ScheduleEntityType";

interface ToggleButtons {
	label: string,
	isDisabled: boolean,
}

interface TypeButtonsProps extends ToggleButtonGroupProps {
	filterType: IScheduleEntity;
	setFilterType: React.Dispatch<IScheduleEntity>;
	setFilterValue: React.Dispatch<any>
}


const TypeButtons: FC<TypeButtonsProps> = ({filterType, setFilterType, setFilterValue, ...props}) => {

	const handelTypeAlignment = (event: React.MouseEvent<HTMLElement>, newFilter: ScheduleEntityType) => {
		if (newFilter !== null) {
			setFilterType({value: newFilter, title: SCHEDULE_ENTITY[newFilter]});
			setFilterValue(null);
			//setT(null);
		}
	}

	const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))

	return (
		<ToggleButtonGroup
			onChange={handelTypeAlignment}
			value={filterType.value}
			{...props}
			sx={{
				padding: 0,
				'.MuiToggleButtonGroup-grouped': {padding: {xs: 1.5, sm: 2}},
				width: isMobile ? '100%' : 'auto',
				justifyContent: 'center',
		}}
		>
			<ToggleButton value={ScheduleEntityType.GROUP} sx={{padding: 0}} >
				Группы
			</ToggleButton>
			<ToggleButton value={ScheduleEntityType.TEACHER}>
				Преподаватели
			</ToggleButton>
			<ToggleButton value={ScheduleEntityType.ROOM}>
				Аудитории
			</ToggleButton>
		</ToggleButtonGroup>
	);
};

export default TypeButtons;