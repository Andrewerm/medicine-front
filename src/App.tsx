import {Routes, Route, useNavigate, useLocation} from "react-router-dom";
import {RegisterPage} from "./pages/RegisterPage";
import {NotFoundPage} from "./pages/NotFoundPage";
import {MainLayout} from "./layouts/MainLayout";
import {AuthLayout} from "./layouts/AuthLayout";
import {AppLayout} from "./layouts/AppLayout";
import {LoginPage} from "./pages/LoginPage";
import {SurveyPage} from "./pages/SurveyPage";
import {HospitalsPage} from "./pages/HospitalsPage";
import {UsersPage} from "./pages/UsersPage";
import {AbilityContext} from "./hooks/Can"
import React, {useEffect, useState} from "react";
import {AjaxRoutes} from "./configs/ajaxRoutes";
import {useAbility} from "@casl/react";
import {TopPanelContext} from "./hooks/topPanel";
import {ACLEntityEnum} from "./types";


export const App: React.FC = () => {
    const [buttons, setButtons] = useState([]);
    const ability = useAbility(AbilityContext);
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        const authRoutes = [AjaxRoutes.ROUTE_REGISTER, AjaxRoutes.ROUTE_LOGIN]
        if (authRoutes.includes(location.pathname as AjaxRoutes) && ability.can('read', ACLEntityEnum.SURVEYS))
            navigate(AjaxRoutes.HOME, {replace: true})
        else if (ability.can('read', ACLEntityEnum.AUTH)) {
            navigate(AjaxRoutes.ROUTE_LOGIN, {replace: true})
        } else if (location.pathname !== AjaxRoutes.HOME && ability.can('read', ACLEntityEnum.AUTH)) {
            navigate(AjaxRoutes.HOME, {replace: true})
        }
    }, []);
    return (
        <>
            <TopPanelContext.Provider value={{buttons, setButtons}}>
                <Routes>
                    <Route path="/" element={<AppLayout/>}>
                         <Route path="" element={<MainLayout/>}>
                            {ability.can('read', ACLEntityEnum.SURVEYS) && <Route index element={<SurveyPage/>}/>}
                            {(ability.can('read',ACLEntityEnum.HOSPITALS) || ability.can('update',ACLEntityEnum.HOSPITALS))&& <Route path="hospitals" element={<HospitalsPage/>}/>}
                            {(ability.can('read',ACLEntityEnum.USERS) || ability.can('update', ACLEntityEnum.USERS) )&& <Route path="users" element={<UsersPage/>}/>}
                        </Route>
                        {ability.can('read', ACLEntityEnum.AUTH) && <Route path="sign" element={<AuthLayout/>}>
                            <Route path="login" element={<LoginPage/>}/>
                            <Route path="register" element={<RegisterPage/>}/>
                        </Route>}
                        <Route path="*" element={<NotFoundPage/>}/>
                    </Route>
                </Routes>
            </TopPanelContext.Provider>
        </>
    )
}
