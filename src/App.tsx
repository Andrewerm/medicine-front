import {Routes, Route} from "react-router-dom";
import {RegisterPage} from "./pages/RegisterPage";
import {NotFoundPage} from "./pages/NotFoundPage";
import {MainLayout} from "./layouts/MainLayout";
import {AuthLayout} from "./layouts/AuthLayout";
import {AppLayout} from "./layouts/AppLayout";
import {LoginPage} from "./pages/LoginPage";
import {SurveyPage} from "./pages/SurveyPage";
import {HospitalsPage} from "./pages/HospitalsPage";
import {UsersPage} from "./pages/UsersPage";
import {AbilityContext, Can} from "./hooks/Can"
import {useAbility} from "@casl/react";
import axios, {AxiosError} from "axios";
import {useState} from "react";




export default function App() {
    axios.get('/acl').then((response) => {
        // setData(response.data)
        console.log('response',response);
    }).catch((e:unknown) => {
        const error= e as AxiosError
        console.error(error)
    })

    const ability = useAbility(AbilityContext);
    console.log('ability', ability);
    console.log('read login', ability.can('read', 'Login'));
    console.log('read register', ability.can('read', 'Register'));
    console.log('update users', ability.can('update', 'Users'));
    return (
        <>
            <Can I="read" a="Login">
                <div>Can read login</div>
            </Can>
            <Routes>
                <Route path="/" element={<AppLayout/>}>
                    <Route path="" element={<MainLayout/>}>
                        <Route index element={<SurveyPage/>}/>
                        <Route path="hospitals" element={<HospitalsPage/>}/>
                        <Route path="users" element={<UsersPage/>}/>

                    </Route>
                    <Route path="auth" element={<AuthLayout/>}>
                        {ability.can('read', 'Login') &&
                            <Route path="login" element={<LoginPage/>}/>}
                        <Route path="register" element={<RegisterPage/>}/>
                    </Route>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Route>

            </Routes>
        </>
    )
}
