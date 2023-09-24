import React, {FC, ReactNode} from 'react';
import {Navigate} from "react-router-dom";
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

        console.log(user.permissions)
    if (!isAdmin(user.permissions)) {
        return (
            <Navigate to={redirectURL}/>
        )
    }

    return (
        <>
            {children}
        </>
    );
};

export default observer(ProtectedPage);