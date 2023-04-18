import React from "react";
import SchedulePage from './pages/SchedulePage/SchedulePage'
import ErrorPage from "./pages/ErrorPage";
import ProfilePage from "./pages/ProfilePage";
import DataListsPage from "./pages/DataListsPage";
import MainPage from "./pages/MainPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import {redirect} from 'react-router-dom'
import ValidationErrorPage from "./pages/ValidationErrorPage/ValidationErrorPage";
import OAuth2RedirectHandler from "./pages/OAuth2RedirectHandler/OAuth2RedirectHandler";
import EditSchedulePage from "./pages/EditSchedulePage/EditSchedulePage";

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
                path: "edit",
                element: <AdminPage/>,
                children: [
                    {
                        path: "schedule",
                        element: <EditSchedulePage/>
                    }
                ]
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
        path: 'login',
        element: <LoginPage/>,
        loader: () => {
            return redirect('/')
        }
    },
    {
        path: "*",
        element: <div>error</div>
    },
];

export const publicRoutes = [
    {
        path: 'login',
        element: <LoginPage/>
    },
    {
        path: 'validationError',
        element: <ValidationErrorPage type={"student"}/>
    },
    {
        path: 'oauth2',
        element: <OAuth2RedirectHandler/>
    },
    {
        path: '*',
        element: <ErrorPage/>,
        loader: async () => {

            return redirect("/login")
        }
    }
]