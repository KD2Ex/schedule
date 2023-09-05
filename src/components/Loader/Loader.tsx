import React from 'react';
import {Box, CircularProgress} from "@mui/material";
import {observer} from "mobx-react-lite";

const Loader = observer(() => {



	return (
		<Box
			sx={{
				opacity: '0.3',
				width: '100%',
				height: '100%',
				bgcolor: 'black',
				position: 'absolute',
				top: 0,
				left: 0,
				zIndex: 1600,
			}}
		>


			<CircularProgress
				size={80}
				sx={{
					top: '50%',
					left: '50%',
					position: 'absolute',
				}}
			/>
		</Box>
	);
});

export default Loader;