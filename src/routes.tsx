import React from "react";
import SchedulePage from './pages/SchedulePage/SchedulePage'
import ErrorPage from "./pages/ErrorPage";
import ProfilePage from "./pages/ProfilePage";
import DataListsPage from "./pages/DataListsPage";
import MainPage from "./pages/MainPage";
import ScheduleEditPage from "./pages/ScheduleEditPage/ScheduleEditPage";

const isAuth = true;

export const routes = [
    {
        path: "/",
        element: <MainPage/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "schedule",
                element: <SchedulePage/>,
            },
            {
                path: "data",
                element: <DataListsPage/>
            },
            {
                path: "schedule/edit",
                element: <ScheduleEditPage/>
            }
        ]
    },
    {
        path: "/profile",
        element: <ProfilePage/>,
    },
    isAuth && {
        path: '/profile/page',
        element: <div>123</div>
    },

    {
        path: "*",
        element: <div>error</div>
    },
];