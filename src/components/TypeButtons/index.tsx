import React, {ComponentPropsWithoutRef, FC} from 'react';
import {ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps} from "@mui/material";
import toggleStyles from "../../styles/toggleButtons.module.css";
import {FILTER_TYPES} from "../../models/enums/FilterType";

interface ToggleButtons {
	label: string,
	isDisabled: boolean,
}

interface TypeButtonsProps extends ToggleButtonGroupProps {
	filterType: FILTER_TYPES;
	setFilterType: React.Dispatch<FILTER_TYPES>;
}



const TypeButtons: FC<TypeButtonsProps> = ({filterType, setFilterType, ...props}) => {

	const handelTypeAlignment = (event: React.MouseEvent<HTMLElement>, newFilter: FILTER_TYPES) => {
		if (newFilter !== null) {
			setFilterType(newFilter);
			//setFilterValue(null);
			//setT(null);
		}
	}

	return (
		<ToggleButtonGroup
			onChange={handelTypeAlignment}
			value={filterType}
			{...props}
		>
			<ToggleButton value={FILTER_TYPES.GROUPS} >
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