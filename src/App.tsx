import React from 'react';
import './styles.css'
import {router} from "./components/AppRouter";
import {RouterProvider} from "react-router-dom";

function App() {

	return (
		<>
			<RouterProvider router={router}/>
		</>
	);
}

export default App;
