import React, {useEffect, useMemo, useState} from 'react';
//import {router} from "./components/AppRouter";
import {createBrowserRouter, RouterProvider, useNavigate} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {getMode, themeObject} from "./themes";
import CssBaseline from "@mui/material/CssBaseline";
import {AuthContext, ColorContext, ColorModeContext, ScheduleModalContext} from "./context";
import {publicRoutes, routes} from "./router/routes";
import {redirect} from "react-router-dom";
import {Alert, Snackbar, useMediaQuery} from "@mui/material";
import {observer} from "mobx-react-lite";
import user from './store/user'
import {router} from "./router";
import {useVK} from "./hooks/useVK";
import GlobalAlert from "./components/GlobalAlert/GlobalAlert";
import alert from "./store/alerts";
import ScheduleEditDialog from "./components/Dialogs/ScheduleEditDialog/ScheduleEditDialog";

const App = observer(() => {

	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const [mode, setMode] = useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');
	const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
	const [selectedSchedule, setSelectedSchedule] = useState(null);

	useEffect(() => {

		user.checkAuth()
		console.log('effect1')

	}, [])

	useVK([]);

	const colorMode = useMemo(() => ({
		toggleColorMode: () => {
			setMode((prevMode) => (prevMode === 'light' ? 'dark' : "light"))
		}
	}), [])

	const themeColorMode = getMode(mode);

	let link = document.querySelector("link[rel~='icon']");
	if (!link) {
		link = document.createElement('link');
		link.rel = 'icon';
		document.getElementsByTagName('head')[0].appendChild(link);
	}

	if (!prefersDarkMode) {
		link.href = './src/styles/logos/kkep.svg';
	} else {
		link.href = './src/styles/logos/kkep_white.svg';

	}

	// @ts-ignore
	const theme = createTheme({
		palette: {
			...themeColorMode
		},
		...themeObject,
	})

	//console.log(user.isAuth)
	//console.log(localStorage.getItem('token') )

	console.log('arpp')

	return (
		<>
			<ColorModeContext.Provider value={colorMode}>
				<ColorContext.Provider value={mode}>

						<ThemeProvider theme={theme}>
							<CssBaseline/>
							<RouterProvider router={router}/>



						</ThemeProvider>
				</ColorContext.Provider>
			</ColorModeContext.Provider>



		</>
	);
});

export default App;
