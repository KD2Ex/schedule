import App from "./App";
import SchedulePage from './pages/ShedulePage'
import ErrorPage from "./pages/ErrorPage";
import ProfilePage from "./pages/ProfilePage";

 
export const routes = [
    {
        path: "/",
        
        element: <App/>,
        
        errorElement: <ErrorPage/>,
    },
    {
        path: "/profile",
        element: <ProfilePage/>,
    }
];