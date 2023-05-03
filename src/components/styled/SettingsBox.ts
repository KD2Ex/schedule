import {Box, BoxProps, styled} from "@mui/material";


export const SettingsBox = styled(Box)<BoxProps>(({theme}) => ({
	border: '1px solid',
	borderColor: theme.palette.primary.pale,
	borderRadius: 4,
	backgroundColor: theme.palette.primary.contrastPale,
	padding: 24,
	marginBottom: 24,
}))