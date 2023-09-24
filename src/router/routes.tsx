import React from "react";
import SchedulePage, {loader} from '../pages/SchedulePage/SchedulePage'
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ProfilePage, {loader as profileLoader} from "../pages/ProfilePage/ProfilePage";
import MainPage from "../pages/MainPage/MainPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import {redirect} from 'react-router-dom'
import OAuth2RedirectHandler from "../pages/OAuth2RedirectHandler/OAuth2RedirectHandler";
import EditSchedulePage from "../pages/EditSchedulePage/EditSchedulePage";
import EditSubjectsPage from "../pages/EditSubjectsPage/EditSubjectsPage";
import EditDataPage from "../pages/EditDataPage/EditDataPage";
import EditGroupsPage from "../pages/EditGroupsPage/EditGroupsPage";
import EditTeachersPage from "../pages/EditTeachersPage/EditTeachersPage";
import EditRoomsPage from "../pages/EditRoomsPage/EditRoomsPage";
import EditUsersPage from "../pages/EditUsersPage/EditUsersPage";
import SignupPage from "../pages/SignupPage/SignupPage";
import ProtectedPage from "../pages/ProtectedPage/ProtectedPage";
import user from "../store/user";
import {isAdmin} from "../api/http/data";

const isAuth = true;

console.log(user.permissions.length)

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
                path: "edit",
                element: <ProtectedPage
                    predicate={isAdmin(user.permissions)}
                    redirectURL={'/'}
                >
                    <AdminPage/>
                </ProtectedPage>,
                //element: <AdminPage/>,
                children: [
                    {
                        path: "schedule",
                        element: <EditSchedulePage/>
                    },
                    {
                        path: 'users',
                        element: <EditUsersPage/>
                    },
                    {
                        path: "data",
                        element: <EditDataPage/>,
                        children: [
                            {
                                path: "subjects",
                                element: <EditSubjectsPage/>,
                            },
                            {
                                path: "teachers",
                                element: <EditTeachersPage/>,
                            },
                            {
                                path: "groups",
                                element: <EditGroupsPage/>,
                            },
                            {
                                path: "rooms",
                                element: <EditRoomsPage/>,
                            },
                        ]
                    },

                ]
            },
            {
                path: "profile",
                element: <ProfilePage/>,
                loader: profileLoader,
                children: [
                    {
                        path: 'verification',
                        element: <div>qwer</div>
                    }
                ]
            },
        ]
    },
    {
        path: '/profile/page',
        element: <div>123</div>
    },
    {
        path: 'login',
        element: <LoginPage/>,
    },
    {
        path: 'signup',
        element: <SignupPage/>,
    },
    {
        path: "*",
        element: <div>error</div>,
        loader: () => {
            return redirect('/')
        }
    },
    {
        path: 'oauth2',
        element: <OAuth2RedirectHandler/>
    },
];
