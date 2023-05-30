import React, {ComponentPropsWithoutRef, FC} from 'react';
import {ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps} from "@mui/material";
import {FILTER_TYPES} from "../../models/enums/FilterType";

interface ToggleButtons {
	label: string,
	isDisabled: boolean,
}

interface TypeButtonsProps extends ToggleButtonGroupProps {
	filterType: FILTER_TYPES;
	setFilterType: React.Dispatch<FILTER_TYPES>;
	setFilterValue: React.Dispatch<any>
}



const TypeButtons: FC<TypeButtonsProps> = ({filterType, setFilterType, setFilterValue, ...props}) => {

	const handelTypeAlignment = (event: React.MouseEvent<HTMLElement>, newFilter: FILTER_TYPES) => {
		if (newFilter !== null) {
			setFilterType(newFilter);
			setFilterValue(null);
			//setT(null);
		}
	}

	return (
		<ToggleButtonGroup
			onChange={handelTypeAlignment}
			value={filterType}
			{...props}
			sx={{padding: 0, '.MuiToggleButtonGroup-grouped': {padding: {xs: 1.5, sm: 2}}}}
		>
			<ToggleButton value={FILTER_TYPES.GROUPS} sx={{padding: 0}} >
				Группы
			</ToggleButton>
			<ToggleButton value={FILTER_TYPES.TEACHERS}>
				Преподаватели
			</ToggleButton>
			<ToggleButton value={FILTER_TYPES.ROOMS}>
				Аудитории
			</ToggleButton>
		</ToggleButtonGroup>
	);
};

export default TypeButtons;