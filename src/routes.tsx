import App from "./App";
import ErrorPage from "./pages/ErrorPage";


/*
        //@ts-ignore
        */ 
export const routes = [
    {
        path: "/",
        
        element: <App/>,
        /*
        //@ts-ignore
        */ 
        errorElement: <ErrorPage/>,
    },
    
];