import React, {useEffect, useMemo, useState} from 'react';
import './styles.css'
//import {router} from "./components/AppRouter";
import {createBrowserRouter, RouterProvider, useNavigate} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {getMode, themeObject} from "./themes";
import CssBaseline from "@mui/material/CssBaseline";
import {AuthContext, ColorContext, ColorModeContext} from "./context";
import {publicRoutes, routes} from "./routes";
import {redirect} from "react-router-dom";
import {useMediaQuery} from "@mui/material";
import {observer} from "mobx-react-lite";
import user from './store/user'

const App = observer(() => {



	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const [mode, setMode] = useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');

	useEffect(() => {
		// if (localStorage.getItem('token')) {
		// 	user.checkAuth()
		// }
		console.log('effect')

	}, [])

	const colorMode = useMemo(() => ({
		toggleColorMode: () => {
			setMode((prevMode) => (prevMode === 'light' ? 'dark' : "light"))
			console.log('toggle')
		}
	}), [])

	const themeColorMode = getMode(mode);
	// @ts-ignore
	const theme = createTheme({
		palette: {
			...themeColorMode
		},
		...themeObject,
	})

	console.log(user.isAuth)

	const currentRoutes = user.isAuth ? routes : publicRoutes;
	const router = createBrowserRouter(currentRoutes);
	console.log(router);

	//const navigate = useNavigate()


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
