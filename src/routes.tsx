import App from "./App";
import ErrorPage from "./pages/ErrorPage";

 
export const routes = [
    {
        path: "/",
        
        element: <App/>,
        
        errorElement: <ErrorPage/>,
    },
    
];