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


export default function App() {
    const [buttons, setButtons] = useState([]);
    const ability = useAbility(AbilityContext);
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        const authRoutes = [AjaxRoutes.LOGIN, AjaxRoutes.REGISTER]
        if (!authRoutes.includes(location.pathname as AjaxRoutes) && ability.can('read', 'Auth')) {
            navigate(AjaxRoutes.LOGIN, {replace: true})
        } else if (location.pathname !== AjaxRoutes.HOME && ability.can('read', 'Surveys')) {

            navigate(AjaxRoutes.HOME, {replace: true})
        }
    }, []);

    return (
        <>
            <TopPanelContext.Provider value={{buttons, setButtons}}>
                <Routes>
                    <Route path="/" element={<AppLayout/>}>
                        {ability.can('read', 'Surveys') && <Route path="" element={<MainLayout/>}>
                            {ability.can('read', 'Surveys') && <Route index element={<SurveyPage/>}/>}
                            <Route path="hospitals" element={<HospitalsPage/>}/>
                            <Route path="users" element={<UsersPage/>}/>

                        </Route>}
                        {ability.can('read', 'Auth') && <Route path="auth" element={<AuthLayout/>}>
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
