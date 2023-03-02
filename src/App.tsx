import React, {useMemo, useState} from 'react';
import './styles.css'
import {router} from "./components/AppRouter";
import {RouterProvider} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {getMode, themeObject} from "./themes";
import CssBaseline from "@mui/material/CssBaseline";
import {ColorModeContext} from "./context";

function App() {

	const [mode, setMode] = useState<'light' | 'dark'>('dark');
	const colorMode = useMemo(() => ({
		toggleColorMode: () => {
			setMode((prevMode) => (prevMode === 'light' ? 'dark' : "light"))
			console.log('toggle')
		}
	}), [])

	const paletteOpt = getMode(mode);
	// @ts-ignore
	const theme = createTheme({
		palette: {
			...paletteOpt
		},
		...themeObject,
	})

	return (
		<>
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>
					<CssBaseline/>
					<RouterProvider router={router}/>
				</ThemeProvider>
			</ColorModeContext.Provider>

		</>
	);
}

export default App;
