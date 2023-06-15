import {Button, ButtonProps, styled, useTheme} from "@mui/material";
import React, {ComponentProps, FC, ReactNode, useState} from 'react';


const StyledProfileButton = styled(Button)<ButtonProps>( ({theme}) => ({
	width: '180px',
	border: theme.palette.mode === 'dark' ? `1px solid ${theme.palette.primary.pale}` : ''
}))

interface ProfileButtonProps extends ButtonProps{
	children: ReactNode,
}

const ProfileButton: FC<ProfileButtonProps> = ({children, ...props}) => {

	const theme = useTheme();
	const [isActive, setIsActive] = useState();



	return (
		<StyledProfileButton
			{...props}
			variant={theme.palette.mode === 'light' ? 'contained' :'outlined'}>
			{children}
		</StyledProfileButton>
	);
};

export default ProfileButton;