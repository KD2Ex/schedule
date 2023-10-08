import React, {FC, ReactNode} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import {isAdmin} from "../../api/http/data";
import user from "../../store/user";
import {observer} from "mobx-react-lite";

interface ProtectedPageProps {
    children: ReactNode,
    predicate: boolean,
    redirectURL: string
}

const ProtectedPage: FC<ProtectedPageProps> =
    ({
         children,
         predicate,
         redirectURL
    }) => {

        const navigate = useNavigate();

        console.log(user.permissions)
        setTimeout(() => {
            if (!isAdmin(user.permissions)) {
                navigate(redirectURL)
                /*return (
                    <Navigate to={redirectURL}/>
                )*/
            }
        }, 1000)


        return (
            <>
                {children}
            </>
        );
};

export default observer(ProtectedPage);