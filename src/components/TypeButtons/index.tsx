import React, {FC} from 'react';
import {ToggleButton, ToggleButtonGroup} from "@mui/material";

interface ToggleButtons {
	label: string,
	isDisabled: boolean,
	value:
}

interface TypeButtonsProps {
	buttons: ToggleButtons[],
	state: any;
}



const TypeButtons: FC<TypeButtonsProps> = ({buttons, state, ...props}) => {
	return (
		<ToggleButtonGroup {...props}>
			{buttons.map((button) => (
				<ToggleButton value={true} >

				</ToggleButton>
			))}
		</ToggleButtonGroup>
	);
};

export default TypeButtons;