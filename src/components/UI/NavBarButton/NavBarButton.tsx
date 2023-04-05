import {Button} from "@mui/material";
import {styled} from '@mui/material/styles';


export const NavBarButton = styled(Button)(( {theme} ) => ({
	color: theme.palette.mode === 'dark' ? theme.palette.primary.main : 'white'
}))