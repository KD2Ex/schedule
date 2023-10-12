import React, {useEffect, useMemo, useState} from 'react';
import {createBrowserRouter, RouterProvider, useNavigate} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {getMode, themeObject} from "./themes";
import CssBaseline from "@mui/material/CssBaseline";
import {AuthContext, ColorContext, ColorModeContext, ScheduleModalContext} from "./context";
import {Alert, Snackbar, useMediaQuery} from "@mui/material";
import {observer} from "mobx-react-lite";
import user from './store/user'
import {router} from "./router";
import {useVK} from "./hooks/useVK";
import { ruRU } from '@mui/x-data-grid'
import GlobalAlert from "./components/GlobalAlert/GlobalAlert";
import alerts from "./store/alerts";
import Loader from "./components/Loader/Loader";
import whiteLogo from './styles/logos/kkep_white.svg'
import blackLogo from './styles/logos/kkep.svg'

const App = observer(() => {

	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	const initialModeState = localStorage.getItem('mode') ? localStorage.getItem('mode') : prefersDarkMode;

	const [mode, setMode] = useState<'light' | 'dark'>(initialModeState);

	useEffect(() => {

		console.log('User has been changed')
		console.log(user)

	}, [JSON.stringify(user)])

	useVK([]);

	const colorMode = useMemo(() => ({
		toggleColorMode: () => {
			let prev: 'light' | 'dark' = 'light';

			setMode((prevMode) => {
				prevMode === 'light' ? prev = 'dark' : prev = "light"
				return prev;
			})
			localStorage.setItem('mode', prev)
		}
	}), [])

	const themeColorMode = getMode(mode);

	/*let link = document.querySelector("link[rel~='icon']");
	if (!link) {
		link = document.createElement('link');
		link.rel = 'icon';
		document.getElementsByTagName('head')[0].appendChild(link);
	}

	if (!prefersDarkMode) {
		link.href = blackLogo;
	} else {
		link.href = whiteLogo;

	}*/

	// @ts-ignore
	const theme = createTheme({
		palette: {
			...themeColorMode
		},
		...themeObject,
		ruRU,
	})

	//console.log(user.isAuth)
	//console.log(localStorage.getItem('token') )

	console.log('app')

	return (
		<>
			<ColorModeContext.Provider value={colorMode}>
				<ColorContext.Provider value={mode}>

						<ThemeProvider theme={theme}>
							<CssBaseline/>
							<RouterProvider router={router}/>

							<GlobalAlert
							/>
							{alerts.isLoading && <Loader/>}



						</ThemeProvider>
				</ColorContext.Provider>
			</ColorModeContext.Provider>



		</>
	);
});

export default App;
