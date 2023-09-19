import {styled} from "@mui/material/styles";
import {alpha, Switch} from "@mui/material";
import {pink} from "@mui/material/colors";


export const WhiteSwitch = styled(Switch)(({theme}) => ({
	'& .MuiSwitch-switchBase.Mui-checked': {
		color: 'white',
		'&:hover': {
			backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
		},
	},
	'& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
		backgroundColor: 'white',
	},
	'& .MuiSwitch-track': {
		backgroundColor: 'white',
	},

}))