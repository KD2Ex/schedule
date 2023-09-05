import {Button, ButtonProps} from "@mui/material";
import {styled} from "@mui/material";
import React from 'react';


const StyledButton = styled(Button)<ButtonProps>( ({theme}) => ({
	backgroundColor: theme.palette.secondary.main2,
	color: 'white',
	//border:`1px solid ${theme.palette.primary.pale}`,
	'&:hover': {backgroundColor: theme.palette.secondary.hover}
}))


const ContainedButton = ({children, ...props}) => {
	return (
		<StyledButton
			variant={'contained'}
			{...props}
		>
			{children}
		</StyledButton>
	);
};

export default ContainedButton;